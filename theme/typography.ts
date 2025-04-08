import { Platform, TextStyle } from 'react-native';

export const fontFamily = {
  regular: Platform.select({
    ios: 'Inter-Regular',
    android: 'Inter-Regular',
    default: 'Inter-Regular',
  }),
  medium: Platform.select({
    ios: 'Inter-Medium',
    android: 'Inter-Medium',
    default: 'Inter-Medium',
  }),
  semibold: Platform.select({
    ios: 'Inter-SemiBold',
    android: 'Inter-SemiBold',
    default: 'Inter-SemiBold',
  }),
  bold: Platform.select({
    ios: 'Inter-Bold',
    android: 'Inter-Bold',
    default: 'Inter-Bold',
  }),
};

export const fontSize = {
  h1: 32,
  h2: 24,
  h3: 20,
  h4: 18,
  bodyLarge: 16,
  bodyMedium: 15,
  button: 15,
  caption: 13,
} as const;

export const lineHeight = {
  h1: 40,
  h2: 32,
  h3: 28,
  h4: 24,
  bodyLarge: 24,
  bodyMedium: 22,
  button: 22,
  caption: 18,
} as const;

export const fontWeight = {
  regular: '400' as TextStyle['fontWeight'],
  medium: '500' as TextStyle['fontWeight'],
  semibold: '600' as TextStyle['fontWeight'],
  bold: '700' as TextStyle['fontWeight'],
};

export const typography = {
  h1: {
    fontSize: fontSize.h1,
    lineHeight: lineHeight.h1,
    fontFamily: fontFamily.bold,
    fontWeight: fontWeight.bold,
  } as TextStyle,
  h2: {
    fontSize: fontSize.h2,
    lineHeight: lineHeight.h2,
    fontFamily: fontFamily.semibold,
    fontWeight: fontWeight.semibold,
  } as TextStyle,
  h3: {
    fontSize: fontSize.h3,
    lineHeight: lineHeight.h3,
    fontFamily: fontFamily.semibold,
    fontWeight: fontWeight.semibold,
  } as TextStyle,
  h4: {
    fontSize: fontSize.h4,
    lineHeight: lineHeight.h4,
    fontFamily: fontFamily.medium,
    fontWeight: fontWeight.medium,
  } as TextStyle,
  bodyLarge: {
    fontSize: fontSize.bodyLarge,
    lineHeight: lineHeight.bodyLarge,
    fontFamily: fontFamily.regular,
    fontWeight: fontWeight.regular,
  } as TextStyle,
  bodyMedium: {
    fontSize: fontSize.bodyMedium,
    lineHeight: lineHeight.bodyMedium,
    fontFamily: fontFamily.regular,
    fontWeight: fontWeight.regular,
  } as TextStyle,
  button: {
    fontSize: fontSize.button,
    lineHeight: lineHeight.button,
    fontFamily: fontFamily.semibold,
    fontWeight: fontWeight.semibold,
  } as TextStyle,
  caption: {
    fontSize: fontSize.caption,
    lineHeight: lineHeight.caption,
    fontFamily: fontFamily.regular,
    fontWeight: fontWeight.regular,
  } as TextStyle,
};
