import { PRODUCTS } from "../data/dummy-data";
import { createCartSlice } from "./cartSlice";
import Product from "../models/product";

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
  createProduct: (title, description, imageUrl, price) =>
    set((state) => {
      const newProduct = new Product(
        new Date().toString(),
        "u1",
        title,
        imageUrl,
        description,
        price
      );
      state.availableProducts.push(newProduct);
      state.userProducts.push(newProduct);
    }),

  updateProduct: (id, title, description, imageUrl) =>
    set((state) => {
      const userProductIndex = state.userProducts.findIndex(
        (prod) => prod.id === id
      );
      state.userProducts[userProductIndex] = new Product(
        state.userProducts[userProductIndex].id,
        state.userProducts[userProductIndex].ownerId,
        title,
        imageUrl,
        description,
        state.userProducts[userProductIndex].price
      );

      const availableProductIndex = state.availableProducts.findIndex(
        (prod) => prod.id === id
      );
      state.availableProducts[availableProductIndex] = new Product(
        state.availableProducts[availableProductIndex].id,
        state.availableProducts[availableProductIndex].ownerId,
        title,
        imageUrl,
        description,
        state.availableProducts[availableProductIndex].price
      );
    }),
});
