import React from "react";
import { FlatList, Text } from "react-native";

import { useBoundStore } from "../../stores/useBoundStore";

export default function ProductsOverviewScreen(props) {
  const products = useBoundStore((state) => state.availableProducts);
  return (
    <FlatList
      data={products}
      renderItem={(itemData) => <Text>{itemData.item.title}</Text>}
    />
  );
}
