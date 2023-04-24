import { useLayoutEffect } from "react";
import { View, FlatList, Text, Platform, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { useBoundStore } from "../../stores/useBoundStore";
import HeaderButton from "../../components/UI/HeaderButton";

export default function OrdersScreen({ navigation }) {
  const orders = useBoundStore((state) => state.orders);

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
    });
  }, [navigation]);

  return (
    <View>
      <FlatList
        data={orders}
        renderItem={(itemData) => {
          const order = itemData.item;
          return <Text>{order.totalAmount}</Text>;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
