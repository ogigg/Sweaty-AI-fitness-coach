export const spacing = {
  xxs: 4,
  xs: 8,
  s: 12,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 40,
  xxxl: 48,
} as const;

export const layout = {
  screenPadding: spacing.l,
  contentSpacing: spacing.m,
  sectionSpacing: spacing.xl,
  elementSpacing: spacing.s,
  iconSpacing: spacing.xs,
} as const;

export type Spacing = keyof typeof spacing;
export type Layout = keyof typeof layout;
