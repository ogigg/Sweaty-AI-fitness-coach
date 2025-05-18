import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { useTheme } from '../theme';

type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'bodyLarge'
  | 'bodyMedium'
  | 'button'
  | 'caption';

type TypographyColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'accent'
  | 'success'
  | 'error'
  | 'warning';

interface TypographyProps extends Omit<TextProps, 'style'> {
  variant?: TypographyVariant;
  color?: TypographyColor;
  align?: 'left' | 'center' | 'right';
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  style?: TextStyle;
  children: React.ReactNode;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'bodyMedium',
  color,
  align = 'left',
  weight,
  style,
  children,
  ...rest
}) => {
  const theme = useTheme();

  const baseStyle = theme.typography[variant];

  const getTextColor = () => {
    if (!color) return theme.colors.textPrimary;

    switch (color) {
      case 'primary':
        return theme.colors.textPrimary;
      case 'secondary':
        return theme.colors.textSecondary;
      case 'tertiary':
        return theme.colors.textTertiary;
      case 'accent':
        return theme.colors.accentPrimary;
      case 'success':
        return theme.colors.success;
      case 'error':
        return theme.colors.error;
      case 'warning':
        return theme.colors.warning;
      default:
        return theme.colors.textPrimary;
    }
  };

  const getFontWeight = () => {
    if (!weight) return baseStyle.fontWeight;

    switch (weight) {
      case 'regular':
        return theme.typography.bodyMedium.fontWeight;
      case 'medium':
        return theme.typography.h4.fontWeight;
      case 'semibold':
        return theme.typography.h3.fontWeight;
      case 'bold':
        return theme.typography.h1.fontWeight;
      default:
        return baseStyle.fontWeight;
    }
  };

  return (
    <Text
      style={[
        baseStyle,
        {
          color: getTextColor(),
          textAlign: align,
          fontWeight: getFontWeight(),
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
};
