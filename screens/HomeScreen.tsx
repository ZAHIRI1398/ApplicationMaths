import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fontSizes, spacing, radius, shadows } from '../lib/theme';
import { LEVELS, TOPICS, EXERCISES, TOTAL_EXERCISES } from '../lib/exercises';
import { useProgress } from '../components/ProgressContext';
import { ProgressBar } from '../components/ProgressBar';
import { StarsDisplay } from '../components/StarsDisplay';
import { RootStackParamList } from '../App';

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { progress } = useProgress();

  const totalAvailableStars = TOTAL_EXERCISES * 3;
  const overallProgress = (progress.totalStars / totalAvailableStars) * 100;

  const playRandom = () => {
    // Find first not-completed, otherwise random
    const incomplete = EXERCISES.filter(e => !progress.exerciseProgress[e.id]?.completed);
    const pool = incomplete.length > 0 ? incomplete : EXERCISES;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    navigation.navigate('Exercise', { exerciseId: pick.id });
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Hero header */}
        <LinearGradient
          colors={['#7C3AED', '#A855F7', '#EC4899']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <View style={styles.heroTop}>
            <View>
              <Text style={styles.greeting}>Salut, champion ! 👋</Text>
              <Text style={styles.heroSubtitle}>Prêt pour de nouveaux défis ?</Text>
            </View>
            <View style={styles.heroActions}>
              <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Progress')}>
                <Ionicons name="stats-chart" size={20} color={colors.white} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Profile')}>
                <Ionicons name="person" size={20} color={colors.white} />
              </TouchableOpacity>
              <View style={styles.streakChip}>
                <Ionicons name="flame" size={16} color="#FFF" />
                <Text style={styles.streakText}>{progress.currentStreak}</Text>
              </View>
            </View>
          </View>

          <View style={styles.heroStats}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{progress.totalStars}</Text>
              <Text style={styles.statLabel}>⭐ Étoiles</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{progress.totalXP}</Text>
              <Text style={styles.statLabel}>✨ XP</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{progress.badges.length}</Text>
              <Text style={styles.statLabel}>🏆 Badges</Text>
            </View>
          </View>

          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressTitle}>Progression globale</Text>
              <Text style={styles.progressPercent}>{Math.round(overallProgress)}%</Text>
            </View>
            <ProgressBar progress={overallProgress} color="#FBBF24" height={10} />
          </View>
        </LinearGradient>

        {/* Daily challenge card */}
        <TouchableOpacity
          style={styles.dailyCard}
          onPress={() => navigation.navigate('DailyChallenge')}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={['#F59E0B', '#FB923C']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.dailyGradient}
          >
            <View style={styles.dailyLeft}>
              <Text style={styles.dailyTitle}>⚡ Défi du jour</Text>
              <Text style={styles.dailySubtitle}>3 exercices surprises t'attendent !</Text>
            </View>
            <View style={styles.dailyIcon}>
              <Ionicons name="chevron-forward" size={28} color="#FFF" />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Quick play */}
        <TouchableOpacity
          style={styles.quickPlayCard}
          onPress={playRandom}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={['#EC4899', '#8B5CF6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.quickPlayGradient}
          >
            <View style={styles.quickPlayLeft}>
              <Text style={styles.quickPlayTitle}>🎲 Jouer rapidement</Text>
              <Text style={styles.quickPlaySubtitle}>
                Un exercice au hasard pour s'entraîner
              </Text>
            </View>
            <View style={styles.quickPlayIcon}>
              <Ionicons name="play-circle" size={40} color="#FFF" />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Choose level section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choisis ton niveau 📚</Text>
          <Text style={styles.sectionSubtitle}>3 niveaux pour progresser</Text>

          {LEVELS.map((level, index) => {
            const levelExercises = EXERCISES.filter(e => e.level === level.id);
            const levelStars = Object.entries(progress.exerciseProgress)
              .filter(([id]) => id.startsWith(level.id === '1Obs' ? '1Obs-' : level.id === '1phase' ? '1phase-' : '5eme-'))
              .reduce((sum, [, p]) => sum + p.stars, 0);
            const levelMax = levelExercises.length * 3;
            const levelProgress = (levelStars / levelMax) * 100;

            return (
              <TouchableOpacity
                key={level.id}
                style={[styles.levelCard, { borderColor: level.color }]}
                onPress={() => navigation.navigate('Topic', { levelId: level.id })}
                activeOpacity={0.85}
              >
                <View style={[styles.levelEmojiCircle, { backgroundColor: level.colorLight }]}>
                  <Text style={styles.levelEmoji}>{level.emoji}</Text>
                </View>
                <View style={styles.levelContent}>
                  <View style={styles.levelHeader}>
                    <Text style={styles.levelName}>{level.name}</Text>
                    <View style={[styles.levelBadge, { backgroundColor: level.color }]}>
                      <Text style={styles.levelBadgeText}>{level.fullName}</Text>
                    </View>
                  </View>
                  <Text style={styles.levelDesc}>{level.description}</Text>
                  <Text style={styles.levelAge}>👤 {level.ageRange}</Text>
                  <View style={styles.levelProgressRow}>
                    <StarsDisplay count={Math.round((levelStars / levelMax) * 3)} size={14} />
                    <Text style={styles.levelProgressText}>
                      {levelStars}/{levelMax} ⭐
                    </Text>
                  </View>
                  <ProgressBar progress={levelProgress} color={level.color} height={6} />
                </View>
                <Ionicons name="chevron-forward" size={22} color={colors.textLight} />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Topics preview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4 univers à explorer 🚀</Text>
          <View style={styles.topicsRow}>
            {TOPICS.map(topic => (
              <View key={topic.id} style={[styles.topicPill, { backgroundColor: topic.colorLight }]}>
                <Text style={styles.topicEmoji}>{topic.emoji}</Text>
                <Text style={[styles.topicPillText, { color: topic.color }]}>{topic.name}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Encouragement */}
        <View style={styles.encouragement}>
          <Text style={styles.encouragementEmoji}>💪</Text>
          <Text style={styles.encouragementText}>
            Chaque exercice te rapproche de la maîtrise. Continue !
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingBottom: spacing.xxl },
  hero: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  greeting: { fontSize: fontSizes.xxl, fontWeight: '800', color: colors.white },
  heroSubtitle: { fontSize: fontSizes.sm, color: 'rgba(255,255,255,0.9)', marginTop: 2 },
  streakChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
  },
  heroActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.xs,
  },
  streakText: { color: colors.white, fontWeight: '800', marginLeft: 4, fontSize: fontSizes.md },
  heroStats: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  statBox: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: fontSizes.xl, fontWeight: '800', color: colors.white },
  statLabel: { fontSize: fontSizes.xs, color: 'rgba(255,255,255,0.85)', marginTop: 2 },
  progressSection: { marginTop: spacing.sm },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  progressTitle: { color: colors.white, fontWeight: '600', fontSize: fontSizes.sm },
  progressPercent: { color: colors.white, fontWeight: '800', fontSize: fontSizes.sm },
  dailyCard: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    borderRadius: radius.lg,
    overflow: 'hidden',
    ...shadows.md,
  },
  dailyGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
  },
  dailyLeft: { flex: 1 },
  dailyTitle: { color: colors.white, fontWeight: '800', fontSize: fontSizes.lg },
  dailySubtitle: { color: 'rgba(255,255,255,0.9)', fontSize: fontSizes.sm, marginTop: 2 },
  dailyIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickPlayCard: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    borderRadius: radius.lg,
    overflow: 'hidden',
    ...shadows.md,
  },
  quickPlayGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
  },
  quickPlayLeft: { flex: 1 },
  quickPlayTitle: { color: colors.white, fontWeight: '800', fontSize: fontSizes.lg },
  quickPlaySubtitle: { color: 'rgba(255,255,255,0.9)', fontSize: fontSizes.sm, marginTop: 2 },
  quickPlayIcon: { marginLeft: spacing.md },
  section: {
    marginTop: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  sectionTitle: { fontSize: fontSizes.xl, fontWeight: '800', color: colors.text },
  sectionSubtitle: { fontSize: fontSizes.sm, color: colors.textLight, marginBottom: spacing.md },
  levelCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: radius.lg,
    marginBottom: spacing.md,
    borderLeftWidth: 5,
    ...shadows.sm,
  },
  levelEmojiCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  levelEmoji: { fontSize: 36 },
  levelContent: { flex: 1 },
  levelHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  levelName: { fontSize: fontSizes.xl, fontWeight: '800', color: colors.text, marginRight: spacing.sm },
  levelBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: radius.sm },
  levelBadgeText: { color: colors.white, fontSize: 10, fontWeight: '700' },
  levelDesc: { fontSize: fontSizes.sm, color: colors.textLight },
  levelAge: { fontSize: fontSizes.xs, color: colors.textLight, marginTop: 4 },
  levelProgressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
    marginBottom: 4,
  },
  levelProgressText: { marginLeft: spacing.sm, color: colors.textLight, fontSize: fontSizes.xs, fontWeight: '600' },
  topicsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing.sm,
  },
  topicPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  topicEmoji: { fontSize: 18, marginRight: 6 },
  topicPillText: { fontWeight: '700', fontSize: fontSizes.sm },
  encouragement: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.xl,
    backgroundColor: colors.mentalLight,
    padding: spacing.lg,
    borderRadius: radius.lg,
    alignItems: 'center',
  },
  encouragementEmoji: { fontSize: 40, marginBottom: spacing.sm },
  encouragementText: {
    fontSize: fontSizes.md,
    color: colors.mental,
    textAlign: 'center',
    fontWeight: '600',
    fontStyle: 'italic',
  },
});