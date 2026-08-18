import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProgress, ExerciseProgress, Badge } from './types';
import { BADGES, checkEarnedBadges } from './badges';

const STORAGE_KEY = '@mathcenter_progress_v1';
const DAILY_KEY = '@mathcenter_daily_v1';

const DEFAULT_PROGRESS: UserProgress = {
  totalStars: 0,
  totalXP: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastActiveDate: '',
  level: 1,
  title: 'Apprenti',
  badges: [],
  exerciseProgress: {},
  stats: {},
};

export async function loadProgress(): Promise<UserProgress> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      // Check streak
      const today = new Date().toISOString().split('T')[0];
      if (parsed.lastActiveDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        if (parsed.lastActiveDate !== yesterdayStr) {
          parsed.currentStreak = 0;
        }
      }
      return { ...DEFAULT_PROGRESS, ...parsed };
    }
    return DEFAULT_PROGRESS;
  } catch (e) {
    return DEFAULT_PROGRESS;
  }
}

export async function saveProgress(progress: UserProgress): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress', e);
  }
}

export async function recordExerciseAttempt(
  exerciseId: string,
  correct: boolean,
  usedHints: boolean,
  stars: number
): Promise<{ progress: UserProgress; newBadges: Badge[] }> {
  const progress = await loadProgress();
  const today = new Date().toISOString().split('T')[0];

  // Update streak
  if (progress.lastActiveDate !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    if (progress.lastActiveDate === yesterdayStr) {
      progress.currentStreak += 1;
    } else {
      progress.currentStreak = 1;
    }
    progress.lastActiveDate = today;
  }

  // Update exercise progress
  const existing = progress.exerciseProgress[exerciseId];
  const prevStars = existing?.stars || 0;
  const newStars = Math.max(prevStars, stars);
  const starsGained = newStars - prevStars;

  progress.exerciseProgress[exerciseId] = {
    exerciseId,
    completed: correct,
    stars: newStars,
    attempts: (existing?.attempts || 0) + 1,
    usedHints: usedHints || (existing?.usedHints || false),
    lastAttemptDate: today,
  };

  progress.totalStars += starsGained;

  // Award XP for new stars
  progress.totalXP += starsGained * 5;

  if (correct && stars === 3) {
    progress.totalXP += 5; // bonus for perfect
  }

  if (progress.currentStreak > progress.longestStreak) {
    progress.longestStreak = progress.currentStreak;
  }

  // Check for new badges
  const newBadgeIds = checkEarnedBadges(progress);
  const newBadges: Badge[] = [];
  for (const badgeId of newBadgeIds) {
    if (!progress.badges.includes(badgeId)) {
      progress.badges.push(badgeId);
      const badge = BADGES.find(b => b.id === badgeId);
      if (badge) {
        newBadges.push(badge);
        progress.totalXP += 25; // bonus for badge
      }
    }
  }

  await saveProgress(progress);
  return { progress, newBadges };
}

export async function resetProgress(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_KEY);
}

export async function recordDailyCompletion(): Promise<void> {
  try {
    const data = await AsyncStorage.getItem(DAILY_KEY);
    const today = new Date().toISOString().split('T')[0];
    if (data) {
      const parsed = JSON.parse(data);
      if (parsed.date !== today) {
        await AsyncStorage.setItem(DAILY_KEY, JSON.stringify({ date: today, completed: true }));
        const progress = await loadProgress();
        progress.totalXP += 30;
        await saveProgress(progress);
      }
    } else {
      await AsyncStorage.setItem(DAILY_KEY, JSON.stringify({ date: today, completed: true }));
      const progress = await loadProgress();
      progress.totalXP += 30;
      await saveProgress(progress);
    }
  } catch (e) {}
}

export async function isDailyCompleted(): Promise<boolean> {
  try {
    const data = await AsyncStorage.getItem(DAILY_KEY);
    if (!data) return false;
    const parsed = JSON.parse(data);
    const today = new Date().toISOString().split('T')[0];
    return parsed.date === today && parsed.completed;
  } catch {
    return false;
  }
}