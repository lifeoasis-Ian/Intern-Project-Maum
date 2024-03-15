export enum Screens {
  OnBoarding = "OnBoarding",
  AuthPhone = "AuthPhone",
  AuthPhoneCode = "AuthPhoneCode",
  Language = "Language",
  Permission = "Permission",
  Home = "Home",
}

export type RootStackParamList = {
  OnBoarding: undefined;
  AuthPhone: undefined;
  AuthPhoneCode: {phoneNumber: string; countryCode: string};
  Language: undefined;
  Permission: undefined;
  Home: undefined;
};
