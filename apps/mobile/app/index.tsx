import { Redirect } from 'expo-router';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { useAppAuth } from '@/providers/auth-provider';

export default function IndexScreen() {
  const { isLoaded, isSignedIn } = useAppAuth();

  if (!isLoaded) {
    return (
      <View style={styles.root}>
        <ActivityIndicator color="#4F8CFF" />
      </View>
    );
  }

  return <Redirect href={isSignedIn ? '/(tabs)' : '/sign-in'} />;
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    backgroundColor: '#0B0D12',
    flex: 1,
    justifyContent: 'center'
  }
});
