import axios from "axios";

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
      console.log(resData);
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
    set((state) => {
      state.token = resData.idToken;
      state.userId = resData.localId;
    });
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
      console.log(error);
      const resData = error.response.data;
      console.log(resData);
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
    set((state) => {
      state.token = resData.idToken;
      state.userId = resData.localId;
    });
  },
});
