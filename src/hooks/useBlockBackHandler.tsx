import {useEffect} from "react";
import {BackHandler} from "react-native";

function useBlockBackHandler() {
  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        return true;
      },
    );

    return () => subscription.remove();
  }, []);
}

export default useBlockBackHandler;
