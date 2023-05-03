import { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import { useBoundStore } from "../../stores/useBoundStore";
import Colors from "../../constants/Colors";
import CartItem from "../../components/shop/CartItem";
import Card from "../../components/UI/Card";

export default function CartScreen(props) {
  const [isLoading, setIsLoading] = useState(false);

  const cartTotalAmount = useBoundStore((state) => state.cartTotalAmount);
  const cartItems = useBoundStore((state) => {
    // object to array
    const transformedCartItems = [];
    for (const key in state.cartItems) {
      transformedCartItems.push({ ...state.cartItems[key], productId: key });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });
  const removeFromCart = useBoundStore((state) => state.removeFromCart);
  const addOrder = useBoundStore((state) => state.addOrder);

  async function sendOrderHandler() {
    setIsLoading(true);
    await addOrder(cartItems, cartTotalAmount);
    setIsLoading(false);
  }

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total{" "}
          <Text style={styles.amount}>
            ${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}
          </Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Button
            color={Colors.accent}
            title="Order Now"
            disabled={cartItems.length === 0}
            onPress={sendOrderHandler}
          />
        )}
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => {
          const { productId, quantity, productTitle, sum } = itemData.item;
          return (
            <CartItem
              quantity={quantity}
              title={productTitle}
              amount={sum}
              deletable
              onRemove={() => {
                removeFromCart(productId);
              }}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  amount: {
    color: Colors.accent,
  },
});
