import CartItem from "../models/cart-item";

export const createCartSlice = (set) => ({
  cartItems: {},
  cartTotalAmount: 0,
  addToCart: (product) =>
    set((state) => {
      const productPrice = product.price;
      const productTitle = product.title;

      let updatedOrNewCartItem;
      if (state.cartItems[product.id]) {
        updatedOrNewCartItem = new CartItem(
          state.cartItems[product.id].quantity + 1,
          productPrice,
          productTitle,
          state.cartItems[product.id].sum + productPrice
        );
      } else {
        updatedOrNewCartItem = new CartItem(
          1,
          productPrice,
          productTitle,
          productPrice
        );
      }
      state.cartItems[product.id] = updatedOrNewCartItem;
      state.cartTotalAmount += productPrice;
    }),
});
