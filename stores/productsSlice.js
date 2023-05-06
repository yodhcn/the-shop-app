import { createCartSlice } from "./cartSlice";
import Product from "../models/product";
import axios from "axios";

export const createProductsSlice = (set, get) => ({
  availableProducts: [],
  userProducts: [],
  deleteProduct: async (productId) => {
    const token = get().token;
    await axios.delete(
      `https://rn-complete-guide-66dfd-default-rtdb.asia-southeast1.firebasedatabase.app/products/${productId}.json?auth=${token}`
    );

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
  createProduct: async (title, description, imageUrl, price) => {
    const token = get().token;
    const userId = get().userId;
    const response = await axios.post(
      `https://rn-complete-guide-66dfd-default-rtdb.asia-southeast1.firebasedatabase.app/products.json?auth=${token}`,
      {
        title,
        description,
        imageUrl,
        price,
        ownerId: userId,
      }
    );
    const resData = response.data;

    set((state) => {
      const newProduct = new Product(
        resData.name,
        userId,
        title,
        imageUrl,
        description,
        price
      );
      state.availableProducts.push(newProduct);
      state.userProducts.push(newProduct);
    });
  },
  updateProduct: async (id, title, description, imageUrl) => {
    const token = get().token;
    // https://firebase.google.com/docs/database/rest/auth#authenticate_with_an_id_token
    await axios.patch(
      `https://rn-complete-guide-66dfd-default-rtdb.asia-southeast1.firebasedatabase.app/products/${id}.json?auth=${token}`,
      {
        title,
        description,
        imageUrl,
      }
    );

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
    });
  },
  fetchProducts: async () => {
    const userId = get().userId;
    const response = await axios.get(
      "https://rn-complete-guide-66dfd-default-rtdb.asia-southeast1.firebasedatabase.app/products.json"
    );
    const resData = response.data;

    // map -> array
    const loadedProducts = [];
    for (const key in resData) {
      const { ownerId, title, imageUrl, description, price } = resData[key];
      loadedProducts.push(
        new Product(key, ownerId, title, imageUrl, description, price)
      );
    }

    set((state) => {
      state.availableProducts = loadedProducts;
      state.userProducts = loadedProducts.filter(
        (prod) => prod.ownerId === userId
      );
    });
  },
});
