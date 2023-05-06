import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const createAuthSlice = (set) => ({
  token: null,
  userId: null,
  isloggedin: false,
  signup: async (email, password) => {
    // https://console.firebase.google.com/u/0/project/rn-complete-guide-66dfd/authentication/users
    // https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBm5ZgfgXi0y0c5DuFnSAgZdkfzn22VV10";
    let response;
    try {
      response = await axios.post(url, {
        email,
        password,
        returnSecureToken: true,
      });
    } catch (error) {
      const resData = error.response.data;
      const errorId = resData.error.message;
      let meaasge = "Something went wrong!";
      // hhttps://firebase.google.com/docs/reference/rest/auth#section-create-email-password
      // Common error codes
      if (errorId === "EMAIL_EXISTS") {
        meaasge = "This email exists already!";
      }
      throw new Error(meaasge);
    }
    const resData = response.data;
    createAuthSlice(set).authenticate(resData.localId, resData.idToken);
    // set((state) => {
    //   state.token = resData.idToken;
    //   state.userId = resData.localId;
    // });
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  },
  login: async (email, password) => {
    // https://console.firebase.google.com/u/0/project/rn-complete-guide-66dfd/authentication/users
    // https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBm5ZgfgXi0y0c5DuFnSAgZdkfzn22VV10";
    let response;
    try {
      response = await axios.post(url, {
        email,
        password,
        returnSecureToken: true,
      });
    } catch (error) {
      const resData = error.response.data;
      const errorId = resData.error.message;
      let meaasge = "Something went wrong!";
      // https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
      // Common error codes
      if (errorId === "EMAIL_NOT_FOUND") {
        meaasge = "This email could not be found!";
      } else if (errorId === "INVALID_PASSWORD") {
        meaasge = "This password is not be valid!";
      }
      throw new Error(meaasge);
    }
    const resData = response.data;
    createAuthSlice(set).authenticate(resData.localId, resData.idToken);
    // set((state) => {
    //   state.token = resData.idToken;
    //   state.userId = resData.localId;
    // });
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  },
  authenticate: (userId, token) => {
    set((state) => {
      state.userId = userId;
      state.token = token;
    });
  },
});

const saveDataToStorage = (token, userId, expirationDate) => {
  console.log(token, userId, expirationDate);
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token,
      userId,
      expiryDate: expirationDate.toISOString(),
    })
  );
};
