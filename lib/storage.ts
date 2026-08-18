import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProgress, ExerciseProgress, Badge } from './types';
import { BADGES, checkEarnedBadges } from './badges';

function getProgressKey(userId: string): string {
  return `@mathcenter_progress_${userId}`;
}

function getDailyKey(userId: string): string {
  return `@mathcenter_daily_${userId}`;
}

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

export async function loadProgress(userId: string): Promise<UserProgress> {
  try {
    const data = await AsyncStorage.getItem(getProgressKey(userId));
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

export async function saveProgress(userId: string, progress: UserProgress): Promise<void> {
  try {
    await AsyncStorage.setItem(getProgressKey(userId), JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress', e);
  }
}

export async function recordExerciseAttempt(
  userId: string,
  exerciseId: string,
  correct: boolean,
  usedHints: boolean,
  stars: number
): Promise<{ progress: UserProgress; newBadges: Badge[] }> {
  const progress = await loadProgress(userId);
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

  await saveProgress(userId, progress);
  return { progress, newBadges };
}

export async function resetProgress(userId: string): Promise<void> {
  await AsyncStorage.removeItem(getProgressKey(userId));
}

export async function recordDailyCompletion(userId: string): Promise<void> {
  try {
    const data = await AsyncStorage.getItem(getDailyKey(userId));
    const today = new Date().toISOString().split('T')[0];
    if (data) {
      const parsed = JSON.parse(data);
      if (parsed.date !== today) {
        await AsyncStorage.setItem(getDailyKey(userId), JSON.stringify({ date: today, completed: true }));
        const progress = await loadProgress(userId);
        progress.totalXP += 30;
        await saveProgress(userId, progress);
      }
    } else {
      await AsyncStorage.setItem(getDailyKey(userId), JSON.stringify({ date: today, completed: true }));
      const progress = await loadProgress(userId);
      progress.totalXP += 30;
      await saveProgress(userId, progress);
    }
  } catch (e) {}
}

export async function isDailyCompleted(userId: string): Promise<boolean> {
  try {
    const data = await AsyncStorage.getItem(getDailyKey(userId));
    if (!data) return false;
    const parsed = JSON.parse(data);
    const today = new Date().toISOString().split('T')[0];
    return parsed.date === today && parsed.completed;
  } catch {
    return false;
  }
}