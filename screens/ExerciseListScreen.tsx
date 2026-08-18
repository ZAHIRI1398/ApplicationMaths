import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fontSizes, spacing, radius, shadows } from '../lib/theme';
import { LEVELS, TOPICS, getExercisesByLevelAndTopic, generateGeneratedExercises, Exercise } from '../lib/exercises';
import { useProgress } from '../components/ProgressContext';
import { RootStackParamList } from '../App';
import { StarsDisplay } from '../components/StarsDisplay';

export default function ExerciseListScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'ExerciseList'>>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { progress } = useProgress();
  const { levelId, topicId } = route.params;

  const level = LEVELS.find(l => l.id === levelId)!;
  const topic = TOPICS.find(t => t.id === topicId)!;
  
  const [generatedExercises, setGeneratedExercises] = useState<Exercise[]>([]);
  const showGenerateButton = levelId === '1Obs' && topicId === 'numbers';

  const baseExercises = getExercisesByLevelAndTopic(levelId, topicId);
  const exercises = [...baseExercises, ...generatedExercises];

  // Compter seulement les exercices de base pour la progression
  const completedCount = baseExercises.filter(e => progress.exerciseProgress[e.id]?.completed).length;

  const handleGenerateMore = () => {
    const newExercises = generateGeneratedExercises(5);
    setGeneratedExercises(prev => [...prev, ...newExercises]);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={[topic.color, topic.color]}
        style={styles.header}
      >
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color={colors.white} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerEmoji}>{topic.emoji}</Text>
          <Text style={styles.headerTitle}>{topic.name}</Text>
          <Text style={styles.headerSubtitle}>
            {level.name} • {completedCount}/{baseExercises.length} terminés
          </Text>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {exercises.map((exercise, index) => {
          const p = progress.exerciseProgress[exercise.id];
          const completed = p?.completed || false;
          const stars = p?.stars || 0;
          const isLocked = false; // Could be made sequential

          return (
            <TouchableOpacity
              key={exercise.id}
              style={[
                styles.exerciseCard,
                completed && styles.exerciseCardDone,
                { borderLeftColor: topic.color },
              ]}
              onPress={() => navigation.navigate('Exercise', { exerciseId: exercise.id, exercise })}
              activeOpacity={0.85}
            >
              <View style={[styles.exerciseNumber, { backgroundColor: completed ? colors.success : topic.color }]}>
                {completed ? (
                  <Ionicons name="checkmark" size={20} color={colors.white} />
                ) : (
                  <Text style={styles.exerciseNumberText}>{index + 1}</Text>
                )}
              </View>
              <View style={styles.exerciseContent}>
                <Text style={styles.exerciseTitle}>{exercise.title}</Text>
                <Text style={styles.exerciseQuestion} numberOfLines={2}>
                  {exercise.question}
                </Text>
                <View style={styles.exerciseFooter}>
                  <StarsDisplay count={stars} size={16} />
                  <View style={styles.difficultyBadge}>
                    <Text style={styles.difficultyText}>
                      {'⭐'.repeat(exercise.difficulty)}
                    </Text>
                  </View>
                  <Text style={styles.xpText}>+{exercise.xp} XP</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textLight} />
            </TouchableOpacity>
          );
        })}

        {exercises.length === 0 && (
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🤔</Text>
            <Text style={styles.emptyText}>Aucun exercice disponible</Text>
          </View>
        )}

        {showGenerateButton && (
          <TouchableOpacity
            style={styles.generateButton}
            onPress={handleGenerateMore}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={[topic.color, topic.color]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.generateButtonGradient}
            >
              <Ionicons name="add-circle" size={24} color={colors.white} />
              <Text style={styles.generateButtonText}>Générer plus d'exercices</Text>
              <Ionicons name="arrow-forward" size={20} color={colors.white} />
            </LinearGradient>
          </TouchableOpacity>
        )}

        {completedCount === exercises.length && exercises.length > 0 && (
          <View style={styles.completedBox}>
            <Text style={styles.completedEmoji}>🎉</Text>
            <Text style={styles.completedTitle}>Tous les exercices terminés !</Text>
            <Text style={styles.completedText}>
              Tu peux les refaire pour améliorer ton score d'étoiles.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
    alignItems: 'center',
    position: 'relative',
  },
  backBtn: {
    position: 'absolute',
    left: spacing.md,
    top: spacing.md,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContent: { alignItems: 'center', marginTop: spacing.md },
  headerEmoji: { fontSize: 60, marginBottom: spacing.sm },
  headerTitle: { fontSize: fontSizes.xxxl, fontWeight: '900', color: colors.white },
  headerSubtitle: {
    fontSize: fontSizes.md,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 4,
    fontWeight: '600',
  },
  scroll: { padding: spacing.lg, paddingBottom: spacing.xxl },
  exerciseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: radius.lg,
    marginBottom: spacing.md,
    borderLeftWidth: 5,
    ...shadows.sm,
  },
  exerciseCardDone: {
    backgroundColor: colors.successLight,
  },
  exerciseNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  exerciseNumberText: {
    color: colors.white,
    fontWeight: '800',
    fontSize: fontSizes.md,
  },
  exerciseContent: { flex: 1 },
  exerciseTitle: {
    fontSize: fontSizes.md,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 2,
  },
  exerciseQuestion: {
    fontSize: fontSizes.sm,
    color: colors.textLight,
    lineHeight: 18,
  },
  exerciseFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  difficultyBadge: {
    marginLeft: spacing.sm,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.sm,
  },
  difficultyText: { fontSize: 10 },
  xpText: {
    marginLeft: 'auto',
    color: colors.primary,
    fontSize: fontSizes.xs,
    fontWeight: '700',
  },
  empty: { alignItems: 'center', padding: spacing.xxl },
  emptyEmoji: { fontSize: 60, marginBottom: spacing.md },
  emptyText: { color: colors.textLight, fontSize: fontSizes.md },
  completedBox: {
    backgroundColor: colors.successLight,
    padding: spacing.lg,
    borderRadius: radius.lg,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  completedEmoji: { fontSize: 50, marginBottom: spacing.sm },
  completedTitle: { fontSize: fontSizes.lg, fontWeight: '800', color: colors.success },
  completedText: {
    fontSize: fontSizes.sm,
    color: colors.text,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  generateButton: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    borderRadius: radius.lg,
    overflow: 'hidden',
    ...shadows.md,
  },
  generateButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  generateButtonText: {
    color: colors.white,
    fontWeight: '800',
    fontSize: fontSizes.md,
    marginHorizontal: spacing.sm,
  },
});