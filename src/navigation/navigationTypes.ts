export enum Screens {
  OnBoarding = "OnBoarding",
  AuthPhone = "AuthPhone",
  AuthPhoneCode = "AuthPhoneCode",
  Language = "Language",
  Permission = "Permission",
}

export type RootStackParamList = {
  OnBoarding: undefined;
  AuthPhone: undefined;
  AuthPhoneCode: {phoneNumber: string; countryCode: string};
  Language: {phoneNumber: string; countryCode: string};
  Permission: undefined;
};
