import { useAuth } from '@clerk/clerk-expo';
import { LogOut } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/components/ui/colors';
import { AppScreen } from '@/components/ui/screen';
import { appConfig } from '@tech-brief-ai/config';

export default function SettingsScreen() {
  const { signOut } = useAuth();

  return (
    <AppScreen>
      <View style={styles.root}>
        <Text style={styles.heading}>Settings</Text>
        <View style={styles.card}>
          <Text style={styles.title}>{appConfig.name}</Text>
          <Text style={styles.body}>Profile, preferences, analytics, and notifications continue in Phase 6.</Text>
        </View>
        <Pressable style={styles.signOut} onPress={() => void signOut()}>
          <LogOut color={colors.text} size={18} />
          <Text style={styles.signOutText}>Sign out</Text>
        </Pressable>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  root: {
    gap: 16,
    padding: 20,
    paddingTop: 64
  },
  heading: {
    color: colors.text,
    fontSize: 34,
    fontWeight: '800'
  },
  card: {
    backgroundColor: colors.panel,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    padding: 18
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700'
  },
  body: {
    color: colors.muted,
    lineHeight: 22,
    marginTop: 8
  },
  signOut: {
    alignItems: 'center',
    backgroundColor: colors.panelAlt,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    paddingVertical: 15
  },
  signOutText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700'
  }
});
