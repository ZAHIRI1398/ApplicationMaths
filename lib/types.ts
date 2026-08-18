// Type definitions for the app

export type Level = '1Obs' | '1phase' | '5eme';

export type Topic = 'geometry' | 'fractions' | 'mental' | 'numbers';

export interface LevelInfo {
  id: Level;
  name: string;
  fullName: string;
  emoji: string;
  color: string;
  colorLight: string;
  description: string;
  ageRange: string;
}

export interface TopicInfo {
  id: Topic;
  name: string;
  emoji: string;
  color: string;
  colorLight: string;
  description: string;
}

export interface ExerciseStep {
  text: string;
  formula?: string;
}

export interface Exercise {
  id: string;
  level: Level;
  topic: Topic;
  title: string;
  emoji: string;
  question: string;
  // For multiple choice
  options?: string[];
  correctAnswer: string;
  // Step-by-step guidance
  steps: ExerciseStep[];
  explanation: string;
  // For visual exercises - geometric data, etc.
  visual?: VisualData;
  // Difficulty 1-5
  difficulty: number;
  // XP reward
  xp: number;
}

export interface VisualData {
  type: 'rectangle' | 'triangle' | 'circle' | 'fraction-bar' | 'pie';
  // Generic shape data
  width?: number;
  height?: number;
  radius?: number;
  // Fraction visualization
  numerator?: number;
  denominator?: number;
  // Labels
  labels?: Array<{ text: string; x: number; y: number; color?: string }>;
}

export interface ExerciseProgress {
  exerciseId: string;
  completed: boolean;
  stars: number; // 0-3
  attempts: number;
  usedHints: boolean;
  lastAttemptDate: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  emoji: string;
  // Condition
  condition: 'stars' | 'streak' | 'level-stars' | 'topic-stars' | 'perfect';
  threshold: number;
  target?: Level | Topic;
  color: string;
}

export interface UserProgress {
  totalStars: number;
  totalXP: number;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
  level: number;
  title: string;
  badges: string[]; // earned badge ids
  exerciseProgress: Record<string, ExerciseProgress>;
  // Per level/topic completion stats
  stats: Record<string, { completed: number; total: number; stars: number }>;
}

export interface DailyChallenge {
  id: string;
  date: string;
  exercises: Array<{
    exerciseId: string;
    bonus: number;
  }>;
  totalBonus: number;
  completed: boolean;
}