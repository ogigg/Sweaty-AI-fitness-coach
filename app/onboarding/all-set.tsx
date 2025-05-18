import { router } from 'expo-router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, View } from 'react-native';
import { Typography } from '../../components/Typography';
import { useTheme } from '../../theme';
import { Button } from '../components/Button';
import { onboardingRoutes } from './onboardingRoutes';
import { useOnboardingState } from './useOnboardingState';

const TOTAL_STEPS = 7;
const CURRENT_STEP = 7;

// Placeholder illustration (replace with real asset as needed)
const CELEBRATE_ICON = require('../../assets/images/react-logo.png');

function ProgressDots({ total, current }: { total: number; current: number }) {
  const theme = useTheme();
  return (
    <View style={styles.dotsContainer}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={[styles.dot, i + 1 === current && { backgroundColor: theme.colors.accentPrimary }]}
        />
      ))}
    </View>
  );
}

export default function AllSetScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
  const { onboardingState, setOnboardingState, loading } = useOnboardingState();

  useEffect(() => {
    if (loading) return;
    if (onboardingState.onboardingComplete) {
      router.replace('/');
      return;
    }
    if (onboardingState.currentStep < 7) {
      router.replace(`/onboarding/${onboardingRoutes.notifications}`);
    }
  }, [loading, onboardingState]);

  const handleGoToPlan = () => {
    setOnboardingState({ onboardingComplete: true });
    router.replace('/');
  };

  if (loading) return null;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.backgroundPrimary }]}>
      <Typography variant='h2' align='center' style={styles.headline}>
        {t('onboarding.allSet.headline')}
      </Typography>
      <View style={styles.illustrationContainer}>
        <Image
          source={CELEBRATE_ICON}
          style={styles.illustration}
          resizeMode='contain'
          accessibilityLabel={t('onboarding.allSet.headline')}
          accessible
          accessibilityRole='image'
        />
      </View>
      <Typography variant='bodyLarge' color='secondary' align='center' style={styles.subtext}>
        {t('onboarding.allSet.subtext')}
      </Typography>
      <Button
        onPress={handleGoToPlan}
        variant='primary'
        size='large'
        accessibilityLabel={t('onboarding.allSet.cta')}
        style={{ marginBottom: 8 }}
      >
        {t('onboarding.allSet.cta')}
      </Button>
      <Button
        onPress={() => router.back()}
        variant='ghost'
        size='small'
        accessibilityLabel={t('common.back')}
        style={{ marginBottom: 24 }}
      >
        {t('common.back')}
      </Button>
      <ProgressDots total={TOTAL_STEPS} current={CURRENT_STEP} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  headline: {
    marginBottom: 24,
  },
  illustrationContainer: {
    marginBottom: 24,
    alignItems: 'center',
  },
  illustration: {
    width: 100,
    height: 100,
  },
  subtext: {
    marginBottom: 40,
    maxWidth: 320,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D1D1D6',
    marginHorizontal: 4,
  },
});
