import { useLayoutEffect } from "react";
import { FlatList, Button, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { useBoundStore } from "../../stores/useBoundStore";
import ProductItem from "../../components/shop/ProductItem";
import HeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";

export default function ProductsOverviewScreen({ navigation }) {
  const products = useBoundStore((state) => state.availableProducts);
  const addToCart = useBoundStore((state) => state.addToCart);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderButtons left HeaderButtonComponent={HeaderButton}>
          <Item
            title="Menu"
            iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        </HeaderButtons>
      ),
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

  function onSelectItemHandler(id, title) {
    navigation.navigate("ProductDetail", {
      prodId: id,
      prodTitle: title,
    });
  }

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
            onSelect={() => {
              onSelectItemHandler(id, title);
            }}
          >
            <Button
              color={Colors.primary}
              title="View Details"
              onPress={() => {
                onSelectItemHandler(id, title);
              }}
            />
            <Button
              color={Colors.primary}
              title="To Cart"
              onPress={() => {
                addToCart(product);
              }}
            />
          </ProductItem>
        );
      }}
    />
  );
}
