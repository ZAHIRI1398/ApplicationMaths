import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fontSizes, spacing, radius, shadows } from '../lib/theme';
import { useProgress } from '../components/ProgressContext';
import { useAuth } from '../components/AuthContext';
import { EXERCISES, TOTAL_EXERCISES } from '../lib/exercises';
import { getLevelFromXP } from '../lib/levelTitles';
import { ProgressBar } from '../components/ProgressBar';
import { LEVELS } from '../lib/exercises';
import HomeButton from '../components/HomeButton';
import { RootStackParamList } from '../App';

export default function ProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { progress, reset } = useProgress();
  const { user, logout } = useAuth();
  const levelInfo = getLevelFromXP(progress.totalXP);

  const completedCount = Object.values(progress.exerciseProgress).filter(p => p.completed).length;
  const perfectCount = Object.values(progress.exerciseProgress).filter(p => p.stars === 3).length;

  const handleReset = () => {
    Alert.alert(
      'Réinitialiser la progression ?',
      'Cette action effacera toutes tes étoiles et badges. Es-tu sûr ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Réinitialiser',
          style: 'destructive',
          onPress: async () => {
            await reset();
            Alert.alert('Fait !', 'Ta progression a été réinitialisée.');
          },
        },
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Se déconnecter ?',
      'Tu pourras te reconnecter plus tard avec ton nom et mot de passe.',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Déconnexion',
          onPress: async () => {
            await logout();
            navigation.replace('Login');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <LinearGradient
          colors={['#EC4899', '#8B5CF6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <HomeButton />
          <View style={styles.avatar}>
            <Text style={styles.avatarEmoji}>{levelInfo.emoji}</Text>
          </View>
          <Text style={styles.heroTitle}>{user ? user.name : levelInfo.title}</Text>
          <Text style={styles.heroLevel}>Niveau {levelInfo.level} • {progress.totalXP} XP</Text>

          <View style={styles.heroStatsRow}>
            <View style={styles.heroStat}>
              <Text style={styles.heroStatValue}>{progress.totalStars}</Text>
              <Text style={styles.heroStatLabel}>⭐ Étoiles</Text>
            </View>
            <View style={styles.heroStatDivider} />
            <View style={styles.heroStat}>
              <Text style={styles.heroStatValue}>{progress.badges.length}</Text>
              <Text style={styles.heroStatLabel}>🏆 Badges</Text>
            </View>
            <View style={styles.heroStatDivider} />
            <View style={styles.heroStat}>
              <Text style={styles.heroStatValue}>{progress.currentStreak}</Text>
              <Text style={styles.heroStatLabel}>🔥 Streak</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🌟 Tes accomplissements</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Text style={styles.statBoxEmoji}>✅</Text>
              <Text style={styles.statBoxValue}>{completedCount}</Text>
              <Text style={styles.statBoxLabel}>Exercices terminés</Text>
              <Text style={styles.statBoxHint}>sur {TOTAL_EXERCISES}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statBoxEmoji}>🎯</Text>
              <Text style={styles.statBoxValue}>{perfectCount}</Text>
              <Text style={styles.statBoxLabel}>Scores parfaits</Text>
              <Text style={styles.statBoxHint}>3 étoiles obtenues</Text>
            </View>
          </View>
        </View>

        {/* Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💡 Astuces pour progresser</Text>
          <View style={styles.tipCard}>
            <View style={styles.tipIcon}>
              <Ionicons name="bulb" size={22} color={colors.warning} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.tipTitle}>Fais les exercices dans l'ordre</Text>
              <Text style={styles.tipText}>
                Les exercices sont pensés pour monter en difficulté.
              </Text>
            </View>
          </View>
          <View style={styles.tipCard}>
            <View style={styles.tipIcon}>
              <Ionicons name="repeat" size={22} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.tipTitle}>Revois tes erreurs</Text>
              <Text style={styles.tipText}>
                Refais les exercices pour gagner plus d'étoiles.
              </Text>
            </View>
          </View>
          <View style={styles.tipCard}>
            <View style={styles.tipIcon}>
              <Ionicons name="calendar" size={22} color={colors.success} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.tipTitle}>Reviens chaque jour</Text>
              <Text style={styles.tipText}>
                Un peu chaque jour, c'est mieux que beaucoup d'un coup !
              </Text>
            </View>
          </View>
        </View>

        {/* Level by level summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📚 Détails par niveau</Text>
          {LEVELS.map(level => {
            const levelExercises = EXERCISES.filter(e => e.level === level.id);
            const completed = levelExercises.filter(e => progress.exerciseProgress[e.id]?.completed).length;
            const stars = levelExercises.reduce((sum, e) => sum + (progress.exerciseProgress[e.id]?.stars || 0), 0);
            const pct = (completed / levelExercises.length) * 100;

            return (
              <View key={level.id} style={styles.levelSummary}>
                <View style={[styles.levelSummaryHeader, { backgroundColor: level.colorLight }]}>
                  <Text style={styles.levelSummaryEmoji}>{level.emoji}</Text>
                  <Text style={[styles.levelSummaryName, { color: level.color }]}>{level.fullName}</Text>
                </View>
                <View style={styles.levelSummaryBody}>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Exercices terminés</Text>
                    <Text style={styles.summaryValue}>{completed} / {levelExercises.length}</Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Étoiles gagnées</Text>
                    <Text style={styles.summaryValue}>{stars} ⭐</Text>
                  </View>
                  <ProgressBar progress={pct} color={level.color} height={6} />
                </View>
              </View>
            );
          })}
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ℹ️ À propos de l'app</Text>
          <View style={styles.aboutCard}>
            <Text style={styles.aboutEmoji}>🎓</Text>
            <Text style={styles.aboutTitle}>Math-Center</Text>
            <Text style={styles.aboutText}>
              Une application pensée pour t'aider à progresser en maths, avec des exercices guidés du CM2 à la 5ème.
            </Text>
            <View style={styles.aboutRow}>
              <Ionicons name="heart" size={16} color={colors.error} />
              <Text style={styles.aboutRowText}>Fait avec amour pour les élèves</Text>
            </View>
            <View style={styles.aboutRow}>
              <Ionicons name="school" size={16} color={colors.primary} />
              <Text style={styles.aboutRowText}>{TOTAL_EXERCISES} exercices guidés</Text>
            </View>
            <View style={styles.aboutRow}>
              <Ionicons name="trophy" size={16} color={colors.warning} />
              <Text style={styles.aboutRowText}>13 badges à débloquer</Text>
            </View>
          </View>
        </View>

        {/* Logout */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={22} color={colors.primary} />
            <Text style={styles.logoutText}>Se déconnecter</Text>
          </TouchableOpacity>
        </View>

        {/* Reset */}
        <View style={[styles.section, { marginBottom: spacing.xxl }]}>
          <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
            <Ionicons name="refresh-circle" size={22} color={colors.error} />
            <Text style={styles.resetText}>Réinitialiser ma progression</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  hero: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl,
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  avatarEmoji: { fontSize: 50 },
  heroTitle: { fontSize: fontSizes.xxl, fontWeight: '900', color: colors.white },
  heroLevel: { fontSize: fontSizes.sm, color: 'rgba(255,255,255,0.9)', marginTop: 4 },
  heroStatsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    marginTop: spacing.lg,
    width: '100%',
  },
  heroStat: { flex: 1, alignItems: 'center' },
  heroStatDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.3)' },
  heroStatValue: { fontSize: fontSizes.xl, fontWeight: '900', color: colors.white },
  heroStatLabel: { fontSize: fontSizes.xs, color: 'rgba(255,255,255,0.9)', marginTop: 2 },
  section: { paddingHorizontal: spacing.lg, marginTop: spacing.xl },
  sectionTitle: { fontSize: fontSizes.xl, fontWeight: '800', color: colors.text, marginBottom: spacing.md },
  statsGrid: { flexDirection: 'row' },
  statBox: {
    flex: 1,
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: radius.lg,
    alignItems: 'center',
    marginHorizontal: spacing.xs,
    ...shadows.sm,
  },
  statBoxEmoji: { fontSize: 30 },
  statBoxValue: { fontSize: fontSizes.xxl, fontWeight: '900', color: colors.text, marginTop: spacing.xs },
  statBoxLabel: { fontSize: fontSizes.xs, color: colors.textLight, textAlign: 'center', marginTop: 4 },
  statBoxHint: { fontSize: 10, color: colors.textLight, textAlign: 'center' },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: radius.lg,
    marginBottom: spacing.sm,
    ...shadows.sm,
  },
  tipIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  tipTitle: { fontSize: fontSizes.sm, fontWeight: '800', color: colors.text },
  tipText: { fontSize: fontSizes.xs, color: colors.textLight, marginTop: 2, lineHeight: 16 },
  levelSummary: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    overflow: 'hidden',
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  levelSummaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  levelSummaryEmoji: { fontSize: 24, marginRight: spacing.sm },
  levelSummaryName: { fontSize: fontSizes.md, fontWeight: '800' },
  levelSummaryBody: { padding: spacing.md },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  summaryLabel: { fontSize: fontSizes.sm, color: colors.textLight },
  summaryValue: { fontSize: fontSizes.sm, fontWeight: '800', color: colors.text },
  aboutCard: {
    backgroundColor: colors.card,
    padding: spacing.lg,
    borderRadius: radius.lg,
    alignItems: 'center',
    ...shadows.sm,
  },
  aboutEmoji: { fontSize: 50 },
  aboutTitle: { fontSize: fontSizes.xl, fontWeight: '900', color: colors.text, marginTop: spacing.sm },
  aboutText: {
    fontSize: fontSizes.sm,
    color: colors.textLight,
    textAlign: 'center',
    marginTop: spacing.sm,
    lineHeight: 20,
  },
  aboutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  aboutRowText: { marginLeft: spacing.sm, fontSize: fontSizes.sm, color: colors.text },
  resetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderColor: colors.error + '50',
    backgroundColor: colors.errorLight,
  },
  resetText: { color: colors.error, fontWeight: '800', fontSize: fontSizes.sm, marginLeft: spacing.sm },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderColor: colors.primary + '50',
    backgroundColor: colors.primary + '10',
  },
  logoutText: { color: colors.primary, fontWeight: '800', fontSize: fontSizes.sm, marginLeft: spacing.sm },
});