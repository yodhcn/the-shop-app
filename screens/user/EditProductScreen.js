import { useLayoutEffect, useReducer, useCallback } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { useBoundStore } from "../../stores/useBoundStore";
import HeaderButton from "../../components/UI/HeaderButton";
import Input from "../../components/UI/Input";

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
    let updatedFormIsValid = true;
    for (const key in updatedInputValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedInputValidities[key];
    }
    return {
      inputValues: updatedInputValues,
      inputValidities: updatedInputValidities,
      formIsValid: updatedFormIsValid,
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

  const inputChangeHandler = useCallback(
    (id, value, isValid) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value,
        isValid,
        input: id,
      });
    },
    [dispatchFormState]
  );

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

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            required
            id="title"
            lable="Title"
            errorText="Please enter a valid title!"
            autoCapitalize="sentences"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.title : ""}
            initiallyValid={!!editedProduct}
          />
          <Input
            required
            id="imageUrl"
            lable="Image URL"
            errorText="Please enter a valid imageUrl!"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.imageUrl : ""}
            initiallyValid={!!editedProduct}
          />
          {!editedProduct && (
            <Input
              required
              id="price"
              lable="Price"
              errorText="Please enter a valid price!"
              keyboardType="decimal-pad"
              onInputChange={inputChangeHandler}
              min={0.1}
            />
          )}
          <Input
            required
            id="description"
            lable="Description"
            errorText="Please enter a valid description!"
            autoCapitalize="sentences"
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.description : ""}
            initiallyValid={!!editedProduct}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
});
