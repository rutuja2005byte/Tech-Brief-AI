import { useAuth } from '@clerk/clerk-expo';
import { Redirect } from 'expo-router';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default function IndexScreen() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <View style={styles.root}>
        <ActivityIndicator color="#4F8CFF" />
      </View>
    );
  }

  return <Redirect href={isSignedIn ? '/onboarding' : '/sign-in'} />;
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    backgroundColor: '#0B0D12',
    flex: 1,
    justifyContent: 'center'
  }
});
