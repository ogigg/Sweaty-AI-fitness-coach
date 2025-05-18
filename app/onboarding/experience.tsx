import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Typography } from '../../components/Typography';
import { useTheme } from '../../theme';
import { Button } from '../components/Button';
import { ProgressDots } from '../components/ProgressDots';
import { onboardingRoutes } from './onboardingRoutes';
import { useOnboardingNavigation } from './useOnboardingNavigation';
import { useOnboardingState } from './useOnboardingState';

const TOTAL_STEPS = 7;
const CURRENT_STEP = 3;
const DAYS = [2, 3, 4, 5];

export default function ExperienceScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
  const [selectedDays, setSelectedDays] = useState<number | null>(null);
  const { onboardingState, setOnboardingState } = useOnboardingState();
  const { loading } = useOnboardingNavigation({
    currentStep: CURRENT_STEP,
    nextRoute: 'aiAdaptation',
    prevRoute: 'goal',
  });

  useEffect(() => {
    if (onboardingState.frequency) {
      setSelectedDays(onboardingState.frequency);
    }
  }, [onboardingState]);

  const handleSelect = (days: number) => {
    setSelectedDays(days);
    setOnboardingState({ frequency: days });
  };

  const handleNext = () => {
    if (selectedDays) {
      setOnboardingState({ currentStep: 4, frequency: selectedDays });
      router.push(`/onboarding/${onboardingRoutes.aiAdaptation}`);
    }
  };

  if (loading) return null;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.backgroundPrimary }]}>
      <Typography variant='h2' align='center' style={styles.headline}>
        {t('onboarding.experience.headline')}
      </Typography>
      <View style={styles.section}>
        <Typography variant='bodyLarge' align='center' style={styles.sectionTitle}>
          {t('onboarding.experience.experienceQuestion')}
        </Typography>
        <View
          style={[
            styles.lockedOption,
            { borderColor: theme.colors.accentPrimary, backgroundColor: theme.colors.surface },
          ]}
        >
          <Typography
            variant='bodyLarge'
            align='center'
            style={{ color: theme.colors.accentPrimary }}
          >
            {t('onboarding.experience.beginnerOption')}
          </Typography>
        </View>
      </View>
      <View style={styles.section}>
        <Typography variant='bodyLarge' align='center' style={styles.sectionTitle}>
          {t('onboarding.experience.frequencyQuestion')}
        </Typography>
        <View style={styles.daysRow}>
          {DAYS.map((day) => (
            <TouchableOpacity
              key={day}
              style={[
                styles.dayButton,
                selectedDays === day && { backgroundColor: theme.colors.accentPrimary },
              ]}
              onPress={() => handleSelect(day)}
              activeOpacity={0.85}
              accessibilityLabel={t('onboarding.experience.frequencyQuestion') + ' ' + day}
              accessibilityRole='button'
              accessible
              accessibilityState={{ selected: selectedDays === day }}
            >
              <Typography
                variant='h3'
                align='center'
                style={{ color: selectedDays === day ? '#fff' : theme.colors.textPrimary }}
              >
                {day}
              </Typography>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <Button
        onPress={handleNext}
        variant='primary'
        size='large'
        disabled={!selectedDays}
        accessibilityLabel={t('onboarding.experience.next')}
        accessibilityState={{ disabled: !selectedDays }}
      >
        {t('onboarding.experience.next')}
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
  section: {
    width: '100%',
    marginBottom: 24,
    alignItems: 'center',
  },
  sectionTitle: {
    marginBottom: 12,
  },
  lockedOption: {
    borderWidth: 2,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    borderColor: '#3B9BFF',
    backgroundColor: '#fff',
    opacity: 1,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  dayButton: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D1D6',
    backgroundColor: 'transparent',
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginHorizontal: 4,
    alignItems: 'center',
    minWidth: 56,
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
