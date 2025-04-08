import '@/i18n';
import { Stack } from 'expo-router';
import 'react-native-reanimated';

export default function OnboardingLayout() {
  return (
    <Stack>
      <Stack.Screen name='first-screen' options={{ headerShown: false }} />
      <Stack.Screen name='second-screen' options={{ headerShown: false }} />
      <Stack.Screen name='third-screen' options={{ headerShown: false }} />
    </Stack>
  );
}
