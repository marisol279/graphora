import { create } from "zustand";

export type CartItem = {
  id: number;
  title: string;
  image: any;

  // NUEVO
  size: "small" | "medium" | "large";

  price: number;
  quantity: number;
};

type CartStore = {
  cart: CartItem[];

  addItem: (item: CartItem) => void;

  removeItem: (id: number) => void;

  clearCart: () => void;

  getTotal: () => number;
};

export const useCartStore = create<CartStore>(
  (set, get) => ({
    cart: [],

    addItem: (item) =>
      set((state) => {
        const existing = state.cart.find(
          (i) =>
            i.id === item.id &&
            i.size === item.size
        );

        if (existing) {
          return {
            cart: state.cart.map((i) =>
              i.id === item.id &&
              i.size === item.size
                ? {
                    ...i,
                    quantity: i.quantity + 1,
                  }
                : i
            ),
          };
        }

        return {
          cart: [...state.cart, item],
        };
      }),

    removeItem: (id) =>
      set((state) => ({
        cart: state.cart
          .map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                }
              : item
          )
          .filter((item) => item.quantity > 0),
      })),

    clearCart: () =>
      set({
        cart: [],
      }),

    getTotal: () => {
      return get().cart.reduce(
        (total, item) =>
          total + item.price * item.quantity,
        0
      );
    },
  })
);