import { Badge } from './types';

export const BADGES: Badge[] = [
  {
    id: 'first-step',
    name: 'Premier pas',
    description: 'Termine ton premier exercice',
    emoji: '🌟',
    condition: 'stars',
    threshold: 1,
    color: '#FBBF24',
  },
  {
    id: 'star-collector',
    name: 'Collectionneur d\'étoiles',
    description: 'Collecte 10 étoiles',
    emoji: '⭐',
    condition: 'stars',
    threshold: 10,
    color: '#F59E0B',
  },
  {
    id: 'star-master',
    name: 'Maître des étoiles',
    description: 'Collecte 30 étoiles',
    emoji: '✨',
    condition: 'stars',
    threshold: 30,
    color: '#EC4899',
  },
  {
    id: 'star-legend',
    name: 'Légende des étoiles',
    description: 'Collecte 60 étoiles',
    emoji: '🌠',
    condition: 'stars',
    threshold: 60,
    color: '#8B5CF6',
  },
  {
    id: '1Obs-champion',
    name: 'Champion 1Obs',
    description: 'Termine tous les exercices 1Obs',
    emoji: '🌱',
    condition: 'level-stars',
    threshold: 100,
    target: '1Obs',
    color: '#10B981',
  },
  {
    id: '6eme-pro',
    name: 'Pro de la 6ème',
    description: 'Termine tous les exercices 6ème',
    emoji: '🚀',
    condition: 'level-stars',
    threshold: 100,
    target: '6eme',
    color: '#3B82F6',
  },
  {
    id: '5eme-expert',
    name: 'Expert 5ème',
    description: 'Termine tous les exercices 5ème',
    emoji: '🔥',
    condition: 'level-stars',
    threshold: 100,
    target: '5eme',
    color: '#F59E0B',
  },
  {
    id: 'geometry-guru',
    name: 'Géomètre',
    description: 'Maîtrise la géométrie',
    emoji: '📐',
    condition: 'topic-stars',
    threshold: 30,
    target: 'geometry',
    color: '#8B5CF6',
  },
  {
    id: 'fraction-fan',
    name: 'As des fractions',
    description: 'Maîtrise les fractions',
    emoji: '🍕',
    condition: 'topic-stars',
    threshold: 30,
    target: 'fractions',
    color: '#EF4444',
  },
  {
    id: 'mental-master',
    name: 'Mentaliste',
    description: 'Maîtrise le calcul mental',
    emoji: '🧠',
    condition: 'topic-stars',
    threshold: 30,
    target: 'mental',
    color: '#06B6D4',
  },
  {
    id: 'streak-3',
    name: 'Régulier',
    description: '3 jours d\'affilée',
    emoji: '🔥',
    condition: 'streak',
    threshold: 3,
    color: '#F97316',
  },
  {
    id: 'streak-7',
    name: 'Inarrêtable',
    description: '7 jours d\'affilée',
    emoji: '💪',
    condition: 'streak',
    threshold: 7,
    color: '#DC2626',
  },
  {
    id: 'perfect-score',
    name: 'Perfectionniste',
    description: '3 étoiles sur un exercice',
    emoji: '🏆',
    condition: 'perfect',
    threshold: 1,
    color: '#FBBF24',
  },
];

export const LEVEL_TITLES = [
  { level: 1, title: 'Apprenti', emoji: '🌱' },
  { level: 2, title: 'Explorateur', emoji: '🧭' },
  { level: 3, title: 'Aventurier', emoji: '⚔️' },
  { level: 4, title: 'Expert', emoji: '🎓' },
  { level: 5, title: 'Maître', emoji: '👑' },
  { level: 6, title: 'Légende', emoji: '🌟' },
];

export function calculateLevel(totalXP: number): { level: number; title: string; emoji: string; nextLevelXP: number; progress: number } {
  const thresholds = [0, 50, 150, 300, 500, 800];
  let level = 1;
  for (let i = 1; i < thresholds.length; i++) {
    if (totalXP >= thresholds[i]) {
      level = i + 1;
    }
  }
  const currentThreshold = thresholds[level - 1];
  const nextThreshold = thresholds[level] || thresholds[thresholds.length - 1] + 300;
  const progress = ((totalXP - currentThreshold) / (nextThreshold - currentThreshold)) * 100;
  const titleInfo = LEVEL_TITLES[Math.min(level - 1, LEVEL_TITLES.length - 1)];
  return {
    level,
    title: titleInfo.title,
    emoji: titleInfo.emoji,
    nextLevelXP: nextThreshold,
    progress: Math.min(progress, 100),
  };
}

export function checkEarnedBadges(progress: any): string[] {
  const earned: string[] = [];
  const today = new Date().toISOString().split('T')[0];
  const lastDate = progress.lastActiveDate;
  let currentStreak = progress.currentStreak || 0;
  if (lastDate !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    if (lastDate !== yesterdayStr) {
      currentStreak = 0;
    }
  }

  for (const badge of BADGES) {
    if (progress.badges?.includes(badge.id)) continue;

    let qualifies = false;
    switch (badge.condition) {
      case 'stars':
        qualifies = progress.totalStars >= badge.threshold;
        break;
      case 'streak':
        qualifies = currentStreak >= badge.threshold;
        break;
      case 'level-stars':
        // Sum stars for that level
        const levelStars = Object.values(progress.exerciseProgress || {})
          .filter((p: any) => {
            const ex = (p as any).exerciseId;
            return ex && ex.startsWith(badge.target === '1Obs' ? '1Obs-' : badge.target === '6eme' ? '6eme-' : '5eme-');
          })
          .reduce((sum: number, p: any) => sum + (p.stars || 0), 0);
        qualifies = levelStars >= badge.threshold;
        break;
      case 'topic-stars':
        const topicStars = Object.values(progress.exerciseProgress || {})
          .filter((p: any) => {
            const exId = (p as any).exerciseId as string;
            return exId && exId.includes(badge.target === 'geometry' ? '-geo' : badge.target === 'fractions' ? '-frac' : '-men');
          })
          .reduce((sum: number, p: any) => sum + (p.stars || 0), 0);
        qualifies = topicStars >= badge.threshold;
        break;
      case 'perfect':
        const perfectCount = Object.values(progress.exerciseProgress || {})
          .filter((p: any) => (p as any).stars === 3).length;
        qualifies = perfectCount >= badge.threshold;
        break;
    }

    if (qualifies) earned.push(badge.id);
  }
  return earned;
}