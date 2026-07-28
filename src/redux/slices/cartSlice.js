import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";

const getInitialCart = () => {
  if (typeof window !== "undefined") {
    const saved = getLocalStorage("MEDISTORE_CART");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
  }
  return [];
};

const saveCartToStorage = (cartItems) => {
  if (typeof window !== "undefined") {
    setLocalStorage("MEDISTORE_CART", JSON.stringify(cartItems));
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: getInitialCart(),
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.items.find((item) => item.id === product.id);
      if (existing) {
        existing.quantity += product.quantity || 1;
      } else {
        state.items.push({
          ...product,
          quantity: product.quantity || 1,
        });
      }
      saveCartToStorage(state.items);
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
      saveCartToStorage(state.items);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item && quantity > 0) {
        item.quantity = quantity;
      }
      saveCartToStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveCartToStorage([]);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
