import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { UserProgress } from '../lib/types';
import { loadProgress, saveProgress, recordExerciseAttempt as record, resetProgress } from '../lib/storage';
import { Badge } from '../lib/types';

interface ProgressContextValue {
  progress: UserProgress;
  loading: boolean;
  refresh: () => Promise<void>;
  recordAttempt: (exerciseId: string, correct: boolean, usedHints: boolean, stars: number) => Promise<{ newBadges: Badge[] }>;
  reset: () => Promise<void>;
}

const ProgressContext = createContext<ProgressContextValue | undefined>(undefined);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>({
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
  });
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const p = await loadProgress();
    setProgress(p);
  }, []);

  useEffect(() => {
    (async () => {
      const p = await loadProgress();
      setProgress(p);
      setLoading(false);
    })();
  }, []);

  const recordAttempt = useCallback(async (exerciseId: string, correct: boolean, usedHints: boolean, stars: number) => {
    const result = await record(exerciseId, correct, usedHints, stars);
    setProgress(result.progress);
    return { newBadges: result.newBadges };
  }, []);

  const reset = useCallback(async () => {
    await resetProgress();
    await refresh();
  }, [refresh]);

  return (
    <ProgressContext.Provider value={{ progress, loading, refresh, recordAttempt, reset }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
}