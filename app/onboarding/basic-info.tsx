import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Typography } from '../../components/Typography';
import { useTheme } from '../../theme';
import { Button } from '../components/Button';
import { onboardingRoutes } from './onboardingRoutes';
import { useOnboardingNavigation } from './useOnboardingNavigation';
import { useOnboardingState } from './useOnboardingState';

const TOTAL_STEPS = 7;
const CURRENT_STEP = 5;

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

export default function BasicInfoScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [height, setHeight] = useState('');
  const [heightUnit, setHeightUnit] = useState<'cm' | 'ft'>('cm');
  const { onboardingState, setOnboardingState } = useOnboardingState();
  const { loading } = useOnboardingNavigation({
    currentStep: CURRENT_STEP,
    nextRoute: 'notifications',
    prevRoute: 'aiAdaptation',
  });

  useEffect(() => {
    if (onboardingState.age) setAge(onboardingState.age);
    if (onboardingState.weight) setWeight(onboardingState.weight);
    if (onboardingState.height) setHeight(onboardingState.height);
  }, [onboardingState]);

  const anyFilled = age || weight || height;

  const handleSave = () => {
    setOnboardingState({
      currentStep: 6,
      age,
      weight,
      height,
    });
    router.push(`/onboarding/${onboardingRoutes.notifications}`);
  };

  const handleSkip = () => {
    setOnboardingState({ currentStep: 6 });
    router.push(`/onboarding/${onboardingRoutes.notifications}`);
  };

  if (loading) return null;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.backgroundPrimary }]}>
      <Typography variant='h2' align='center' style={styles.headline}>
        {t('onboarding.basicInfo.headline')}
      </Typography>
      <Typography variant='bodyLarge' color='secondary' align='center' style={styles.subtext}>
        {t('onboarding.basicInfo.subtext')}
      </Typography>
      <View style={styles.form}>
        <View style={styles.inputRow}>
          <Typography variant='bodyLarge' style={styles.inputLabel}>
            {t('onboarding.basicInfo.age')}
          </Typography>
          <TextInput
            style={[
              styles.input,
              { color: theme.colors.textPrimary, borderColor: theme.colors.borderDefault },
            ]}
            placeholder='e.g. 25'
            placeholderTextColor={theme.colors.textTertiary}
            keyboardType='numeric'
            value={age}
            onChangeText={setAge}
            maxLength={3}
            accessibilityLabel={t('onboarding.basicInfo.age')}
            accessible
          />
        </View>
        <View style={styles.inputRow}>
          <Typography variant='bodyLarge' style={styles.inputLabel}>
            {t('onboarding.basicInfo.weight')}
          </Typography>
          <View style={styles.inputWithUnit}>
            <TextInput
              style={[
                styles.input,
                {
                  color: theme.colors.textPrimary,
                  borderColor: theme.colors.borderDefault,
                  flex: 1,
                },
              ]}
              placeholder='e.g. 70'
              placeholderTextColor={theme.colors.textTertiary}
              keyboardType='numeric'
              value={weight}
              onChangeText={setWeight}
              maxLength={3}
              accessibilityLabel={t('onboarding.basicInfo.weight')}
              accessible
            />
            <TouchableOpacity
              style={[
                styles.unitButton,
                weightUnit === 'kg' && { backgroundColor: theme.colors.accentPrimary },
              ]}
              onPress={() => setWeightUnit('kg')}
              accessibilityLabel={t('common.units.kg')}
              accessibilityRole='button'
              accessible
              accessibilityState={{ selected: weightUnit === 'kg' }}
            >
              <Typography
                variant='caption'
                style={{ color: weightUnit === 'kg' ? '#fff' : theme.colors.textPrimary }}
              >
                {t('common.units.kg')}
              </Typography>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.unitButton,
                weightUnit === 'lbs' && { backgroundColor: theme.colors.accentPrimary },
              ]}
              onPress={() => setWeightUnit('lbs')}
              accessibilityLabel={t('common.units.lbs')}
              accessibilityRole='button'
              accessible
              accessibilityState={{ selected: weightUnit === 'lbs' }}
            >
              <Typography
                variant='caption'
                style={{ color: weightUnit === 'lbs' ? '#fff' : theme.colors.textPrimary }}
              >
                {t('common.units.lbs')}
              </Typography>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputRow}>
          <Typography variant='bodyLarge' style={styles.inputLabel}>
            {t('onboarding.basicInfo.height')}
          </Typography>
          <View style={styles.inputWithUnit}>
            <TextInput
              style={[
                styles.input,
                {
                  color: theme.colors.textPrimary,
                  borderColor: theme.colors.borderDefault,
                  flex: 1,
                },
              ]}
              placeholder='e.g. 175'
              placeholderTextColor={theme.colors.textTertiary}
              keyboardType='numeric'
              value={height}
              onChangeText={setHeight}
              maxLength={3}
              accessibilityLabel={t('onboarding.basicInfo.height')}
              accessible
            />
            <TouchableOpacity
              style={[
                styles.unitButton,
                heightUnit === 'cm' && { backgroundColor: theme.colors.accentPrimary },
              ]}
              onPress={() => setHeightUnit('cm')}
              accessibilityLabel={t('common.units.cm')}
              accessibilityRole='button'
              accessible
              accessibilityState={{ selected: heightUnit === 'cm' }}
            >
              <Typography
                variant='caption'
                style={{ color: heightUnit === 'cm' ? '#fff' : theme.colors.textPrimary }}
              >
                {t('common.units.cm')}
              </Typography>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.unitButton,
                heightUnit === 'ft' && { backgroundColor: theme.colors.accentPrimary },
              ]}
              onPress={() => setHeightUnit('ft')}
              accessibilityLabel={t('common.units.ft')}
              accessibilityRole='button'
              accessible
              accessibilityState={{ selected: heightUnit === 'ft' }}
            >
              <Typography
                variant='caption'
                style={{ color: heightUnit === 'ft' ? '#fff' : theme.colors.textPrimary }}
              >
                {t('common.units.ft')}
              </Typography>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.buttonRow}>
        <Button
          onPress={handleSkip}
          variant='outline'
          size='large'
          accessibilityLabel={t('onboarding.basicInfo.skip')}
        >
          {t('onboarding.basicInfo.skip')}
        </Button>
        <Button
          onPress={handleSave}
          variant='primary'
          size='large'
          disabled={!anyFilled}
          accessibilityLabel={t('onboarding.basicInfo.save')}
          accessibilityState={{ disabled: !anyFilled }}
        >
          {t('onboarding.basicInfo.save')}
        </Button>
      </View>
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
    marginBottom: 12,
  },
  subtext: {
    marginBottom: 24,
    maxWidth: 320,
  },
  form: {
    width: '100%',
    marginBottom: 32,
    gap: 16,
  },
  inputRow: {
    marginBottom: 12,
  },
  inputLabel: {
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 0,
  },
  inputWithUnit: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  unitButton: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#D1D1D6',
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginLeft: 6,
    backgroundColor: 'transparent',
  },
  buttonRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 48,
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
