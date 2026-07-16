import { FlashList } from '@shopify/flash-list';
import { ExternalLink } from 'lucide-react-native';
import { Linking, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/components/ui/colors';
import { AppScreen } from '@/components/ui/screen';
import { useLatestBrief } from '@/features/briefs/use-latest-brief';
import type { BriefArticle } from '@/features/briefs/types';

export default function BriefScreen() {
  const { data, isLoading, error } = useLatestBrief();
  const brief = data?.brief ?? null;

  return (
    <AppScreen>
      <View style={styles.root}>
        <Text style={styles.heading}>Brief</Text>
        {isLoading ? <Text style={styles.muted}>Loading articles...</Text> : null}
        {error ? <Text style={styles.error}>{error.message}</Text> : null}
        {brief ? (
          <FlashList
            data={brief.articles}
            estimatedItemSize={124}
            ListHeaderComponent={
              <View style={styles.header}>
                <Text style={styles.title}>{brief.title}</Text>
                {brief.keyTakeaways.map((takeaway) => (
                  <Text key={takeaway} style={styles.takeaway}>
                    {takeaway}
                  </Text>
                ))}
              </View>
            }
            renderItem={({ item }) => <ArticleRow article={item} />}
          />
        ) : null}
      </View>
    </AppScreen>
  );
}

function ArticleRow({ article }: { readonly article: BriefArticle }) {
  return (
    <View style={styles.article}>
      <Text style={styles.source}>{article.sourceName}</Text>
      <Text style={styles.articleTitle}>{article.title}</Text>
      <Text style={styles.articleSummary}>{article.summary}</Text>
      <Text style={styles.link} onPress={() => void Linking.openURL(article.url)}>
        Open source <ExternalLink color={colors.accent} size={13} />
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 64
  },
  heading: {
    color: colors.text,
    fontSize: 34,
    fontWeight: '800',
    marginBottom: 18
  },
  header: {
    gap: 12,
    paddingBottom: 16
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 30
  },
  takeaway: {
    backgroundColor: colors.panel,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    color: colors.mist,
    lineHeight: 22,
    padding: 14
  },
  article: {
    backgroundColor: colors.panel,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
    padding: 16
  },
  source: {
    color: colors.signal,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase'
  },
  articleTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 23,
    marginTop: 8
  },
  articleSummary: {
    color: colors.muted,
    lineHeight: 21,
    marginTop: 8
  },
  link: {
    color: colors.accent,
    fontWeight: '700',
    marginTop: 12
  },
  muted: {
    color: colors.muted
  },
  error: {
    color: colors.danger
  }
});
