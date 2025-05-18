import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, View } from 'react-native';
import { Typography } from '../../components/Typography';
import { useTheme } from '../../theme';
import { Button } from '../components/Button';
import { onboardingRoutes } from './onboardingRoutes';
import { useOnboardingNavigation } from './useOnboardingNavigation';
import { useOnboardingState } from './useOnboardingState';
// import * as Notifications from 'expo-notifications'; // Uncomment if using Expo Notifications

const TOTAL_STEPS = 7;
const CURRENT_STEP = 6;

// Placeholder illustration (replace with real asset as needed)
const BELL_ICON = require('../../assets/images/react-logo.png');

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

export default function NotificationsScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { onboardingState, setOnboardingState } = useOnboardingState();
  const { loading: navigationLoading } = useOnboardingNavigation({
    currentStep: CURRENT_STEP,
    nextRoute: 'allSet',
    prevRoute: 'basicInfo',
  });

  useEffect(() => {
    if (navigationLoading) return;
    if (onboardingState.onboardingComplete) {
      router.replace('/');
      return;
    }
    if (onboardingState.currentStep < 6) {
      router.replace(`/onboarding/${onboardingRoutes.basicInfo}`);
    } else if (onboardingState.currentStep > 6) {
      router.replace(`/onboarding/${onboardingRoutes.allSet}`);
    }
  }, [navigationLoading, onboardingState]);

  // Placeholder for notification permission logic
  const handleEnableNotifications = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOnboardingState({ currentStep: 7 });
      router.push(`/onboarding/${onboardingRoutes.allSet}`);
    }, 800);
  };

  const handleMaybeLater = () => {
    setOnboardingState({ currentStep: 7 });
    router.push(`/onboarding/${onboardingRoutes.allSet}`);
  };

  if (navigationLoading) return null;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.backgroundPrimary }]}>
      <Typography variant='h2' align='center' style={styles.headline}>
        {t('onboarding.notifications.headline')}
      </Typography>
      <View style={styles.illustrationContainer}>
        <Image
          source={BELL_ICON}
          style={styles.illustration}
          resizeMode='contain'
          accessibilityLabel={t('onboarding.notifications.headline')}
          accessible
          accessibilityRole='image'
        />
      </View>
      <Typography variant='bodyLarge' color='secondary' align='center' style={styles.subtext}>
        {t('onboarding.notifications.subtext')}
      </Typography>
      <Button
        onPress={handleEnableNotifications}
        variant='primary'
        size='large'
        disabled={loading}
        accessibilityLabel={t('onboarding.notifications.enable')}
        accessibilityState={{ disabled: loading }}
      >
        {t('onboarding.notifications.enable')}
      </Button>
      <Button
        onPress={handleMaybeLater}
        variant='ghost'
        size='large'
        disabled={loading}
        accessibilityLabel={t('onboarding.notifications.maybeLater')}
        accessibilityState={{ disabled: loading }}
        style={{ marginBottom: 48 }}
      >
        {t('onboarding.notifications.maybeLater')}
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
    width: 80,
    height: 80,
  },
  subtext: {
    marginBottom: 32,
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
