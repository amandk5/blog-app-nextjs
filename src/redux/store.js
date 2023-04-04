import {
  legacy_createStore,
  combineReducers,
  compose,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import AuthReducer from "./auth/auth.reducer";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const rootReducer = combineReducers({
  auth: AuthReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const createComposer = compose;

const store = legacy_createStore(
  persistedReducer,
  createComposer(applyMiddleware(thunk))
);
let persistor = persistStore(store);

export { persistor, store };

// import { configureStore } from "@reduxjs/toolkit";
// import { createWrapper } from "next-redux-wrapper";
// import { commentSlice } from "./slices/commentSlice";
// import { AuthReducer } from "./auth/auth.reducer";
// import { authSlice } from "./slices/auth/authSlice";
// // comment: commentSlice.reducer,

// const makeStore = () =>
//   configureStore({
//     reducer: {
//       auth: authSlice.reducer,
//     },
//     devTools: true,
//   });

// export const wrapper = createWrapper(makeStore);
