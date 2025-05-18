import '@/i18n';
import { Stack } from 'expo-router';
import { Platform } from 'react-native';
import 'react-native-reanimated';
import { onboardingRoutes } from './onboardingRoutes';

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        animation: Platform.OS === 'ios' ? 'slide_from_right' : 'fade',
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name={onboardingRoutes.welcome} />
      <Stack.Screen name={onboardingRoutes.goal} />
      <Stack.Screen name={onboardingRoutes.experience} />
      <Stack.Screen name={onboardingRoutes.aiAdaptation} />
      <Stack.Screen name={onboardingRoutes.basicInfo} />
      <Stack.Screen name={onboardingRoutes.notifications} />
      <Stack.Screen name={onboardingRoutes.allSet} />
    </Stack>
  );
}
