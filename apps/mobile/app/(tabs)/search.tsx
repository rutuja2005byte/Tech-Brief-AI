import { FlashList } from '@shopify/flash-list';
import { Search } from 'lucide-react-native';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { ArticleRow } from '@/components/ui/article-row';
import { colors } from '@/components/ui/colors';
import { AppScreen } from '@/components/ui/screen';
import { useNewsSearch } from '@/features/search/use-news-search';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const searchQuery = useNewsSearch(query);
  const results = searchQuery.data ?? [];

  return (
    <AppScreen>
      <View style={styles.root}>
        <Text style={styles.heading}>Search</Text>
        <View style={styles.searchBox}>
          <Search color={colors.subtle} size={18} />
          <TextInput
            autoCapitalize="none"
            placeholder="Search brief articles"
            placeholderTextColor={colors.subtle}
            style={styles.input}
            value={query}
            onChangeText={setQuery}
          />
        </View>
        {query.trim() && results.length === 0 ? (
          <Text style={styles.muted}>No local articles match this search.</Text>
        ) : null}
        <FlashList
          data={results}
          estimatedItemSize={128}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => <ArticleRow article={item} />}
        />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: colors.text,
    fontSize: 34,
    fontWeight: '800',
    marginBottom: 18
  },
  input: {
    color: colors.text,
    flex: 1,
    fontSize: 16,
    paddingVertical: 0
  },
  muted: {
    color: colors.muted,
    marginBottom: 12
  },
  root: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 64
  },
  searchBox: {
    alignItems: 'center',
    backgroundColor: colors.panel,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 10,
    marginBottom: 18,
    padding: 14
  }
});
