import { PRODUCTS } from "../data/dummy-data";

export const createProductsSlice = (set) => ({
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === "u1"),
});
