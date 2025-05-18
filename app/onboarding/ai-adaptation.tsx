import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Typography } from '../../components/Typography';
import { useTheme } from '../../theme';
import { onboardingRoutes } from './onboardingRoutes';
import { useOnboardingNavigation } from './useOnboardingNavigation';
import { useOnboardingState } from './useOnboardingState';

const TOTAL_STEPS = 7;
const CURRENT_STEP = 4;

// Placeholder illustration (replace with real asset as needed)
const CYCLE_ICON = require('../../assets/images/react-logo.png');

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

export default function AiAdaptationScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
  const bullets = t('onboarding.aiAdaptation.bullets', {
    returnObjects: true,
    appName: 'Sweaty',
  }) as string[];
  const { onboardingState, setOnboardingState } = useOnboardingState();
  const { loading } = useOnboardingNavigation({
    currentStep: CURRENT_STEP,
    nextRoute: 'basicInfo',
    prevRoute: 'experience',
  });

  const handleNext = () => {
    setOnboardingState({ currentStep: 5 });
    router.push(`/onboarding/${onboardingRoutes.basicInfo}`);
  };

  if (loading) return null;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.backgroundPrimary }]}>
      <Typography variant='h2' align='center' style={styles.headline}>
        {t('onboarding.aiAdaptation.headline', { appName: 'Sweaty' })}
      </Typography>
      <View style={styles.illustrationContainer}>
        <Image
          source={CYCLE_ICON}
          style={styles.illustration}
          resizeMode='contain'
          accessibilityLabel={t('onboarding.aiAdaptation.headline', { appName: 'Sweaty' })}
          accessible
          accessibilityRole='image'
        />
      </View>
      <View style={styles.bulletsContainer}>
        {bullets.map((text, idx) => (
          <View key={idx} style={styles.bulletRow}>
            <View style={[styles.bulletDot, { backgroundColor: theme.colors.accentPrimary }]} />
            <Typography variant='bodyLarge' style={styles.bulletText}>
              {text}
            </Typography>
          </View>
        ))}
      </View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.accentPrimary }]}
        activeOpacity={0.85}
        onPress={handleNext}
        accessibilityLabel={t('onboarding.aiAdaptation.gotIt')}
        accessibilityRole='button'
        accessible
      >
        <Typography variant='button' align='center' color='primary' style={styles.buttonText}>
          {t('onboarding.aiAdaptation.gotIt')}
        </Typography>
      </TouchableOpacity>
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
    width: 120,
    height: 120,
  },
  bulletsContainer: {
    width: '100%',
    marginBottom: 40,
    gap: 12,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bulletDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 12,
  },
  bulletText: {
    flex: 1,
  },
  button: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 48,
  },
  buttonText: {
    color: '#fff',
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
