import {Provider} from "react-redux";
import {store} from "./src/redux/store";
import App from "./App.tsx";
import Toast from "react-native-toast-message";
import * as React from "react";
import {GestureHandlerRootView} from "react-native-gesture-handler";

const Root: React.FC = () => {
  return (
    <Provider store={store}>
      <App />
      <Toast />
    </Provider>
  );
};

export default Root;
