import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/data/menu-data";

interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity) => {
        const items = get().items;
        const existingItem = items.find((item) => item.id === product.id);
        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
            ),
          });
        } else {
          set({ items: [...items, { ...product, quantity }] });
        }
      },
      removeItem: (productId) => set({ items: get().items.filter((item) => item.id !== productId) }),
      updateQuantity: (productId, delta) => {
        const updatedItems = get().items.map((item) => {
          if (item.id === productId) {
            return { ...item, quantity: Math.max(0, item.quantity + delta) };
          }
          return item;
        }).filter(item => item.quantity > 0);
        set({ items: updatedItems });
      },
      clearCart: () => set({ items: [] }),
      getTotalItems: () => get().items.reduce((acc, item) => acc + item.quantity, 0),
      getTotalPrice: () => get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    }),
    { name: "cart-storage" }
  )
);
