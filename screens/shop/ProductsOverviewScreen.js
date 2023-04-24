import React from "react";
import { FlatList } from "react-native";

import { useBoundStore } from "../../stores/useBoundStore";
import ProductItem from "../../components/shop/ProductItem";

export default function ProductsOverviewScreen({ navigation }) {
  const products = useBoundStore((state) => state.availableProducts);
  const addToCart = useBoundStore((state) => state.addToCart);

  return (
    <FlatList
      data={products}
      renderItem={(itemData) => {
        const product = itemData.item;
        const { id, imageUrl, title, price } = product;
        return (
          <ProductItem
            imageUrl={imageUrl}
            title={title}
            price={price}
            onViewDetail={() => {
              navigation.navigate("ProductDetail", {
                prodId: id,
                prodTitle: title,
              });
            }}
            onAddToCart={() => {
              addToCart(product);
            }}
          />
        );
      }}
    />
  );
}
