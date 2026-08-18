import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fontSizes, spacing, radius, shadows } from '../lib/theme';
import { EXERCISES, LEVELS, TOPICS } from '../lib/exercises';
import { useProgress } from '../components/ProgressContext';
import { isDailyCompleted, recordDailyCompletion } from '../lib/storage';
import { RootStackParamList } from '../App';
import { StarsDisplay } from '../components/StarsDisplay';

export default function DailyChallengeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { progress, refresh } = useProgress();
  const [completed, setCompleted] = useState(false);

  // Pick 3 exercises deterministically based on date
  const today = new Date().toISOString().split('T')[0];
  const seed = today.split('-').reduce((acc, n) => acc + parseInt(n), 0);

  const shuffled = [...EXERCISES].sort((a, b) => {
    const ah = (parseInt(a.id.replace(/\D/g, '')) + seed) % 100;
    const bh = (parseInt(b.id.replace(/\D/g, '')) + seed) % 100;
    return ah - bh;
  });
  const dailyExercises = shuffled.slice(0, 3);

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        await refresh();
        const c = await isDailyCompleted();
        setCompleted(c);
      })();
    }, [refresh])
  );

  useEffect(() => {
    const allDone = dailyExercises.every(e => progress.exerciseProgress[e.id]?.completed);
    if (allDone && !completed) {
      recordDailyCompletion().then(() => setCompleted(true));
    }
  }, [progress]);

  const allCompleted = dailyExercises.every(e => progress.exerciseProgress[e.id]?.completed);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#F59E0B', '#EF4444']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color={colors.white} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerEmoji}>⚡</Text>
          <Text style={styles.headerTitle}>Défi du jour</Text>
          <Text style={styles.headerSubtitle}>
            3 exercices surprises • +30 XP bonus
          </Text>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.intro}>
          <Text style={styles.introEmoji}>🎯</Text>
          <Text style={styles.introTitle}>
            {allCompleted ? 'Bravo, défi relevé !' : 'Aujourd\'hui, on mélange tout !'}
          </Text>
          <Text style={styles.introText}>
            3 exercices tirés au sort parmi tous les niveaux. Termine-les tous pour gagner le bonus.
          </Text>
          {allCompleted && (
            <View style={styles.completedBanner}>
              <Ionicons name="trophy" size={20} color={colors.warning} />
              <Text style={styles.completedText}>Défi du jour complété !</Text>
            </View>
          )}
        </View>

        {dailyExercises.map((exercise, idx) => {
          const p = progress.exerciseProgress[exercise.id];
          const level = LEVELS.find(l => l.id === exercise.level)!;
          const topic = TOPICS.find(t => t.id === exercise.topic)!;
          const stars = p?.stars || 0;

          return (
            <TouchableOpacity
              key={exercise.id}
              style={[
                styles.challengeCard,
                { borderColor: level.color },
                p?.completed && styles.challengeCardDone,
              ]}
              onPress={() => navigation.navigate('Exercise', { exerciseId: exercise.id })}
              activeOpacity={0.85}
            >
              <View style={[styles.challengeNumber, { backgroundColor: level.color }]}>
                <Text style={styles.challengeNumberText}>{idx + 1}</Text>
              </View>
              <View style={styles.challengeContent}>
                <Text style={styles.challengeTitle}>{exercise.title}</Text>
                <Text style={styles.challengeQuestion} numberOfLines={1}>
                  {exercise.question}
                </Text>
                <View style={styles.challengeFooter}>
                  <View style={styles.tagsRow}>
                    <View style={[styles.tag, { backgroundColor: level.colorLight }]}>
                      <Text style={[styles.tagText, { color: level.color }]}>{level.name}</Text>
                    </View>
                    <View style={[styles.tag, { backgroundColor: topic.colorLight }]}>
                      <Text style={[styles.tagText, { color: topic.color }]}>
                        {topic.emoji} {topic.name}
                      </Text>
                    </View>
                  </View>
                  {p?.completed && <StarsDisplay count={stars} size={14} />}
                </View>
              </View>
              <Ionicons
                name={p?.completed ? 'checkmark-circle' : 'arrow-forward-circle'}
                size={28}
                color={p?.completed ? colors.success : level.color}
              />
            </TouchableOpacity>
          );
        })}

        <View style={styles.rewardsCard}>
          <Text style={styles.rewardsTitle}>🎁 Récompenses</Text>
          <View style={styles.rewardRow}>
            <Text style={styles.rewardEmoji}>⭐</Text>
            <Text style={styles.rewardText}>
              {dailyExercises.reduce((sum, e) => sum + (progress.exerciseProgress[e.id]?.stars || 0), 0)} étoiles
            </Text>
          </View>
          <View style={styles.rewardRow}>
            <Text style={styles.rewardEmoji}>✨</Text>
            <Text style={styles.rewardText}>
              {dailyExercises.reduce((sum, e) => sum + (progress.exerciseProgress[e.id]?.stars || 0) * 5, 0)} XP
            </Text>
          </View>
          <View style={[styles.rewardRow, allCompleted && styles.bonusRow]}>
            <Text style={styles.rewardEmoji}>🎁</Text>
            <Text style={[styles.rewardText, allCompleted && { color: colors.warning }]}>
              Bonus défi du jour : +30 XP {allCompleted ? '(réclamé ✓)' : ''}
            </Text>
          </View>
        </View>
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
    position: 'relative',
    alignItems: 'center',
  },
  backBtn: {
    position: 'absolute',
    left: spacing.md,
    top: spacing.md,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContent: { alignItems: 'center', marginTop: spacing.md },
  headerEmoji: { fontSize: 60 },
  headerTitle: { fontSize: fontSizes.xxxl, fontWeight: '900', color: colors.white, marginTop: spacing.xs },
  headerSubtitle: { fontSize: fontSizes.md, color: 'rgba(255,255,255,0.9)', marginTop: 4, fontWeight: '600' },
  scroll: { padding: spacing.lg, paddingBottom: spacing.xxl },
  intro: {
    backgroundColor: colors.card,
    padding: spacing.lg,
    borderRadius: radius.lg,
    alignItems: 'center',
    marginBottom: spacing.lg,
    ...shadows.sm,
  },
  introEmoji: { fontSize: 40 },
  introTitle: { fontSize: fontSizes.lg, fontWeight: '800', color: colors.text, marginTop: spacing.sm, textAlign: 'center' },
  introText: { fontSize: fontSizes.sm, color: colors.textLight, marginTop: spacing.sm, textAlign: 'center', lineHeight: 18 },
  completedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.warning + '30',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    marginTop: spacing.md,
  },
  completedText: { fontWeight: '800', color: colors.warning, marginLeft: spacing.xs, fontSize: fontSizes.sm },
  challengeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: radius.lg,
    marginBottom: spacing.md,
    borderWidth: 2,
    ...shadows.md,
  },
  challengeCardDone: { backgroundColor: colors.successLight },
  challengeNumber: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  challengeNumberText: { color: colors.white, fontWeight: '900', fontSize: fontSizes.lg },
  challengeContent: { flex: 1 },
  challengeTitle: { fontSize: fontSizes.md, fontWeight: '800', color: colors.text, marginBottom: 2 },
  challengeQuestion: { fontSize: fontSizes.xs, color: colors.textLight },
  challengeFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  tagsRow: { flexDirection: 'row' },
  tag: { paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: radius.sm, marginRight: spacing.xs },
  tagText: { fontSize: 10, fontWeight: '700' },
  rewardsCard: {
    backgroundColor: colors.card,
    padding: spacing.lg,
    borderRadius: radius.lg,
    marginTop: spacing.md,
    borderWidth: 2,
    borderColor: colors.warning,
    ...shadows.md,
  },
  rewardsTitle: { fontSize: fontSizes.lg, fontWeight: '800', color: colors.text, marginBottom: spacing.md },
  rewardRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  bonusRow: { backgroundColor: colors.warning + '20', padding: spacing.sm, borderRadius: radius.md, marginTop: spacing.sm },
  rewardEmoji: { fontSize: 22, marginRight: spacing.sm },
  rewardText: { fontSize: fontSizes.md, color: colors.text, fontWeight: '600' },
});