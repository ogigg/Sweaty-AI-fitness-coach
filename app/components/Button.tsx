import React, { useRef } from 'react';
import {
  AccessibilityRole,
  Animated,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';
import { Typography } from '../../components/Typography';
import { useTheme } from '../../theme';

export type ButtonVariant = 'primary' | 'outline' | 'ghost';
export type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  accessibilityRole?: AccessibilityRole;
  accessible?: boolean;
  accessibilityState?: object;
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
  accessibilityLabel,
  accessibilityRole = 'button',
  accessible = true,
  accessibilityState,
}) => {
  const theme = useTheme();
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 40,
      bounciness: 0,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 40,
      bounciness: 0,
    }).start();
  };

  const baseStyle = [
    styles.base,
    sizeStyles[size],
    variantStyles[variant](theme, disabled),
    disabled && styles.disabled,
    style,
  ];

  const textColor =
    variant === 'primary'
      ? '#fff'
      : variant === 'outline'
        ? theme.colors.accentPrimary
        : theme.colors.textPrimary;

  return (
    <TouchableWithoutFeedback
      onPress={disabled ? undefined : onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
      accessible={accessible}
      accessibilityState={{ disabled, ...accessibilityState }}
    >
      <Animated.View style={[baseStyle, { transform: [{ scale }] }]}>
        <Typography variant='button' align='center' style={{ color: textColor }}>
          {children}
        </Typography>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const sizeStyles: Record<ButtonSize, ViewStyle> = {
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    minWidth: 80,
  },
  medium: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    minWidth: 120,
  },
  large: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    minWidth: 160,
  },
};

const variantStyles: Record<ButtonVariant, (theme: any, disabled: boolean) => ViewStyle> = {
  primary: (theme, disabled) => ({
    backgroundColor: disabled ? theme.colors.borderDefault : theme.colors.accentPrimary,
    borderWidth: 0,
  }),
  outline: (theme, disabled) => ({
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: disabled ? theme.colors.borderDefault : theme.colors.accentPrimary,
  }),
  ghost: (theme, _disabled) => ({
    backgroundColor: 'transparent',
    borderWidth: 0,
  }),
};

const styles = StyleSheet.create({
  base: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
  },
  disabled: {
    opacity: 0.6,
  },
});

/**
 * Usage:
 * <Button onPress={...} variant="primary|outline|ghost" size="small|medium|large">Label</Button>
 */
