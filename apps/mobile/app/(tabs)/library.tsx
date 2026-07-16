import { Download, FolderOpen } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/components/ui/colors';
import { AppScreen } from '@/components/ui/screen';

export default function LibraryScreen() {
  return (
    <AppScreen>
      <View style={styles.root}>
        <Text style={styles.heading}>Library</Text>
        <View style={styles.card}>
          <FolderOpen color={colors.signal} size={24} />
          <Text style={styles.title}>Bookmarks and collections</Text>
          <Text style={styles.body}>
            Saved articles, collections, and offline downloads land here in Phase 6.
          </Text>
        </View>
        <View style={styles.card}>
          <Download color={colors.accent} size={24} />
          <Text style={styles.title}>Reports</Text>
          <Text style={styles.body}>Weekly and monthly report downloads will use this surface.</Text>
        </View>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  root: {
    gap: 14,
    padding: 20,
    paddingTop: 64
  },
  heading: {
    color: colors.text,
    fontSize: 34,
    fontWeight: '800',
    marginBottom: 4
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
    fontWeight: '700',
    marginTop: 12
  },
  body: {
    color: colors.muted,
    lineHeight: 22,
    marginTop: 8
  }
});
