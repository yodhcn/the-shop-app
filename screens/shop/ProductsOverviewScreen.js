import { useLayoutEffect, useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  FlatList,
  Button,
  Platform,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { useBoundStore } from "../../stores/useBoundStore";
import ProductItem from "../../components/shop/ProductItem";
import HeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";

export default function ProductsOverviewScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [error, setError] = useState();
  const fetchProducts = useBoundStore((state) => state.fetchProducts);
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

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await fetchProducts();
    } catch (error) {
      setError(error);
    }
    setIsRefreshing(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      loadProducts().then(setIsLoading(false));
    }, [])
  );

  function onSelectItemHandler(id, title) {
    navigation.navigate("ProductDetail", {
      prodId: id,
      prodTitle: title,
    });
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error.message}</Text>
        <Button
          title="Try again"
          color={Colors.primary}
          onPress={loadProducts}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found. Mabye start adding some!</Text>
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={isRefreshing}
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

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
