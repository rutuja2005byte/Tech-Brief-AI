import { create } from 'zustand';

import type { BriefArticle } from '@/features/briefs/types';

interface Collection {
  readonly id: string;
  readonly name: string;
  readonly articleIds: readonly string[];
}

interface LibraryState {
  readonly bookmarks: readonly BriefArticle[];
  readonly offlineArticles: readonly BriefArticle[];
  readonly collections: readonly Collection[];
  readonly toggleBookmark: (article: BriefArticle) => void;
  readonly saveOffline: (article: BriefArticle) => void;
  readonly createCollection: (name: string) => void;
  readonly addToCollection: (collectionId: string, article: BriefArticle) => void;
  readonly isBookmarked: (articleId: string) => boolean;
}

export const useLibraryStore = create<LibraryState>((set, get) => ({
  bookmarks: [],
  collections: [
    {
      id: 'default-ai',
      name: 'AI watchlist',
      articleIds: []
    }
  ],
  offlineArticles: [],
  toggleBookmark(article) {
    const exists = get().bookmarks.some((bookmark) => bookmark.id === article.id);

    set((state) => ({
      bookmarks: exists
        ? state.bookmarks.filter((bookmark) => bookmark.id !== article.id)
        : [article, ...state.bookmarks]
    }));
  },
  saveOffline(article) {
    const exists = get().offlineArticles.some((offlineArticle) => offlineArticle.id === article.id);

    if (!exists) {
      set((state) => ({ offlineArticles: [article, ...state.offlineArticles] }));
    }
  },
  createCollection(name) {
    const trimmedName = name.trim();

    if (!trimmedName) {
      return;
    }

    set((state) => ({
      collections: [
        {
          id: `${Date.now()}`,
          name: trimmedName,
          articleIds: []
        },
        ...state.collections
      ]
    }));
  },
  addToCollection(collectionId, article) {
    set((state) => ({
      bookmarks: state.bookmarks.some((bookmark) => bookmark.id === article.id)
        ? state.bookmarks
        : [article, ...state.bookmarks],
      collections: state.collections.map((collection) =>
        collection.id === collectionId && !collection.articleIds.includes(article.id)
          ? { ...collection, articleIds: [article.id, ...collection.articleIds] }
          : collection,
      )
    }));
  },
  isBookmarked(articleId) {
    return get().bookmarks.some((bookmark) => bookmark.id === articleId);
  }
}));
