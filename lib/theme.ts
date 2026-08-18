// Color theme - colorful and playful, inspired by Math-Center.org
export const colors = {
  // Primary brand colors
  primary: '#7C3AED', // vibrant purple
  primaryDark: '#5B21B6',
  secondary: '#F59E0B', // warm orange
  accent: '#EC4899', // pink

  // Level colors
  cm2: '#10B981', // emerald green
  cm2Light: '#D1FAE5',
  sixieme: '#3B82F6', // blue
  sixiemeLight: '#DBEAFE',
  cinquieme: '#F59E0B', // amber
  cinquiemeLight: '#FEF3C7',

  // Topic colors
  geometry: '#8B5CF6', // purple
  geometryLight: '#EDE9FE',
  fractions: '#EF4444', // red
  fractionsLight: '#FEE2E2',
  mental: '#06B6D4', // cyan
  mentalLight: '#CFFAFE',

  // Status
  success: '#22C55E',
  successLight: '#DCFCE7',
  error: '#EF4444',
  errorLight: '#FEE2E2',
  warning: '#F59E0B',

  // Neutrals
  background: '#F9FAFB',
  card: '#FFFFFF',
  text: '#111827',
  textLight: '#6B7280',
  border: '#E5E7EB',
  white: '#FFFFFF',

  // Star colors
  star: '#FBBF24',
  starEmpty: '#E5E7EB',

  // Gradients
  gradientPurple: ['#7C3AED', '#A855F7'],
  gradientPink: ['#EC4899', '#F472B6'],
  gradientBlue: ['#3B82F6', '#60A5FA'],
  gradientGreen: ['#10B981', '#34D399'],
  gradientOrange: ['#F59E0B', '#FBBF24'],
  gradientRed: ['#EF4444', '#F87171'],
  gradientRainbow: ['#EC4899', '#8B5CF6', '#3B82F6'],
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
};

export const fontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 22,
  xxl: 28,
  xxxl: 36,
};