import * as React from "react";
import Toast from "react-native-toast-message";
import AppNavigator from "./src/navigation/AppNavigator.tsx";

const App: React.FunctionComponent = () => {
  return (
    <>
      <AppNavigator />
      <Toast />
    </>
  );
};

export default App;
