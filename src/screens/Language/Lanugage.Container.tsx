import React, {useState, useEffect} from "react";
import RoundedButton from "../../components/RoundedButton.tsx";
import {useIsFocused} from "@react-navigation/native";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {Languages} from "../../utils/Languages.ts";
import {useThrottle} from "../../hooks/useThrottle.ts";
import {LanguageOptionProps, LanguageScreenProps} from "./types.ts";
import LanguageView from "./Language.View.tsx";
import {service} from "../../domains";
import actions from "../../redux/actions";
import {StatusCode} from "../../utils/StatusCode.ts";

const LanguageContainer: React.FC<LanguageScreenProps> = ({navigation}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [disabled, setDisabled] = useState(true);

  const account = useAppSelector(state => state.account);
  const user = useAppSelector(state => state.user);

  useEffect(() => {
    setDisabled(!selectedLanguage);
  }, [selectedLanguage]);

  const handleSubmitLanguage = async () => {
    let changedLanguage = "";

    if (selectedLanguage === "한국어") {
      changedLanguage = Languages.KOREAN;
    } else if (selectedLanguage === "English") {
      changedLanguage = Languages.ENGLISH;
    } else if (selectedLanguage === "日本語") {
      changedLanguage = Languages.JAPANESE;
    }

    if (
      (await service.account.createAccount(
        user.phoneNumber,
        user.countryCode,
        changedLanguage,
        account.token,
      )) === StatusCode.SUCCESS_CODE
    ) {
      await actions.account.checkPermission();
      await actions.account.isSignIn(account.token);
    } else {
      throw new Error("Error");
    }
  };

  const handleSelectLanguage = (nowLanguage: string) => {
    setSelectedLanguage(prevLanguage => {
      if (prevLanguage === nowLanguage) {
        return "";
      } else if (prevLanguage === "") {
        return nowLanguage;
      } else {
        return prevLanguage;
      }
    });
  };

  return (
    <LanguageView
      handleSubmitLanguage={handleSubmitLanguage}
      handleSelectLanguage={handleSelectLanguage}
      disabled={disabled}
      selectedLanguage={selectedLanguage}
    />
  );
};

export default LanguageContainer;
