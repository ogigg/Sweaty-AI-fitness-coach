import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Typography } from '../../components/Typography';
import { useTheme } from '../../theme';
import { Button } from '../components/Button';
import { ProgressDots } from '../components/ProgressDots';
import { onboardingRoutes } from './onboardingRoutes';
import { useOnboardingNavigation } from './useOnboardingNavigation';
import { useOnboardingState } from './useOnboardingState';

const TOTAL_STEPS = 7;
const CURRENT_STEP = 2;

// Placeholder icons (replace with real assets as needed)
const icons = {
  muscle: require('../../assets/images/react-logo.png'),
  weight: require('../../assets/images/react-logo.png'),
  fitness: require('../../assets/images/react-logo.png'),
};

const GOALS = [
  {
    key: 'buildMuscle',
    label: 'Build Muscle',
    description: 'Gain strength and muscle mass',
    icon: icons.muscle,
  },
  {
    key: 'loseWeight',
    label: 'Lose Weight',
    description: 'Burn fat and slim down',
    icon: icons.weight,
  },
  {
    key: 'generalFitness',
    label: 'General Fitness',
    description: 'Improve overall health and energy',
    icon: icons.fitness,
  },
];

export default function GoalScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
  const [selected, setSelected] = useState<string | null>(null);
  const { onboardingState, setOnboardingState } = useOnboardingState();
  const { loading } = useOnboardingNavigation({
    currentStep: CURRENT_STEP,
    nextRoute: 'experience',
    prevRoute: 'welcome',
  });

  useEffect(() => {
    if (onboardingState.selectedGoal) {
      setSelected(onboardingState.selectedGoal);
    }
  }, [onboardingState]);

  const handleSelect = (goalKey: string) => {
    setSelected(goalKey);
    setOnboardingState({ selectedGoal: goalKey });
  };

  const handleNext = () => {
    if (selected) {
      setOnboardingState({ currentStep: 3, selectedGoal: selected });
      router.push(`/onboarding/${onboardingRoutes.experience}`);
    }
  };

  if (loading) return null;

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.colors.backgroundPrimary },
      ]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps='handled'
    >
      <Typography variant='h2' align='center' style={styles.headline}>
        {t('onboarding.goal.headline')}
      </Typography>
      <View style={styles.cardsContainer}>
        {GOALS.map((goal) => (
          <TouchableOpacity
            key={goal.key}
            style={[
              styles.card,
              selected === goal.key && {
                borderColor: theme.colors.accentPrimary,
                backgroundColor: theme.colors.surface,
              },
            ]}
            activeOpacity={0.85}
            onPress={() => handleSelect(goal.key)}
            accessibilityLabel={t(`onboarding.goal.goals.${goal.key}.label`)}
            accessibilityRole='button'
            accessible
            accessibilityState={{ selected: selected === goal.key }}
          >
            <Image
              source={goal.icon}
              style={styles.icon}
              accessibilityLabel={t(`onboarding.goal.goals.${goal.key}.label`)}
              accessible
              accessibilityRole='image'
            />
            <Typography variant='h3' align='center' style={styles.cardLabel}>
              {t(`onboarding.goal.goals.${goal.key}.label`)}
            </Typography>
            <Typography variant='bodyMedium' color='secondary' align='center'>
              {t(`onboarding.goal.goals.${goal.key}.description`)}
            </Typography>
          </TouchableOpacity>
        ))}
      </View>
      <Button
        onPress={handleNext}
        variant='primary'
        size='large'
        disabled={!selected}
        accessibilityLabel={t('onboarding.goal.next')}
        accessibilityState={{ disabled: !selected }}
      >
        {t('onboarding.goal.next')}
      </Button>
      <ProgressDots total={TOTAL_STEPS} current={CURRENT_STEP} />
    </ScrollView>
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
    marginBottom: 32,
  },
  cardsContainer: {
    width: '100%',
    marginBottom: 40,
    gap: 16,
  },
  card: {
    borderWidth: 2,
    borderColor: '#D1D1D6',
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 12,
  },
  cardLabel: {
    marginBottom: 4,
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
