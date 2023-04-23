import React from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  StyleSheet,
} from "react-native";

import { useBoundStore } from "../../stores/useBoundStore";

export default function ProductDetailScreen({ route }) {
  const selectedProduct = useBoundStore((state) =>
    state.availableProducts.find((prod) => prod.id === route.params.prodId)
  );
  return (
    <View>
      <Text>{selectedProduct.title}</Text>
    </View>
  );
}
