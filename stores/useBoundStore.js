import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { createProductsSlice } from "./productsSlice";
import { createCartSlice } from "./cartSlice";
import { createOrdersSlice } from "./ordersSlice";

export const useBoundStore = create(
  immer((...a) => ({
    ...createProductsSlice(...a),
    ...createCartSlice(...a),
    ...createOrdersSlice(...a),
  }))
);
