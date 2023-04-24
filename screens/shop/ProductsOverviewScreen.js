import { useLayoutEffect } from "react";
import { FlatList, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { useBoundStore } from "../../stores/useBoundStore";
import ProductItem from "../../components/shop/ProductItem";
import HeaderButton from "../../components/UI/HeaderButton";

export default function ProductsOverviewScreen({ navigation }) {
  const products = useBoundStore((state) => state.availableProducts);
  const addToCart = useBoundStore((state) => state.addToCart);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Menu"
            iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
            onPress={() => {
              navigation.navigate("Cart");
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

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
