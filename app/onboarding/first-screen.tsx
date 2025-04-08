import { router } from 'expo-router';
import { Button, Text, View } from 'react-native';

export default function FirstScreen() {
  return (
    <View>
      <Text>First Screen</Text>
      <Button title='Next' onPress={() => router.push('/onboarding/second-screen')} />
    </View>
  );
}
