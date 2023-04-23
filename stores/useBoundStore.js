import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { createProductSlice } from "./productSlice";

export const useBoundStore = create(
  immer((...a) => ({
    ...createProductSlice(...a),
  }))
);
