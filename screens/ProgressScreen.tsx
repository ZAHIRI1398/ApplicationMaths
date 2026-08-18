import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fontSizes, spacing, radius, shadows } from '../lib/theme';
import { useProgress } from '../components/ProgressContext';
import { LEVELS, TOPICS, TOTAL_EXERCISES, EXERCISES } from '../lib/exercises';
import { BADGES } from '../lib/badges';
import { ProgressBar } from '../components/ProgressBar';
import { StarsDisplay } from '../components/StarsDisplay';
import HomeButton from '../components/HomeButton';
import { getLevelFromXP } from '../lib/levelTitles';

export default function ProgressScreen() {
  const { progress } = useProgress();
  const levelInfo = getLevelFromXP(progress.totalXP);

  const totalMaxStars = TOTAL_EXERCISES * 3;
  const overallProgress = (progress.totalStars / totalMaxStars) * 100;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['#7C3AED', '#3B82F6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <HomeButton />
          <Text style={styles.headerTitle}>Mes progrès 📈</Text>
          <Text style={styles.headerSubtitle}>Regarde tout ce que tu as accompli !</Text>

          {/* Level card */}
          <View style={styles.levelCard}>
            <View style={styles.levelHeader}>
              <View>
                <Text style={styles.levelTitle}>
                  {levelInfo.emoji} {levelInfo.title}
                </Text>
                <Text style={styles.levelSubtitle}>Niveau {levelInfo.level}</Text>
              </View>
              <View style={styles.levelBadgeBig}>
                <Text style={styles.levelBadgeText}>Niv. {levelInfo.level}</Text>
              </View>
            </View>
            <View style={styles.xpRow}>
              <Text style={styles.xpCurrent}>{progress.totalXP} XP</Text>
              {levelInfo.nextXP && (
                <Text style={styles.xpNext}>/ {levelInfo.nextXP} XP</Text>
              )}
            </View>
            <ProgressBar progress={levelInfo.progressToNext} color="#FBBF24" height={10} />
            {levelInfo.nextTitle && (
              <Text style={styles.nextTitle}>
                Prochain titre : {levelInfo.nextTitle} 🎯
              </Text>
            )}
          </View>
        </LinearGradient>

        {/* Big stats grid */}
        <View style={styles.statsGrid}>
          <StatCard emoji="⭐" value={progress.totalStars} label="Étoiles" gradient={['#FBBF24', '#F59E0B']} />
          <StatCard emoji="🏆" value={progress.badges.length} label="Badges" gradient={['#8B5CF6', '#7C3AED']} />
          <StatCard emoji="🔥" value={progress.currentStreak} label="Jours" gradient={['#EF4444', '#F97316']} />
          <StatCard emoji="✨" value={progress.totalXP} label="XP total" gradient={['#10B981', '#34D399']} />
        </View>

        {/* Overall progress */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎯 Progression globale</Text>
          <View style={styles.bigCard}>
            <Text style={styles.bigProgressText}>
              {progress.totalStars} / {totalMaxStars} étoiles
            </Text>
            <ProgressBar progress={overallProgress} color={colors.primary} height={14} />
            <Text style={styles.bigProgressHint}>
              {Math.round(overallProgress)}% de tous les exercices maîtrisés
            </Text>
          </View>
        </View>

        {/* By level */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📚 Par niveau</Text>
          {LEVELS.map(level => {
            const levelExercises = EXERCISES.filter(e => e.level === level.id);
            const stars = Object.entries(progress.exerciseProgress)
              .filter(([id]) => id.startsWith(level.id === 'cm2' ? 'cm2-' : level.id === '6eme' ? '6eme-' : '5eme-'))
              .reduce((sum, [, p]) => sum + p.stars, 0);
            const max = levelExercises.length * 3;
            const pct = (stars / max) * 100;

            return (
              <View key={level.id} style={styles.levelProgressCard}>
                <View style={[styles.levelIcon, { backgroundColor: level.colorLight }]}>
                  <Text style={{ fontSize: 28 }}>{level.emoji}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={styles.levelProgressHeader}>
                    <Text style={styles.levelProgressName}>{level.fullName}</Text>
                    <Text style={styles.levelProgressCount}>
                      {stars}/{max} ⭐
                    </Text>
                  </View>
                  <ProgressBar progress={pct} color={level.color} height={8} />
                </View>
              </View>
            );
          })}
        </View>

        {/* By topic */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎨 Par univers</Text>
          {TOPICS.map(topic => {
            const stars = Object.entries(progress.exerciseProgress)
              .filter(([id]) => {
                if (topic.id === 'geometry') return id.includes('-geo');
                if (topic.id === 'fractions') return id.includes('-frac');
                return id.includes('-men');
              })
              .reduce((sum, [, p]) => sum + p.stars, 0);
            const totalTopicExercises = EXERCISES.filter(e => e.topic === topic.id);
            const max = totalTopicExercises.length * 3;
            const pct = max > 0 ? (stars / max) * 100 : 0;

            return (
              <View key={topic.id} style={styles.topicProgressCard}>
                <View style={[styles.topicIcon, { backgroundColor: topic.colorLight }]}>
                  <Text style={{ fontSize: 30 }}>{topic.emoji}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={styles.topicProgressHeader}>
                    <Text style={styles.topicProgressName}>{topic.name}</Text>
                    <Text style={styles.topicProgressCount}>
                      {stars}/{max} ⭐
                    </Text>
                  </View>
                  <ProgressBar progress={pct} color={topic.color} height={8} />
                </View>
              </View>
            );
          })}
        </View>

        {/* Badges */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏆 Badges ({progress.badges.length}/{BADGES.length})</Text>
          <View style={styles.badgesGrid}>
            {BADGES.map(badge => {
              const earned = progress.badges.includes(badge.id);
              return (
                <View
                  key={badge.id}
                  style={[
                    styles.badgeCard,
                    earned && { backgroundColor: badge.color + '30', borderColor: badge.color },
                    !earned && styles.badgeCardLocked,
                  ]}
                >
                  <Text style={[styles.badgeEmoji, !earned && { opacity: 0.3 }]}>
                    {earned ? badge.emoji : '🔒'}
                  </Text>
                  <Text style={[styles.badgeName, !earned && { color: colors.textLight }]}>
                    {earned ? badge.name : '???'}
                  </Text>
                  <Text style={styles.badgeDesc}>{badge.description}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Streak info */}
        <View style={[styles.section, { marginBottom: spacing.xxl }]}>
          <View style={styles.streakCard}>
            <Text style={styles.streakEmoji}>🔥</Text>
            <View>
              <Text style={styles.streakTitle}>Série actuelle</Text>
              <Text style={styles.streakDays}>{progress.currentStreak} jour{progress.currentStreak > 1 ? 's' : ''}</Text>
              <Text style={styles.streakBest}>
                Record : {progress.longestStreak} jour{progress.longestStreak > 1 ? 's' : ''} 🏅
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function StatCard({ emoji, value, label, gradient }: { emoji: string; value: number; label: string; gradient: [string, string] }) {
  return (
    <View style={styles.statCardWrap}>
      <LinearGradient colors={gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.statCard}>
        <Text style={styles.statCardEmoji}>{emoji}</Text>
        <Text style={styles.statCardValue}>{value}</Text>
        <Text style={styles.statCardLabel}>{label}</Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
  },
  headerTitle: { fontSize: fontSizes.xxl, fontWeight: '900', color: colors.white },
  headerSubtitle: { fontSize: fontSizes.sm, color: 'rgba(255,255,255,0.9)', marginTop: 4 },
  levelCard: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: spacing.md,
    borderRadius: radius.lg,
    marginTop: spacing.lg,
  },
  levelHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  levelTitle: { fontSize: fontSizes.xl, fontWeight: '900', color: colors.white },
  levelSubtitle: { fontSize: fontSizes.sm, color: 'rgba(255,255,255,0.85)', marginTop: 2 },
  levelBadgeBig: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
  },
  levelBadgeText: { color: colors.white, fontWeight: '800' },
  xpRow: { flexDirection: 'row', alignItems: 'baseline', marginTop: spacing.md, marginBottom: spacing.xs },
  xpCurrent: { fontSize: fontSizes.lg, fontWeight: '800', color: colors.white },
  xpNext: { fontSize: fontSizes.sm, color: 'rgba(255,255,255,0.85)', marginLeft: 6 },
  nextTitle: { fontSize: fontSizes.sm, color: 'rgba(255,255,255,0.85)', marginTop: spacing.sm },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.md,
    marginTop: -spacing.lg,
  },
  statCardWrap: { width: '50%', padding: spacing.xs },
  statCard: {
    padding: spacing.md,
    borderRadius: radius.lg,
    alignItems: 'center',
    ...shadows.md,
  },
  statCardEmoji: { fontSize: 32 },
  statCardValue: { fontSize: fontSizes.xxl, fontWeight: '900', color: colors.white, marginTop: 4 },
  statCardLabel: { fontSize: fontSizes.xs, color: 'rgba(255,255,255,0.95)', marginTop: 2, fontWeight: '600' },
  section: { paddingHorizontal: spacing.lg, marginTop: spacing.xl },
  sectionTitle: { fontSize: fontSizes.xl, fontWeight: '800', color: colors.text, marginBottom: spacing.md },
  bigCard: {
    backgroundColor: colors.card,
    padding: spacing.lg,
    borderRadius: radius.lg,
    ...shadows.sm,
  },
  bigProgressText: { fontSize: fontSizes.lg, fontWeight: '800', color: colors.text, marginBottom: spacing.sm },
  bigProgressHint: { fontSize: fontSizes.sm, color: colors.textLight, marginTop: spacing.sm, textAlign: 'center' },
  levelProgressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: radius.lg,
    marginBottom: spacing.sm,
    ...shadows.sm,
  },
  levelIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  levelProgressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.xs },
  levelProgressName: { fontSize: fontSizes.md, fontWeight: '800', color: colors.text },
  levelProgressCount: { fontSize: fontSizes.sm, color: colors.textLight, fontWeight: '700' },
  topicProgressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: radius.lg,
    marginBottom: spacing.sm,
    ...shadows.sm,
  },
  topicIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  topicProgressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.xs },
  topicProgressName: { fontSize: fontSizes.md, fontWeight: '800', color: colors.text },
  topicProgressCount: { fontSize: fontSizes.sm, color: colors.textLight, fontWeight: '700' },
  badgesGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  badgeCard: {
    width: '48%',
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: radius.lg,
    alignItems: 'center',
    margin: '1%',
    borderWidth: 2,
    borderColor: colors.border,
    ...shadows.sm,
  },
  badgeCardLocked: { opacity: 0.7 },
  badgeEmoji: { fontSize: 40, marginBottom: spacing.xs },
  badgeName: { fontSize: fontSizes.sm, fontWeight: '800', color: colors.text, textAlign: 'center' },
  badgeDesc: {
    fontSize: fontSizes.xs,
    color: colors.textLight,
    textAlign: 'center',
    marginTop: 4,
  },
  streakCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.warning + '25',
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderColor: colors.warning,
  },
  streakEmoji: { fontSize: 50, marginRight: spacing.md },
  streakTitle: { fontSize: fontSizes.md, fontWeight: '700', color: colors.text },
  streakDays: { fontSize: fontSizes.xxl, fontWeight: '900', color: colors.warning },
  streakBest: { fontSize: fontSizes.xs, color: colors.textLight, marginTop: 2 },
});