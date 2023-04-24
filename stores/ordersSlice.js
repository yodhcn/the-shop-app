import Order from "../models/order";

export const createOrdersSlice = (set) => ({
  orders: [],
  addOrder: (cartItems, cartTotalAmount) =>
    set((state) => {
      const newOrder = new Order(
        new Date().toString(),
        cartItems,
        cartTotalAmount,
        new Date()
      );
      state.orders.push(newOrder);
    }),
});
