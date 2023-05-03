import axios from "axios";

import Order from "../models/order";
import { createCartSlice } from "./cartSlice";

export const createOrdersSlice = (set) => ({
  orders: [],
  addOrder: async (cartItems, cartTotalAmount) => {
    const date = new Date();
    const response = await axios.post(
      "https://rn-complete-guide-66dfd-default-rtdb.asia-southeast1.firebasedatabase.app/orders/u1.json",
      {
        cartItems,
        cartTotalAmount,
        date: date.toISOString(),
      }
    );
    const resData = response.data;

    set((state) => {
      const newOrder = new Order(
        resData.name,
        cartItems,
        cartTotalAmount,
        date
      );
      state.orders.push(newOrder);
    });
    createCartSlice(set).clearCart();
  },
  fetchOrders: async () => {
    const response = await axios.get(
      "https://rn-complete-guide-66dfd-default-rtdb.asia-southeast1.firebasedatabase.app/orders/u1.json"
    );
    const resData = response.data;

    // map -> array
    const loadedOrders = [];
    for (const key in resData) {
      const { cartItems, cartTotalAmount, date } = resData[key];
      loadedOrders.push(
        new Order(key, cartItems, cartTotalAmount, new Date(date))
      );
    }

    set((state) => {
      state.orders = loadedOrders;
    });
  },
});
