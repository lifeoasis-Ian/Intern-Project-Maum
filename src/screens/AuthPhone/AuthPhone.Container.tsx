import React, {useMemo, useState} from "react";
import {useHeaderHeight} from "@react-navigation/elements";
import {showAuthCodeTryOverErrorToast} from "../../components/ToastMessages.tsx";
import {StatusCode} from "../../utils/StatusCode.ts";
import {blockStringInput} from "../../utils/blockStringInput.ts";
import {AuthScreenProps} from "./types.ts";
import AuthPhoneView from "./AuthPhone.View.tsx";
import {service} from "../../domains";

const PHONE_NUMBER_LENGTH = 11;

const AuthPhoneContainer: React.FC<AuthScreenProps> = ({navigation}) => {
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState("+82");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const disabled = useMemo(
    () => phoneNumber.length < PHONE_NUMBER_LENGTH,
    [phoneNumber],
  );

  const headerHeight = useHeaderHeight();

  async function handleGetAuthCode() {
    setLoading(true);
    try {
      const result = await service.authentication.getAuthCode();
      if (result) {
        navigation.push("AuthPhoneCode", {phoneNumber, countryCode});
      }
    } catch (error: any) {
      if (error.message === StatusCode.TRY_OVER_ERROR_CODE) {
        showAuthCodeTryOverErrorToast();
      } else {
        throw error;
      }
    } finally {
      setLoading(false);
    }
  }

  async function onChangePhoneNumber(phone: string) {
    setPhoneNumber(blockStringInput(phone));
  }

  return (
    <AuthPhoneView
      handleGetAuthCode={handleGetAuthCode}
      onChangePhoneNumber={onChangePhoneNumber}
      disabled={disabled}
      headerHeight={headerHeight}
      show={show}
      setShow={setShow}
      loading={loading}
      countryCode={countryCode}
      setCountryCode={setCountryCode}
      phoneNumber={phoneNumber}
    />
  );
};

export default AuthPhoneContainer;
