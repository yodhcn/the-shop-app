import { PRODUCTS } from "../data/dummy-data";

export const createProductSlice = (set) => ({
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === "u1"),
});
