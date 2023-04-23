import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";

import ShopNavigator from "./navigators/ShopNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <ShopNavigator />
    </NavigationContainer>
  );
}
