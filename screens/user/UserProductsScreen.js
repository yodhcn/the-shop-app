import { useLayoutEffect } from "react";
import { View, Text, FlatList, Button, Alert, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { useBoundStore } from "../../stores/useBoundStore";
import HeaderButton from "../../components/UI/HeaderButton";
import ProductItem from "../../components/shop/ProductItem";
import Colors from "../../constants/Colors";

export default function UserProductsScreen({ navigation }) {
  const userProducts = useBoundStore((state) => state.userProducts);
  const deleteProduct = useBoundStore((state) => state.deleteProduct);

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
            title="Add"
            iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
            onPress={() => {
              navigation.navigate("EditProduct");
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  function editProductHandler(id) {
    navigation.navigate("EditProduct", {
      prodId: id,
    });
  }

  function deleteHandler(productId) {
    Alert.alert("Are you sure?", "Do you realy want to delete this item?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          deleteProduct(productId);
        },
      },
    ]);
  }

  if (userProducts.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found. Mabye start adding some!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={userProducts}
      renderItem={(itemData) => {
        const product = itemData.item;
        const { id, imageUrl, title, price } = product;
        return (
          <ProductItem
            imageUrl={imageUrl}
            title={title}
            price={price}
            onSelect={() => {
              editProductHandler(id);
            }}
          >
            <Button
              color={Colors.primary}
              title="Edit"
              onPress={() => {
                editProductHandler(id);
              }}
            />
            <Button
              color={Colors.primary}
              title="Delete"
              onPress={() => {
                deleteHandler(id);
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
