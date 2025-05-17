import { router } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Typography } from '../../components/Typography';
import { useTheme } from '../../theme';

const TOTAL_STEPS = 7;
const CURRENT_STEP = 3;
const DAYS = [2, 3, 4, 5];

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

export default function ExperienceScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
  const [selectedDays, setSelectedDays] = useState<number | null>(null);

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
              onPress={() => setSelectedDays(day)}
              activeOpacity={0.85}
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
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: selectedDays ? theme.colors.accentPrimary : theme.colors.borderDefault,
          },
        ]}
        activeOpacity={selectedDays ? 0.85 : 1}
        disabled={!selectedDays}
        onPress={() => router.push('/onboarding/ai-adaptation')}
      >
        <Typography variant='button' align='center' color='primary' style={styles.buttonText}>
          {t('onboarding.experience.next')}
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
