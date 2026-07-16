import { CalendarDays } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/components/ui/colors';
import type { LatestBrief } from './types';

export function BriefCard({ brief }: { readonly brief: LatestBrief }) {
  const publishedAt = new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date(brief.publishedAt));

  return (
    <View style={styles.card}>
      <View style={styles.metaRow}>
        <CalendarDays color={colors.signal} size={16} />
        <Text style={styles.metaText}>{publishedAt}</Text>
      </View>
      <Text style={styles.title}>{brief.title}</Text>
      <Text style={styles.summary}>{brief.summary}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.panel,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    padding: 18
  },
  metaRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8
  },
  metaText: {
    color: colors.subtle,
    fontSize: 13
  },
  title: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '700',
    lineHeight: 32,
    marginTop: 14
  },
  summary: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 14
  }
});
