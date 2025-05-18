import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useTheme } from '../../theme';

interface ProgressDotsProps {
  total: number;
  current: number;
}

export const ProgressDots: React.FC<ProgressDotsProps> = ({ total, current }) => {
  const theme = useTheme();
  const scaleAnim = useRef(Array.from({ length: total }, () => new Animated.Value(1))).current;

  useEffect(() => {
    scaleAnim.forEach((anim, i) => {
      Animated.spring(anim, {
        toValue: i + 1 === current ? 1.4 : 1,
        useNativeDriver: true,
        speed: 30,
        bounciness: 0,
      }).start();
    });
  }, [current, scaleAnim]);

  return (
    <View style={styles.container}>
      <View style={styles.dotsRow}>
        {Array.from({ length: total }).map((_, i) => (
          <Animated.View
            key={i}
            style={[
              styles.dot,
              {
                backgroundColor: i + 1 === current ? theme.colors.accentPrimary : '#D1D1D6',
                transform: [{ scale: scaleAnim[i] }],
                opacity: i + 1 === current ? 1 : 0.7,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 4,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  barBg: {
    width: 64,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E5E5EA',
    overflow: 'hidden',
  },
  barFg: {
    height: 4,
    borderRadius: 2,
  },
});
