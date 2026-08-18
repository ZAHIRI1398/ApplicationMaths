// User level titles and thresholds
export const LEVEL_TITLES = [
  { level: 1, title: 'Apprenti', emoji: '🌱', minXP: 0 },
  { level: 2, title: 'Explorateur', emoji: '🧭', minXP: 50 },
  { level: 3, title: 'Aventurier', emoji: '⚔️', minXP: 150 },
  { level: 4, title: 'Expert', emoji: '🎓', minXP: 300 },
  { level: 5, title: 'Maître', emoji: '👑', minXP: 500 },
  { level: 6, title: 'Légende', emoji: '🌟', minXP: 800 },
];

export function getLevelFromXP(xp: number) {
  let current = LEVEL_TITLES[0];
  for (const l of LEVEL_TITLES) {
    if (xp >= l.minXP) current = l;
  }
  const idx = LEVEL_TITLES.indexOf(current);
  const next = LEVEL_TITLES[idx + 1];
  const progress = next ? ((xp - current.minXP) / (next.minXP - current.minXP)) * 100 : 100;
  return {
    ...current,
    nextTitle: next?.title,
    nextXP: next?.minXP,
    progressToNext: Math.max(0, Math.min(100, progress)),
  };
}