import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Typography } from '../../components/Typography';
import { useTheme } from '../../theme';

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
  const handleGoToPlan = () => {
    // Replace with your main dashboard/home route
    router.replace('/');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.backgroundPrimary }]}>
      <Typography variant='h2' align='center' style={styles.headline}>
        {t('onboarding.allSet.headline')}
      </Typography>
      <View style={styles.illustrationContainer}>
        <Image source={CELEBRATE_ICON} style={styles.illustration} resizeMode='contain' />
      </View>
      <Typography variant='bodyLarge' color='secondary' align='center' style={styles.subtext}>
        {t('onboarding.allSet.subtext')}
      </Typography>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.accentPrimary }]}
        activeOpacity={0.85}
        onPress={handleGoToPlan}
      >
        <Typography variant='button' align='center' color='primary' style={styles.buttonText}>
          {t('onboarding.allSet.cta')}
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
    width: 100,
    height: 100,
  },
  subtext: {
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
