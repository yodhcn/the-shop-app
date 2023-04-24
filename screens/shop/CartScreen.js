import React from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";

import { useBoundStore } from "../../stores/useBoundStore";
import Colors from "../../constants/Colors";

export default function CartScreen(props) {
  const cartTotalAmount = useBoundStore((state) => state.cartTotalAmount);
  const cartItems = useBoundStore((state) => {
    // object to array
    const transformedCartItems = [];
    for (const key in state.cartItems) {
      transformedCartItems.push({ ...state.cartItems[key], productId: key });
    }
    return transformedCartItems;
  });

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
        </Text>
        <Button
          color={Colors.accent}
          title="Order Now"
          disabled={cartItems.length === 0}
        />
      </View>
      <View>
        <Text>ORDER ITEMS</Text>
      </View>
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
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  amount: {
    color: Colors.accent,
  },
});
