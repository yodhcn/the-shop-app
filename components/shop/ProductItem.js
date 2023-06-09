import {
  View,
  Text,
  Image,
  Button,
  Pressable,
  Platform,
  StyleSheet,
} from "react-native";

import Card from "../UI/Card";
import Colors from "../../constants/Colors";

export default function ProductItem(props) {
  return (
    <Card style={styles.product}>
      <View style={styles.pressable}>
        <Pressable
          onPress={props.onSelect}
          android_ripple={{
            color: Colors.ripple_material_light,
            foreground: true,
          }}
          style={
            Platform.OS === "android" && Platform.Version >= 21
              ? undefined
              : ({ pressed }) => (pressed ? styles.pressed : undefined)
          }
        >
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: props.imageUrl }} />
          </View>
          <View style={styles.details}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.price}>${props.price.toFixed(2)}</Text>
          </View>
          <View style={styles.actions}>{props.children}</View>
        </Pressable>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  product: {
    height: 300,
    margin: 20,
  },
  pressable: {
    borderRadius: 10,
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  details: {
    alignItems: "center",
    height: "17%",
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: "open-sans-bold",
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontFamily: "open-sans",
    color: "#888",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "23%",
    paddingHorizontal: 20,
  },
  pressed: {
    opacity: 0.75,
  },
});
