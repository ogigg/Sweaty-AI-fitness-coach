import { useColorScheme } from 'react-native';
import { borderRadius } from './borderRadius';
import { semanticColors } from './colors';
import { layout, spacing } from './spacing';
import { typography } from './typography';

export type Theme = {
  typography: typeof typography;
  spacing: typeof spacing;
  layout: typeof layout;
  borderRadius: typeof borderRadius;
  colors: typeof semanticColors.light | typeof semanticColors.dark;
};

const createTheme = (colorScheme: 'light' | 'dark'): Theme => ({
  typography,
  spacing,
  layout,
  borderRadius,
  colors: semanticColors[colorScheme],
});

export const useTheme = (): Theme => {
  const colorScheme = useColorScheme() ?? 'light';
  return createTheme(colorScheme);
};

export * from './borderRadius';
export * from './colors';
export * from './spacing';
export * from './typography';
