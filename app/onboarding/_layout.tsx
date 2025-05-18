import '@/i18n';
import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { onboardingRoutes } from './onboardingRoutes';

export default function OnboardingLayout() {
  return (
    <Stack>
      <Stack.Screen name={onboardingRoutes.welcome} options={{ headerShown: false }} />
      <Stack.Screen name={onboardingRoutes.goal} options={{ headerShown: false }} />
      <Stack.Screen name={onboardingRoutes.experience} options={{ headerShown: false }} />
      <Stack.Screen name={onboardingRoutes.aiAdaptation} options={{ headerShown: false }} />
      <Stack.Screen name={onboardingRoutes.basicInfo} options={{ headerShown: false }} />
      <Stack.Screen name={onboardingRoutes.notifications} options={{ headerShown: false }} />
      <Stack.Screen name={onboardingRoutes.allSet} options={{ headerShown: false }} />
    </Stack>
  );
}
