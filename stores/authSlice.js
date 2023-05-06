import axios from "axios";

export const createAuthSlice = (set) => ({
  signup: async (email, password) => {
    // https://console.firebase.google.com/u/0/project/rn-complete-guide-66dfd/authentication/users
    // https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBm5ZgfgXi0y0c5DuFnSAgZdkfzn22VV10";
    console.log(url);
    console.log(`${email}, ${password}`);
    const response = await axios.post(url, {
      email,
      password,
      returnSecureToken: true,
    });
    const resData = response.data;
  },
});
