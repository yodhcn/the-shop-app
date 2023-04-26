import { useCallback } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  StyleSheet,
} from "react-native";

import { useBoundStore } from "../../stores/useBoundStore";
import Colors from "../../constants/Colors";

export default function ProductDetailScreen(props) {
  const prodId = props.route.params.prodId;
  const product = useBoundStore(
    useCallback(
      (state) => state.availableProducts.find((prod) => prod.id === prodId),
      [prodId]
    )
  );
  const addToCart = useBoundStore((state) => state.addToCart);

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: product.imageUrl }} />
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title="Add To Cart"
          onPress={() => {
            addToCart(product);
          }}
        />
      </View>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      <Text style={styles.description}>{product.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  actions: {
    marginVertical: 10,
    alignItems: "center",
  },
  price: {
    fontSize: 20,
    fontFamily: "open-sans-bold",
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
  },
  description: {
    fontSize: 14,
    fontFamily: "open-sans",
    textAlign: "center",
    marginHorizontal: 20,
  },
});
