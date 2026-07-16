import { Text, View } from 'react-native';

import { appConfig } from '@tech-brief-ai/config';

export default function IndexScreen() {
  return (
    <View className="flex-1 justify-center bg-ink px-6">
      <Text className="text-4xl font-semibold text-white">{appConfig.name}</Text>
      <Text className="mt-3 text-base leading-6 text-mist">
        Mobile shell is ready for Phase 5 UI work after backend foundations land.
      </Text>
    </View>
  );
}
