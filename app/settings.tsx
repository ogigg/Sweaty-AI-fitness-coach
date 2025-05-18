import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Typography } from '../components/Typography';
import { useTheme } from '../theme';
import { Button } from './components/Button';

export default function SettingsScreen() {
  const theme = useTheme();

  const handleResetOnboarding = useCallback(async () => {
    try {
      // Clear onboarding state
      await AsyncStorage.removeItem('onboarding_state');
      // Navigate to welcome screen
      router.replace('/onboarding/welcome');
    } catch (error) {
      console.error('Failed to reset onboarding:', error);
    }
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.backgroundPrimary }]}>
      <Typography variant='h2' style={styles.title}>
        Settings
      </Typography>

      <View style={styles.section}>
        <Typography variant='h3' style={styles.sectionTitle}>
          App Settings
        </Typography>

        <Button
          onPress={handleResetOnboarding}
          variant='outline'
          size='large'
          accessibilityLabel='Reset onboarding'
        >
          Reset Onboarding
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    marginBottom: 32,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
});
