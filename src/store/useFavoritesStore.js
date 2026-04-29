import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFavoritesStore = create(
  persist(
    (set) => ({
      favorites: [],

      toggleFavorite: (teacherId) => set((state) => {
        const isFavorite = state.favorites.includes(teacherId);
        if (isFavorite) {
          return { favorites: state.favorites.filter(id => id !== teacherId) };
        } else {
          return { favorites: [...state.favorites, teacherId] };
        }
      }),

      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: "favorites-storage", 
    }
  )
);