import { LOGIN_USER, LOGOUT_USER, SET_INITIAL_STATE } from "./auth.types";

const initState = {
  token: "null",
};
// const initState = {
//   token: localStorage.getItem("blog_app_user_token") || null,
// };

export default function AuthReducer(state = initState, action) {
  switch (action.type) {
    case LOGIN_USER:
      // add to localStorage
      localStorage.setItem("blog_app_user_token", action.payload);
      return {
        ...state,
        token: action.payload,
      };
    case LOGOUT_USER:
      // remove from localStorage
      localStorage.removeItem("blog_app_user_token");
      return {
        ...state,
        token: null,
      };
    case SET_INITIAL_STATE:
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
}
