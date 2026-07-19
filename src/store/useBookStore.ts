import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Book } from '../types';

export type ReadingStatus = 'okunacak' | 'okunuyor' | 'okundu';

export interface ReadingListItem extends Book {
  status: ReadingStatus;
  rating?: number;
  note?: string;
  currentPage?: number; // YENİ: Yüzde yerine tam sayfa sayısını tutuyoruz
}

interface BookStore {
  favorites: Book[];
  readingList: ReadingListItem[];
  recentBooks: Book[];
  
  addToFavorites: (book: Book) => void;
  removeFromFavorites: (key: string) => void;
  
  addToReadingList: (book: Book, status?: ReadingStatus) => void;
  removeFromReadingList: (key: string) => void;
  updateReadingStatus: (key: string, status: ReadingStatus) => void;
  updateBookRating: (key: string, rating: number) => void;
  updateBookNote: (key: string, note: string) => void;
  updateCurrentPage: (key: string, page: number) => void; // YENİ

  addRecentBook: (book: Book) => void;
}

export const useBookStore = create<BookStore>()(
  persist(
    (set) => ({
      favorites: [],
      readingList: [],
      recentBooks: [],

      addToFavorites: (book) => set((state) => {
        if (state.favorites.some((b) => b.key === book.key)) return state;
        return { favorites: [...state.favorites, book] };
      }),
      
      removeFromFavorites: (key) => set((state) => ({
        favorites: state.favorites.filter((b) => b.key !== key)
      })),

      addToReadingList: (book, status = 'okunacak') => set((state) => {
        if (state.readingList.some((b) => b.key === book.key)) return state;
        return { readingList: [...state.readingList, { ...book, status }] };
      }),

      removeFromReadingList: (key) => set((state) => ({
        readingList: state.readingList.filter((b) => b.key !== key)
      })),

      updateReadingStatus: (key, status) => set((state) => ({
        readingList: state.readingList.map((b) => b.key === key ? { ...b, status } : b)
      })),

      updateBookRating: (key, rating) => set((state) => ({
        readingList: state.readingList.map((b) => b.key === key ? { ...b, rating } : b)
      })),

      updateBookNote: (key, note) => set((state) => ({
        readingList: state.readingList.map((b) => b.key === key ? { ...b, note } : b)
      })),

      // YENİ: Okunan sayfa sayısını güncelleyen fonksiyon
      updateCurrentPage: (key, page) => set((state) => ({
        readingList: state.readingList.map((b) => b.key === key ? { ...b, currentPage: page } : b)
      })),

      addRecentBook: (book) => set((state) => {
        const filtered = state.recentBooks.filter((b) => b.key !== book.key);
        return { recentBooks: [book, ...filtered].slice(0, 20) };
      }),
    }),
    {
      name: 'bookverse-storage',
    }
  )
);