import { useLayoutEffect, useReducer, useCallback } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { useBoundStore } from "../../stores/useBoundStore";
import HeaderButton from "../../components/UI/HeaderButton";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";
const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedInputValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedInputValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let formIsValid = true;
    for (const key in updatedInputValidities) {
      formIsValid = formIsValid && updatedInputValidities[key];
    }
    return {
      formIsValid,
      inputValues: updatedInputValues,
      inputValidities: updatedInputValidities,
    };
  }
  return state;
};

export default function EditProductScreen({ navigation, route }) {
  const prodId = route.params && route.params.prodId;
  const editedProduct = useBoundStore(
    useCallback(
      (state) => state.availableProducts.find((prod) => prod.id === prodId),
      [prodId]
    )
  );
  const updateProduct = useBoundStore((state) => state.updateProduct);
  const createProduct = useBoundStore((state) => state.createProduct);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : "",
      imageUrl: editedProduct ? editedProduct.imageUrl : "",
      description: editedProduct ? editedProduct.description : "",
      price: "",
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong Input!", "Please check the errors in the form.");
      return;
    }

    const { title, imageUrl, description, price } = formState.inputValues;
    if (editedProduct) {
      updateProduct(prodId, title, description, imageUrl);
    } else {
      createProduct(title, description, imageUrl, +price);
    }
    navigation.goBack();
  }, [navigation, prodId, updateProduct, createProduct, formState]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Save"
            iconName={
              Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
            }
            onPress={submitHandler}
          />
        </HeaderButtons>
      ),
    });
  }, [submitHandler]);

  function textChangeHandler(inputIdentifier, text) {
    let isValid = false;
    if (text.trim().length > 0) {
      isValid = true;
    }
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: text,
      isValid,
      input: inputIdentifier,
    });
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.title}
            onChangeText={(text) => {
              textChangeHandler("title", text);
            }}
            autoCapitalize="sentences"
          />
          {!formState.inputValidities.title && (
            <Text>Please enter a valid title!</Text>
          )}
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.imageUrl}
            onChangeText={(text) => {
              textChangeHandler("imageUrl", text);
            }}
          />
        </View>
        {!editedProduct && (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={formState.inputValues.price}
              onChangeText={(text) => {
                textChangeHandler("price", text);
              }}
              keyboardType="decimal-pad"
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.description}
            onChangeText={(text) => {
              textChangeHandler("description", text);
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});
