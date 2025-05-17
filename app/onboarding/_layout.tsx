import '@/i18n';
import { Stack } from 'expo-router';
import 'react-native-reanimated';

export default function OnboardingLayout() {
  return (
    <Stack>
      <Stack.Screen name='welcome' options={{ headerShown: false }} />
      <Stack.Screen name='goal' options={{ headerShown: false }} />
      <Stack.Screen name='experience' options={{ headerShown: false }} />
      <Stack.Screen name='ai-adaptation' options={{ headerShown: false }} />
      <Stack.Screen name='basic-info' options={{ headerShown: false }} />
      <Stack.Screen name='notifications' options={{ headerShown: false }} />
      <Stack.Screen name='all-set' options={{ headerShown: false }} />
    </Stack>
  );
}
