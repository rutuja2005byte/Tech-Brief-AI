import { FlashList } from '@shopify/flash-list';
import { Download, FolderOpen } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { ArticleRow } from '@/components/ui/article-row';
import { colors } from '@/components/ui/colors';
import { AppScreen } from '@/components/ui/screen';
import { useLibraryStore } from '@/features/library/library-store';
import { useState } from 'react';

export default function LibraryScreen() {
  const [collectionName, setCollectionName] = useState('');
  const bookmarks = useLibraryStore((state) => state.bookmarks);
  const offlineArticles = useLibraryStore((state) => state.offlineArticles);
  const collections = useLibraryStore((state) => state.collections);
  const createCollection = useLibraryStore((state) => state.createCollection);

  function submitCollection() {
    createCollection(collectionName);
    setCollectionName('');
  }

  return (
    <AppScreen>
      <View style={styles.root}>
        <Text style={styles.heading}>Library</Text>
        <View style={styles.reportCard}>
          <Download color={colors.accent} size={22} />
          <View style={styles.reportCopy}>
            <Text style={styles.title}>Reports</Text>
            <Text style={styles.body}>Weekly and monthly markdown downloads are exposed by the API.</Text>
          </View>
        </View>
        <View style={styles.collectionCreator}>
          <FolderOpen color={colors.signal} size={19} />
          <TextInput
            placeholder="New collection"
            placeholderTextColor={colors.subtle}
            style={styles.collectionInput}
            value={collectionName}
            onChangeText={setCollectionName}
            onSubmitEditing={submitCollection}
          />
          <Pressable accessibilityRole="button" style={styles.smallButton} onPress={submitCollection}>
            <Text style={styles.smallButtonText}>Add</Text>
          </Pressable>
        </View>
        <Text style={styles.sectionTitle}>Collections</Text>
        <View style={styles.collectionList}>
          {collections.map((collection) => (
            <Text key={collection.id} style={styles.collectionChip}>
              {collection.name} · {collection.articleIds.length}
            </Text>
          ))}
        </View>
        <Text style={styles.sectionTitle}>Bookmarks</Text>
        {bookmarks.length === 0 ? <Text style={styles.empty}>Bookmark articles from Brief or Search.</Text> : null}
        <FlashList
          data={bookmarks}
          estimatedItemSize={128}
          ListFooterComponent={
            <View>
              <Text style={styles.sectionTitle}>Offline</Text>
              {offlineArticles.length === 0 ? (
                <Text style={styles.empty}>Saved offline articles will appear here.</Text>
              ) : null}
              {offlineArticles.map((article) => (
                <ArticleRow key={article.id} article={article} />
              ))}
            </View>
          }
          renderItem={({ item }) => <ArticleRow article={item} />}
        />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  body: {
    color: colors.muted,
    lineHeight: 21,
    marginTop: 4
  },
  collectionChip: {
    backgroundColor: colors.panelAlt,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    color: colors.text,
    marginBottom: 8,
    marginRight: 8,
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  collectionCreator: {
    alignItems: 'center',
    backgroundColor: colors.panel,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 10,
    padding: 12
  },
  collectionInput: {
    color: colors.text,
    flex: 1,
    fontSize: 15,
    paddingVertical: 0
  },
  collectionList: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  empty: {
    color: colors.subtle,
    marginBottom: 12
  },
  heading: {
    color: colors.text,
    fontSize: 34,
    fontWeight: '800',
    marginBottom: 16
  },
  reportCard: {
    alignItems: 'center',
    backgroundColor: colors.panel,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 14,
    marginBottom: 12,
    padding: 16
  },
  reportCopy: {
    flex: 1
  },
  root: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 64
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    marginTop: 18
  },
  smallButton: {
    backgroundColor: colors.accent,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  smallButtonText: {
    color: colors.text,
    fontWeight: '700'
  },
  title: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '700'
  }
});
