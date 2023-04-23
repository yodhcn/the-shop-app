import React from "react";
import { FlatList } from "react-native";

import { useBoundStore } from "../../stores/useBoundStore";
import ProductItem from "../../components/shop/ProductItem";

export default function ProductsOverviewScreen({ navigation }) {
  const products = useBoundStore((state) => state.availableProducts);

  return (
    <FlatList
      data={products}
      renderItem={(itemData) => {
        const { id, imageUrl, title, price } = itemData.item;
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
          />
        );
      }}
    />
  );
}
