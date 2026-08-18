import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { UserProgress } from '../lib/types';
import { loadProgress, recordExerciseAttempt as record, resetProgress } from '../lib/storage';
import { useAuth } from './AuthContext';
import { Badge } from '../lib/types';

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

interface ProgressContextValue {
  progress: UserProgress;
  loading: boolean;
  refresh: () => Promise<void>;
  recordAttempt: (exerciseId: string, correct: boolean, usedHints: boolean, stars: number) => Promise<{ newBadges: Badge[] }>;
  reset: () => Promise<void>;
}

const ProgressContext = createContext<ProgressContextValue | undefined>(undefined);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [progress, setProgress] = useState<UserProgress>(DEFAULT_PROGRESS);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (user) {
      const p = await loadProgress(user.id);
      setProgress(p);
    } else {
      setProgress(DEFAULT_PROGRESS);
    }
  }, [user]);

  useEffect(() => {
    (async () => {
      await refresh();
      setLoading(false);
    })();
  }, [refresh]);

  const recordAttempt = useCallback(async (exerciseId: string, correct: boolean, usedHints: boolean, stars: number) => {
    if (!user) return { newBadges: [] };
    const result = await record(user.id, exerciseId, correct, usedHints, stars);
    setProgress(result.progress);
    return { newBadges: result.newBadges };
  }, [user]);

  const reset = useCallback(async () => {
    if (!user) return;
    await resetProgress(user.id);
    await refresh();
  }, [refresh, user]);

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