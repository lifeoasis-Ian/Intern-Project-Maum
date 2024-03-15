import * as React from "react";
import Toast from "react-native-toast-message";
import AppNavigator from "./src/navigation/AppNavigator.tsx";
import {store} from "./src/app/store.ts";
import {Provider} from "react-redux";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <>
        <AppNavigator />
        <Toast />
      </>
    </Provider>
  );
};

export default App;
