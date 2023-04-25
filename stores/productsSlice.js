import { PRODUCTS } from "../data/dummy-data";
import { createCartSlice } from "./cartSlice";

export const createProductsSlice = (set) => ({
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === "u1"),
  deleteProduct: (productId) => {
    set((state) => {
      state.availableProducts = state.availableProducts.filter(
        (prod) => prod.id !== productId
      );
      state.userProducts = state.userProducts.filter(
        (prod) => prod.id !== productId
      );
    });
    createCartSlice(set).deleteCartItem(productId);
  },
});
