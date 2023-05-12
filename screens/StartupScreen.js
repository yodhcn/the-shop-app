import { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Colors from "../constants/Colors";
import { useBoundStore } from "../stores/useBoundStore";

const StartupScreen = () => {
  const setDidTryAL = useBoundStore((state) => state.setDidTryAL);
  const authenticate = useBoundStore((state) => state.authenticate);

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        setDidTryAL();
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate } = transformedData;
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        setDidTryAL();
        return;
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime();
      authenticate(userId, token, expirationTime);
    };

    tryLogin();
  }, [setDidTryAL, authenticate]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StartupScreen;
