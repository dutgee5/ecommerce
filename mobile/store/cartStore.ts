import { create } from "zustand";

export const useCart = create((set) => ({
  items: [],

  addProduct: (product: any) =>
    // Todo: if already in cart, increment quantity instead of adding a new item else add a new item
    set((state) => ({ items: [...state.items, { product, quantity: 1 }] })),

  resetCart: () => set({ items: [] }),
}));
