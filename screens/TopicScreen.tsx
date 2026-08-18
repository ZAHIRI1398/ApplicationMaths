import React from 'react';
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
import { LEVELS, TOPICS, getExercisesByLevelAndTopic } from '../lib/exercises';
import { useProgress } from '../components/ProgressContext';
import HomeButton from '../components/HomeButton';
import { RootStackParamList } from '../App';
import { Level, Topic } from '../lib/types';

export default function TopicScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'Topic'>>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { progress } = useProgress();
  const { levelId } = route.params;

  const level = LEVELS.find(l => l.id === levelId)!;

  const getTopicStats = (topicId: Topic) => {
    const exercises = getExercisesByLevelAndTopic(levelId, topicId);
    const completed = exercises.filter(e => progress.exerciseProgress[e.id]?.completed);
    const stars = exercises.reduce((sum, e) => sum + (progress.exerciseProgress[e.id]?.stars || 0), 0);
    return {
      total: exercises.length,
      completed: completed.length,
      stars,
      maxStars: exercises.length * 3,
    };
  };

  const topicColors: Record<Topic, [string, string]> = {
    geometry: ['#8B5CF6', '#A78BFA'],
    fractions: ['#EF4444', '#F87171'],
    mental: ['#06B6D4', '#22D3EE'],
    numbers: ['#10B981', '#34D399'],
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={[level.color, level.color]}
        style={styles.header}
      >
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color={colors.white} />
        </TouchableOpacity>
        <HomeButton />
        <View style={styles.headerContent}>
          <Text style={styles.headerEmoji}>{level.emoji}</Text>
          <Text style={styles.headerTitle}>{level.name}</Text>
          <Text style={styles.headerSubtitle}>{level.fullName}</Text>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.intro}>
          <Text style={styles.introTitle}>Choisis un univers 🎯</Text>
          <Text style={styles.introText}>
            Chaque univers propose des exercices guidés avec des explications détaillées.
          </Text>
        </View>

        {TOPICS.map(topic => {
          const stats = getTopicStats(topic.id);
          const completion = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;

          return (
            <TouchableOpacity
              key={topic.id}
              style={[styles.topicCard, { borderColor: topic.color }]}
              onPress={() => navigation.navigate('ExerciseList', { levelId, topicId: topic.id })}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={topicColors[topic.id]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.topicHeader}
              >
                <Text style={styles.topicIconLarge}>{topic.emoji}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.topicNameLarge}>{topic.name}</Text>
                  <Text style={styles.topicDescLarge}>{topic.description}</Text>
                </View>
              </LinearGradient>

              <View style={styles.topicBody}>
                <View style={styles.topicStats}>
                  <View style={styles.topicStat}>
                    <Text style={styles.topicStatValue}>{stats.completed}/{stats.total}</Text>
                    <Text style={styles.topicStatLabel}>exercices</Text>
                  </View>
                  <View style={[styles.divider]} />
                  <View style={styles.topicStat}>
                    <Text style={[styles.topicStatValue, { color: topic.color }]}>
                      {stats.stars}/{stats.maxStars}
                    </Text>
                    <Text style={styles.topicStatLabel}>⭐ étoiles</Text>
                  </View>
                </View>

                <View style={styles.progressRow}>
                  <View style={styles.progressBarBg}>
                    <View
                      style={[
                        styles.progressBarFill,
                        {
                          width: `${completion}%`,
                          backgroundColor: topic.color,
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.progressText}>{Math.round(completion)}%</Text>
                </View>

                <View style={styles.ctaRow}>
                  <Text style={[styles.cta, { color: topic.color }]}>
                    {stats.completed === 0 ? 'Commencer' : stats.completed === stats.total ? 'Revoir' : 'Continuer'}
                  </Text>
                  <Ionicons name="arrow-forward-circle" size={24} color={topic.color} />
                </View>
              </View>
            </TouchableOpacity>
          );
        })}

        <View style={styles.tipBox}>
          <Text style={styles.tipEmoji}>💡</Text>
          <Text style={styles.tipText}>
            Astuce : complète tous les exercices d'un univers pour débloquer des badges !
          </Text>
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
  headerSubtitle: { fontSize: fontSizes.md, color: 'rgba(255,255,255,0.9)', marginTop: 4 },
  scroll: { padding: spacing.lg, paddingBottom: spacing.xxl },
  intro: { marginBottom: spacing.lg },
  introTitle: { fontSize: fontSizes.xl, fontWeight: '800', color: colors.text, marginBottom: spacing.xs },
  introText: { fontSize: fontSizes.sm, color: colors.textLight, lineHeight: 20 },
  topicCard: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    marginBottom: spacing.md,
    overflow: 'hidden',
    borderWidth: 2,
    ...shadows.md,
  },
  topicHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  topicIconLarge: { fontSize: 48, marginRight: spacing.md },
  topicNameLarge: { fontSize: fontSizes.xl, fontWeight: '800', color: colors.white },
  topicDescLarge: { fontSize: fontSizes.sm, color: 'rgba(255,255,255,0.9)', marginTop: 2 },
  topicBody: { padding: spacing.md },
  topicStats: {
    flexDirection: 'row',
    paddingBottom: spacing.md,
  },
  topicStat: { flex: 1, alignItems: 'center' },
  topicStatValue: { fontSize: fontSizes.lg, fontWeight: '800', color: colors.text },
  topicStatLabel: { fontSize: fontSizes.xs, color: colors.textLight, marginTop: 2 },
  divider: { width: 1, backgroundColor: colors.border },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  progressBarBg: {
    flex: 1,
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: { height: '100%', borderRadius: 4 },
  progressText: {
    marginLeft: spacing.sm,
    fontWeight: '700',
    color: colors.textLight,
    fontSize: fontSizes.sm,
    minWidth: 40,
    textAlign: 'right',
  },
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cta: { fontWeight: '800', fontSize: fontSizes.md },
  tipBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.warning + '20',
    padding: spacing.md,
    borderRadius: radius.md,
    marginTop: spacing.md,
  },
  tipEmoji: { fontSize: 24, marginRight: spacing.sm },
  tipText: { flex: 1, color: colors.text, fontSize: fontSizes.sm, lineHeight: 18 },
});