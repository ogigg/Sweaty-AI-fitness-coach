export const borderRadius = {
  s: 4,
  m: 8,
  l: 12,
  xl: 16,
  full: 9999,
} as const;

export type BorderRadius = keyof typeof borderRadius;
