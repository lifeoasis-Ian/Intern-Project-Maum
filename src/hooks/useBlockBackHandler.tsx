import {useEffect} from "react";
import {BackHandler} from "react-native";

function useBlockBackHandler(handler: () => boolean) {
  useEffect(() => {
    // 물리적 뒤로가기 버튼에 이벤트 리스너 추가
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      handler,
    );

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => subscription.remove();
  }, [handler]);
}

export default useBlockBackHandler;
