import { useEffect, useState } from "react";
import { View, ActivityIndicator, Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import AuthScreen from "../screens/user/AuthScreen";
import Colors from "../constants/Colors";
import { useBoundStore } from "../stores/useBoundStore";

const ProductsStack = createStackNavigator();
const OrdersStack = createStackNavigator();
const AdminStack = createStackNavigator();
const AuthStack = createStackNavigator();

const defaultStackNavigatorScreenOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : undefined,
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

function ProductsNavigator() {
  return (
    <ProductsStack.Navigator screenOptions={defaultStackNavigatorScreenOptions}>
      <ProductsStack.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={{ title: "All Products" }}
      />
      <ProductsStack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={({ route }) => ({
          title: route.params.prodTitle,
        })}
      />
      <ProductsStack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: "Your Cart",
        }}
      />
    </ProductsStack.Navigator>
  );
}

function OrdersNavigator() {
  return (
    <OrdersStack.Navigator screenOptions={defaultStackNavigatorScreenOptions}>
      <OrdersStack.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          title: "Your Orders",
        }}
      />
    </OrdersStack.Navigator>
  );
}

function AdminNavigator() {
  return (
    <AdminStack.Navigator screenOptions={defaultStackNavigatorScreenOptions}>
      <AdminStack.Screen
        name="UserProducts"
        component={UserProductsScreen}
        options={{
          title: "Your Products",
        }}
      />
      <AdminStack.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={({ route }) => ({
          title:
            route.params && route.params.prodId
              ? "Edit Product"
              : "Add Product",
        })}
      />
    </AdminStack.Navigator>
  );
}

function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={defaultStackNavigatorScreenOptions}>
      <AuthStack.Screen name="Authenticate" component={AuthScreen} />
    </AuthStack.Navigator>
  );
}

const Drawer = createDrawerNavigator();

function ShopNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: Colors.primary,
        drawerLabelStyle: {
          fontFamily: "open-sans-bold",
        },
      }}
    >
      <Drawer.Screen
        name="ProductsNavigator"
        component={ProductsNavigator}
        options={{
          drawerLabel: "Products",
          drawerIcon: ({ color }) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
              size={23}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="OrdersNavigator"
        component={OrdersNavigator}
        options={{
          drawerLabel: "Orders",
          drawerIcon: ({ color }) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-list" : "ios-list"}
              size={23}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="AdminNavigator"
        component={AdminNavigator}
        options={{
          drawerLabel: "Admin",
          drawerIcon: ({ color }) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-create" : "ios-create"}
              size={23}
              color={color}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function MainNavigator() {
  const [isLoading, setIsLoading] = useState(true);

  const token = useBoundStore((state) => state.token);
  const authenticate = useBoundStore((state) => state.authenticate);

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        return;
      }

      const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate } = transformedData;
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        return;
      }
      authenticate(userId, token);
    };

    tryLogin().then(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return token === null ? <AuthNavigator /> : <ShopNavigator />;
}
