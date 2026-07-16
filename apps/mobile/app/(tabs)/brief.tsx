import { FlashList } from '@shopify/flash-list';
import { StyleSheet, Text, View } from 'react-native';

import { ArticleRow } from '@/components/ui/article-row';
import { colors } from '@/components/ui/colors';
import { AppScreen } from '@/components/ui/screen';
import { useLatestBrief } from '@/features/briefs/use-latest-brief';

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
  muted: {
    color: colors.muted
  },
  error: {
    color: colors.danger
  }
});
