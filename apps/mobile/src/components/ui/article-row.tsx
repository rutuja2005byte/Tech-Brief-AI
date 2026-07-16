import { Bookmark, Download, ExternalLink } from 'lucide-react-native';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';

import type { BriefArticle } from '@/features/briefs/types';
import { useLibraryStore } from '@/features/library/library-store';

import { colors } from './colors';

export function ArticleRow({ article }: { readonly article: BriefArticle }) {
  const toggleBookmark = useLibraryStore((state) => state.toggleBookmark);
  const saveOffline = useLibraryStore((state) => state.saveOffline);
  const isBookmarked = useLibraryStore((state) => state.isBookmarked(article.id));

  return (
    <View style={styles.article}>
      <Text style={styles.source}>{article.sourceName}</Text>
      <Text style={styles.articleTitle}>{article.title}</Text>
      <Text style={styles.articleSummary}>{article.summary}</Text>
      <View style={styles.actions}>
        <Pressable accessibilityRole="button" onPress={() => toggleBookmark(article)}>
          <Bookmark color={isBookmarked ? colors.signal : colors.subtle} size={19} />
        </Pressable>
        <Pressable accessibilityRole="button" onPress={() => saveOffline(article)}>
          <Download color={colors.subtle} size={19} />
        </Pressable>
        <Pressable accessibilityRole="link" onPress={() => void Linking.openURL(article.url)}>
          <ExternalLink color={colors.accent} size={19} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    gap: 18,
    marginTop: 14
  },
  article: {
    backgroundColor: colors.panel,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
    padding: 16
  },
  articleSummary: {
    color: colors.muted,
    lineHeight: 21,
    marginTop: 8
  },
  articleTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 23,
    marginTop: 8
  },
  source: {
    color: colors.signal,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase'
  }
});
