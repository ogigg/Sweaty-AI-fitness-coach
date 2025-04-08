export const lightColors = {
  backgroundPrimary: '#F8F9FA',
  backgroundSecondary: '#FFFFFF',
  surface: '#FFFFFF',
  textPrimary: '#1C1C1E',
  textSecondary: '#6E6E73',
  textTertiary: '#AEAEB2',
  borderDefault: '#D1D1D6',
  accentPrimary: '#0A84FF',
  accentSecondary: '#85C5FF',
  success: '#34C759',
  error: '#FF3B30',
  warning: '#FF9500',
} as const;

export const darkColors = {
  backgroundPrimary: '#121212',
  backgroundSecondary: '#1C1C1E',
  surface: '#2C2C2E',
  textPrimary: '#E5E5E7',
  textSecondary: '#8E8E93',
  textTertiary: '#636366',
  borderDefault: '#3A3A3C',
  accentPrimary: '#3B9BFF',
  accentSecondary: '#004C99',
  success: '#30D158',
  error: '#FF453A',
  warning: '#FF9F0A',
} as const;

export type ColorScheme = typeof lightColors;
export type ColorKey = keyof ColorScheme;

export const semanticColors = {
  light: lightColors,
  dark: darkColors,
} as const;
