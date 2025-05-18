import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Typography } from '../../components/Typography';
import { useTheme } from '../../theme';
import { Button } from '../components/Button';
import { onboardingRoutes } from './onboardingRoutes';
import { useOnboardingState } from './useOnboardingState';

const LOGO = require('../../assets/images/react-logo.png'); // Placeholder logo

const TOTAL_STEPS = 7;
const CURRENT_STEP = 1;

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

export default function WelcomeScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
  const { setOnboardingState } = useOnboardingState();
  const handleSkip = () => {
    setOnboardingState({ onboardingComplete: true });
    router.replace('/');
  };
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.backgroundPrimary }]}>
      <View style={styles.logoContainer}>
        <Image
          source={LOGO}
          style={styles.logo}
          resizeMode='contain'
          accessibilityLabel={t('onboarding.welcome.headline')}
          accessible
          accessibilityRole='image'
        />
      </View>
      <Typography variant='h1' align='center' style={styles.headline}>
        {t('onboarding.welcome.headline')}
      </Typography>
      <Typography variant='bodyLarge' color='secondary' align='center' style={styles.valueProp}>
        {t('onboarding.welcome.description')}
      </Typography>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.accentPrimary }]}
        activeOpacity={0.85}
        onPress={() => router.push(`/onboarding/${onboardingRoutes.goal}`)}
        accessibilityLabel={t('onboarding.welcome.getStarted')}
        accessibilityRole='button'
        accessible
      >
        <Typography variant='button' align='center' color='primary' style={styles.buttonText}>
          {t('onboarding.welcome.getStarted')}
        </Typography>
      </TouchableOpacity>
      <Button
        onPress={handleSkip}
        variant='ghost'
        size='large'
        accessibilityLabel={t('onboarding.welcome.skip')}
        style={{ marginBottom: 32 }}
      >
        {t('onboarding.welcome.skip')}
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
    paddingHorizontal: 32,
  },
  logoContainer: {
    marginBottom: 32,
    alignItems: 'center',
  },
  logo: {
    width: 72,
    height: 72,
  },
  headline: {
    marginBottom: 16,
  },
  valueProp: {
    marginBottom: 40,
    maxWidth: 320,
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
