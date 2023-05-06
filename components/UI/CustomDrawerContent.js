import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Button } from "react-native";
import Colors from "../../constants/Colors";
import { View } from "react-native";

import { useBoundStore } from "../../stores/useBoundStore";

export default function CustomDrawerContent(props) {
  const logout = useBoundStore((state) => state.logout);

  // https://reactnavigation.org/docs/drawer-navigator#providing-a-custom-drawercontent
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <View style={{ marginTop: 20 }}>
        <Button
          title="Logout"
          color={Colors.primary}
          onPress={() => logout()}
        />
      </View>
    </DrawerContentScrollView>
  );
}
