import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { createProductSlice } from "./productSlice";
import { createCartSlice } from "./cartSlice";

export const useBoundStore = create(
  immer((...a) => ({
    ...createProductSlice(...a),
    ...createCartSlice(...a),
  }))
);
