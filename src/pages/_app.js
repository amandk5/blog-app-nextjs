import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import "../Styles.css";
import { persistor, store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </ChakraProvider>
    </Provider>
  );
}
