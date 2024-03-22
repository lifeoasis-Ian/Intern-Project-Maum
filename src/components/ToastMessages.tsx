import Toast from "react-native-toast-message";

export const showAuthCodeTryOverErrorToast = () => {
  Toast.show({
    type: "error",
    text1: "인증 번호 요청 제한",
    text2: "1분 뒤에 다시 시도해주세요!",
  });
};

export const showAuthCodeMatchErrorToast = () => {
  Toast.show({
    type: "error",
    text1: "인증 번호 오류",
    text2: "인증 번호가 올바르지 않습니다!",
  });
};

export const showAuthCodeTimeOverErrorToast = () => {
  Toast.show({
    type: "error",
    text1: "인증 번호 만료",
    text2: "인증번호를 재발급 해주세요!",
  });
};
