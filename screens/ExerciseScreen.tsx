import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Animated,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { colors, fontSizes, spacing, radius, shadows } from '../lib/theme';
import { getExerciseById, LEVELS, TOPICS, generateSameExercise } from '../lib/exercises';
import { useProgress } from '../components/ProgressContext';
import HomeButton from '../components/HomeButton';
import { RootStackParamList } from '../App';
import { ExerciseVisual } from '../components/ExerciseVisual';
import { StarsDisplay } from '../components/StarsDisplay';
import { Confetti } from '../components/Confetti';
import { Badge, Exercise } from '../lib/types';

export default function ExerciseScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'Exercise'>>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { recordAttempt } = useProgress();
  const { exerciseId, exercise: passedExercise } = route.params;

  const exercise = passedExercise || getExerciseById(exerciseId);
  
  if (!exercise) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.errorText}>Exercice non trouvé</Text>
      </SafeAreaView>
    );
  }
  
  const level = LEVELS.find(l => l.id === exercise.level)!;
  const topic = TOPICS.find(t => t.id === exercise.topic)!;

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [textAnswer, setTextAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [confetti, setConfetti] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [earnedStars, setEarnedStars] = useState(0);
  const [newBadges, setNewBadges] = useState<Badge[]>([]);

  const cardScale = useRef(new Animated.Value(0.95)).current;
  const successOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(cardScale, { toValue: 1, useNativeDriver: true, tension: 80, friction: 8 }).start();
  }, []);

  if (!exercise) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text>Exercice introuvable</Text>
      </SafeAreaView>
    );
  }

  const handleSelect = async (option: string) => {
    if (isCorrect) return;
    setSelectedAnswer(option);
    const correct = option === exercise.correctAnswer;
    setIsCorrect(correct);
    setAttempts(attempts + 1);

    if (correct) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      setConfetti(true);
      setShowExplanation(true);

      // Calculate stars
      let stars = 3;
      if (showHint) stars = 2;
      if (attempts >= 1) stars = Math.max(1, stars - 1);
      setEarnedStars(stars);

      Animated.timing(successOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Record progress
      const result = await recordAttempt(exercise.id, true, showHint, stars);
      setNewBadges(result.newBadges);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {});
    }
  };

  const handleNext = () => {
    setConfetti(false);
    navigation.goBack();
  };

  const handleSameType = () => {
    const next = generateSameExercise(exercise.level, exercise.topic, exercise.title, 1)[0];
    setConfetti(false);
    navigation.replace('Exercise', { exerciseId: next.id, exercise: next });
  };

  const showStep = () => {
    if (currentStep < exercise.steps.length) {
      setCurrentStep(currentStep + 1);
      if (!showHint) setShowHint(true);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="light-content" />
      <Confetti active={confetti} />

      <LinearGradient colors={[topic.color, level.color]} style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color={colors.white} />
        </TouchableOpacity>
        <HomeButton />
        <View style={styles.headerCenter}>
          <Text style={styles.headerEmoji}>{exercise.emoji}</Text>
          <Text style={styles.headerTitle}>{exercise.title}</Text>
          <View style={styles.tagsRow}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{level.name}</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{topic.name}</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>⭐ {exercise.xp} XP</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {!showExplanation ? (
            <>
              {/* Question card */}
              <Animated.View style={[styles.questionCard, { transform: [{ scale: cardScale }] }]}>
                <Text style={styles.questionLabel}>❓ Question</Text>
                <Text style={styles.questionText}>{exercise.question}</Text>

                {exercise.visual && (
                  <View style={styles.visualWrapper}>
                    <ExerciseVisual visual={exercise.visual} />
                  </View>
                )}
              </Animated.View>

              {/* Answer choices */}
              {exercise.options && (
                <View style={styles.choicesContainer}>
                  {exercise.options.map((option, idx) => {
                    const isSelected = selectedAnswer === option;
                    const showCorrect = isCorrect !== null && option === exercise.correctAnswer;
                    const showWrong = isCorrect === false && isSelected;

                    return (
                      <TouchableOpacity
                        key={idx}
                        style={[
                          styles.choiceBtn,
                          showCorrect && styles.choiceCorrect,
                          showWrong && styles.choiceWrong,
                          isCorrect !== null && styles.choiceDisabled,
                        ]}
                        onPress={() => handleSelect(option)}
                        disabled={isCorrect !== null}
                        activeOpacity={0.8}
                      >
                        <View
                          style={[
                            styles.choiceLetter,
                            {
                              backgroundColor: showCorrect
                                ? colors.success
                                : showWrong
                                ? colors.error
                                : isSelected
                                ? topic.color
                                : colors.background,
                            },
                          ]}
                        >
                          <Text
                            style={[
                              styles.choiceLetterText,
                              {
                                color:
                                  showCorrect || showWrong || isSelected
                                    ? colors.white
                                    : colors.text,
                              },
                            ]}
                          >
                            {String.fromCharCode(65 + idx)}
                          </Text>
                        </View>
                        <Text
                          style={[
                            styles.choiceText,
                            (showCorrect || showWrong) && { color: colors.white },
                          ]}
                        >
                          {option}
                        </Text>
                        {showCorrect && (
                          <Ionicons name="checkmark-circle" size={24} color={colors.white} />
                        )}
                        {showWrong && (
                          <Ionicons name="close-circle" size={24} color={colors.white} />
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}

              {/* Feedback after wrong answer */}
              {isCorrect === false && (
                <View style={styles.feedbackBox}>
                  <Text style={styles.feedbackEmoji}>💪</Text>
                  <Text style={styles.feedbackTitle}>Pas tout à fait...</Text>
                  <Text style={styles.feedbackText}>
                    Utilise les indices pour comprendre la méthode étape par étape !
                  </Text>
                </View>
              )}

              {/* Hint / Step-by-step section */}
              <View style={styles.hintCard}>
                <View style={styles.hintHeader}>
                  <Ionicons name="bulb" size={22} color={colors.warning} />
                  <Text style={styles.hintTitle}>Aide guidée</Text>
                  {!showHint && (
                    <TouchableOpacity style={styles.showHintBtn} onPress={() => setShowHint(true)}>
                      <Text style={styles.showHintText}>Voir</Text>
                    </TouchableOpacity>
                  )}
                </View>

                {showHint && (
                  <View>
                    {exercise.steps.slice(0, currentStep + 1).map((step, idx) => (
                      <View key={idx} style={styles.stepItem}>
                        <View style={[styles.stepNumber, { backgroundColor: topic.color }]}>
                          <Text style={styles.stepNumberText}>{idx + 1}</Text>
                        </View>
                        <View style={styles.stepContent}>
                          <Text style={styles.stepText}>{step.text}</Text>
                          {step.formula && (
                            <View style={styles.formulaBox}>
                              <Text style={styles.formulaText}>{step.formula}</Text>
                            </View>
                          )}
                        </View>
                      </View>
                    ))}

                    {currentStep < exercise.steps.length - 1 && isCorrect === null && (
                      <TouchableOpacity style={styles.nextStepBtn} onPress={showStep}>
                        <Text style={styles.nextStepText}>
                          Étape suivante ({currentStep + 2}/{exercise.steps.length})
                        </Text>
                        <Ionicons name="arrow-forward" size={18} color={topic.color} />
                      </TouchableOpacity>
                    )}
                  </View>
                )}
              </View>

              {isCorrect === null && (
                <View style={styles.encouragementCard}>
                  <Text style={styles.encouragementEmoji}>🎯</Text>
                  <Text style={styles.encouragementText}>
                    Réfléchis bien, puis choisis ta réponse !
                  </Text>
                </View>
              )}
            </>
          ) : (
            /* Success screen */
            <Animated.View style={[styles.successContainer, { opacity: successOpacity }]}>
              <View style={styles.successEmojiBig}>
                <Text style={styles.successEmojiText}>🎉</Text>
              </View>
              <Text style={styles.successTitle}>Bravo !</Text>
              <Text style={styles.successSubtitle}>
                Tu as trouvé la bonne réponse
              </Text>

              <View style={styles.starsEarned}>
                <StarsDisplay count={earnedStars} size={42} />
                <Text style={styles.starsEarnedLabel}>
                  {earnedStars === 3 ? 'Parfait ! 🌟' : earnedStars === 2 ? 'Très bien ! 💪' : 'Bien joué ! 👍'}
                </Text>
              </View>

              <View style={styles.xpEarned}>
                <Ionicons name="sparkles" size={20} color={colors.warning} />
                <Text style={styles.xpEarnedText}>+{earnedStars * 5 + (earnedStars === 3 ? 5 : 0)} XP gagnés</Text>
              </View>

              {/* Explanation */}
              <View style={styles.explanationCard}>
                <View style={styles.explanationHeader}>
                  <Ionicons name="information-circle" size={22} color={colors.primary} />
                  <Text style={styles.explanationTitle}>Explication</Text>
                </View>
                <Text style={styles.explanationText}>{exercise.explanation}</Text>

                <View style={styles.recapBox}>
                  <Text style={styles.recapTitle}>📝 Récap' des étapes</Text>
                  {exercise.steps.map((step, idx) => (
                    <View key={idx} style={styles.recapStep}>
                      <Text style={styles.recapStepNum}>{idx + 1}.</Text>
                      <Text style={styles.recapStepText}>{step.text}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {newBadges.length > 0 && (
                <View style={styles.newBadgeCard}>
                  <Text style={styles.newBadgeTitle}>🏆 Nouveau badge débloqué !</Text>
                  {newBadges.map(b => (
                    <View key={b.id} style={styles.badgeItem}>
                      <Text style={styles.badgeEmoji}>{b.emoji}</Text>
                      <View>
                        <Text style={styles.badgeName}>{b.name}</Text>
                        <Text style={styles.badgeDesc}>{b.description}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              )}

              <TouchableOpacity style={styles.continueBtn} onPress={handleNext} activeOpacity={0.85}>
                <LinearGradient
                  colors={[topic.color, level.color]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.continueGradient}
                >
                  <Text style={styles.continueText}>Continuer</Text>
                  <Ionicons name="arrow-forward" size={22} color={colors.white} />
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={styles.sameTypeBtn} onPress={handleSameType} activeOpacity={0.85}>
                <LinearGradient
                    colors={[level.colorLight, level.colorLight]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.sameTypeGradient}
                >
                  <Ionicons name="refresh" size={22} color={level.color} />
                  <Text style={styles.sameTypeText}>Refaire un exercice du même type</Text>
                  <Ionicons name="arrow-forward" size={22} color={level.color} />
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  errorText: { fontSize: fontSizes.lg, color: colors.text, textAlign: 'center', marginTop: spacing.xxl },
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
    position: 'relative',
  },
  backBtn: {
    position: 'absolute',
    right: spacing.md,
    top: spacing.md,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  headerCenter: { alignItems: 'center', marginTop: spacing.xs },
  headerEmoji: { fontSize: 50, marginBottom: spacing.xs },
  headerTitle: { fontSize: fontSizes.xxl, fontWeight: '900', color: colors.white, textAlign: 'center' },
  tagsRow: { flexDirection: 'row', marginTop: spacing.sm },
  tag: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.full,
    marginHorizontal: 4,
  },
  tagText: { color: colors.white, fontSize: fontSizes.xs, fontWeight: '700' },
  scroll: { padding: spacing.lg, paddingBottom: spacing.xxl },
  questionCard: {
    backgroundColor: colors.card,
    padding: spacing.lg,
    borderRadius: radius.lg,
    ...shadows.md,
  },
  questionLabel: {
    fontSize: fontSizes.sm,
    color: colors.primary,
    fontWeight: '800',
    marginBottom: spacing.xs,
    letterSpacing: 1,
  },
  questionText: {
    fontSize: fontSizes.lg,
    color: colors.text,
    fontWeight: '700',
    lineHeight: 26,
  },
  visualWrapper: { alignItems: 'center', marginTop: spacing.md },
  choicesContainer: { marginTop: spacing.lg },
  choiceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: radius.lg,
    marginBottom: spacing.sm,
    borderWidth: 2,
    borderColor: colors.border,
    ...shadows.sm,
  },
  choiceCorrect: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  choiceWrong: {
    backgroundColor: colors.error,
    borderColor: colors.error,
  },
  choiceDisabled: { opacity: 0.85 },
  choiceLetter: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  choiceLetterText: { fontWeight: '800', fontSize: fontSizes.md },
  choiceText: { flex: 1, fontSize: fontSizes.md, fontWeight: '600', color: colors.text },
  feedbackBox: {
    backgroundColor: colors.errorLight,
    padding: spacing.md,
    borderRadius: radius.lg,
    marginTop: spacing.md,
    alignItems: 'center',
  },
  feedbackEmoji: { fontSize: 30, marginBottom: 4 },
  feedbackTitle: { fontSize: fontSizes.lg, fontWeight: '800', color: colors.error },
  feedbackText: { fontSize: fontSizes.sm, color: colors.text, textAlign: 'center', marginTop: 4 },
  hintCard: {
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: radius.lg,
    marginTop: spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: colors.warning,
    ...shadows.sm,
  },
  hintHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  hintTitle: { fontSize: fontSizes.md, fontWeight: '800', color: colors.text, marginLeft: spacing.sm, flex: 1 },
  showHintBtn: {
    backgroundColor: colors.warning,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.full,
  },
  showHintText: { color: colors.white, fontWeight: '800', fontSize: fontSizes.sm },
  stepItem: { flexDirection: 'row', marginBottom: spacing.sm },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
    marginTop: 2,
  },
  stepNumberText: { color: colors.white, fontWeight: '800', fontSize: fontSizes.sm },
  stepContent: { flex: 1 },
  stepText: { fontSize: fontSizes.sm, color: colors.text, lineHeight: 20 },
  formulaBox: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.sm,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  formulaText: { fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace', fontSize: fontSizes.sm, color: colors.primary, fontWeight: '700' },
  nextStepBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    marginTop: spacing.xs,
  },
  nextStepText: { color: colors.text, fontWeight: '700', fontSize: fontSizes.sm, marginRight: spacing.xs },
  encouragementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: radius.lg,
    marginTop: spacing.lg,
  },
  encouragementEmoji: { fontSize: 30, marginRight: spacing.sm },
  encouragementText: { flex: 1, color: colors.text, fontSize: fontSizes.sm, fontStyle: 'italic' },
  successContainer: { alignItems: 'center' },
  successEmojiBig: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.successLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    marginTop: spacing.lg,
  },
  successEmojiText: { fontSize: 60 },
  successTitle: { fontSize: fontSizes.xxxl, fontWeight: '900', color: colors.text },
  successSubtitle: { fontSize: fontSizes.md, color: colors.textLight, marginTop: spacing.xs },
  starsEarned: { alignItems: 'center', marginTop: spacing.lg, marginBottom: spacing.md },
  starsEarnedLabel: {
    fontSize: fontSizes.md,
    fontWeight: '800',
    color: colors.warning,
    marginTop: spacing.sm,
  },
  xpEarned: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.warning + '20',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    marginBottom: spacing.lg,
  },
  xpEarnedText: { fontWeight: '800', color: colors.warning, fontSize: fontSizes.md, marginLeft: 6 },
  explanationCard: {
    backgroundColor: colors.card,
    padding: spacing.lg,
    borderRadius: radius.lg,
    width: '100%',
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    ...shadows.md,
  },
  explanationHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  explanationTitle: { fontSize: fontSizes.lg, fontWeight: '800', color: colors.text, marginLeft: spacing.sm },
  explanationText: { fontSize: fontSizes.md, color: colors.text, lineHeight: 22 },
  recapBox: {
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: radius.md,
    marginTop: spacing.md,
  },
  recapTitle: { fontSize: fontSizes.sm, fontWeight: '800', color: colors.text, marginBottom: spacing.sm },
  recapStep: { flexDirection: 'row', marginBottom: 4 },
  recapStepNum: { color: colors.primary, fontWeight: '800', marginRight: 6, fontSize: fontSizes.sm },
  recapStepText: { flex: 1, color: colors.text, fontSize: fontSizes.sm, lineHeight: 18 },
  newBadgeCard: {
    backgroundColor: colors.warning + '30',
    padding: spacing.md,
    borderRadius: radius.lg,
    width: '100%',
    marginTop: spacing.lg,
    alignItems: 'center',
  },
  newBadgeTitle: { fontSize: fontSizes.md, fontWeight: '800', color: colors.text, marginBottom: spacing.sm },
  badgeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: spacing.sm,
    borderRadius: radius.md,
    width: '100%',
    marginBottom: spacing.xs,
  },
  badgeEmoji: { fontSize: 30, marginRight: spacing.sm },
  badgeName: { fontWeight: '800', color: colors.text, fontSize: fontSizes.sm },
  badgeDesc: { fontSize: fontSizes.xs, color: colors.textLight },
  continueBtn: {
    marginTop: spacing.xl,
    borderRadius: radius.lg,
    overflow: 'hidden',
    width: '100%',
    ...shadows.md,
  },
  continueGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
  },
  continueText: { color: colors.white, fontWeight: '800', fontSize: fontSizes.lg, marginRight: spacing.sm },
  sameTypeBtn: {
    marginTop: spacing.md,
    borderRadius: radius.lg,
    overflow: 'hidden',
    width: '100%',
    ...shadows.md,
  },
  sameTypeGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
  },
  sameTypeText: { color: colors.text, fontWeight: '800', fontSize: fontSizes.md, marginHorizontal: spacing.sm },
});