import { useOAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { appConfig } from '@tech-brief-ai/config';

type OAuthStrategy = 'oauth_google' | 'oauth_github';

export default function SignInScreen() {
  const router = useRouter();
  const googleOAuth = useOAuth({ strategy: 'oauth_google' });
  const githubOAuth = useOAuth({ strategy: 'oauth_github' });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function signIn(strategy: OAuthStrategy) {
    try {
      setErrorMessage(null);
      const oauth = strategy === 'oauth_google' ? googleOAuth : githubOAuth;
      const result = await oauth.startOAuthFlow();

      if (result.createdSessionId) {
        await result.setActive?.({ session: result.createdSessionId });
        router.replace('/onboarding');
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to sign in.');
    }
  }

  return (
    <View style={styles.root}>
      <Text style={styles.title}>{appConfig.name}</Text>
      <Text style={styles.subtitle}>Personalized AI briefings for builders.</Text>
      <View style={styles.actions}>
        <Pressable style={styles.primaryButton} onPress={() => void signIn('oauth_google')}>
          <Text style={styles.primaryButtonText}>Continue with Google</Text>
        </Pressable>
        <Pressable style={styles.secondaryButton} onPress={() => void signIn('oauth_github')}>
          <Text style={styles.secondaryButtonText}>Continue with GitHub</Text>
        </Pressable>
      </View>
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#0B0D12',
    flex: 1,
    justifyContent: 'center',
    padding: 24
  },
  title: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '700'
  },
  subtitle: {
    color: '#B9C2D0',
    fontSize: 17,
    lineHeight: 25,
    marginTop: 10
  },
  actions: {
    gap: 12,
    marginTop: 36
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 15
  },
  primaryButtonText: {
    color: '#0B0D12',
    fontSize: 16,
    fontWeight: '700'
  },
  secondaryButton: {
    alignItems: 'center',
    backgroundColor: '#151922',
    borderColor: '#2A3140',
    borderRadius: 8,
    borderWidth: 1,
    paddingVertical: 15
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700'
  },
  error: {
    color: '#FF7A7A',
    lineHeight: 20,
    marginTop: 20
  }
});
