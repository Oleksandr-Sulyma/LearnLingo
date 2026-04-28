import { create } from "zustand";

export const useFiltersStore = create((set) => ({
  language: null,
  level: null,
  price: null,

  setFilter: (key, value) => set({ [key]: value }),

  resetFilters: () => set({ language: null, level: null, price: null }),
}));