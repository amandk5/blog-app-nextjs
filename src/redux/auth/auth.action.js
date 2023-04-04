import { LOGIN_USER, LOGOUT_USER } from "./auth.types";
import axios from "axios";

export const registerUser = async (userInfo) => {
  await axios
    .post("/api/register/user", userInfo)
    .then(() => "success")
    .catch((err) => "error");
};

export const loginUser = (userCredentials) => async (dispatch) => {
  await axios
    .post("/api/login", userCredentials)
    .then((res) => {
      alert("logged in successfully");
      // send the token to reducer by dispatching LOGIN_USER action
      dispatch({ type: LOGIN_USER, payload: res.data.token });
    })
    .catch((err) => "error");
};

export const logoutUser = () => ({
  type: LOGOUT_USER,
});
