// In App.js in a new project

import * as React from "react";
import {NavigationContainer, useNavigation} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import OnBoarding from "./src/screens/OnBoarding/OnBoarding.tsx";
import AuthPhone from "./src/screens/AuthPhone/AuthPhone.tsx";
import AuthPhoneCode from "./src/screens/AuthPhoneCode/AuthPhoneCode.tsx";
import {
  HeaderBackButton,
  HeaderBackButtonProps,
} from "@react-navigation/elements";
import {Text, View} from "react-native";
import colors from "./src/styles/color.ts";
import Language from "./src/screens/Language/Language.tsx";
import Toast from "react-native-toast-message";

export enum Screens {
  OnBoarding = "OnBoarding",
  AuthPhone = "AuthPhone",
  AuthPhoneCode = "AuthPhoneCode",
  Language = "Language",
}

export type RootStackParamList = {
  OnBoarding: undefined;
  AuthPhone: undefined;
  AuthPhoneCode: {phoneNumber: string; countryCode: string};
  Language: {phoneNumber: string; countryCode: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const CustomBackButton: React.FC<HeaderBackButtonProps> = props => {
  const navigation = useNavigation();
  return <HeaderBackButton onPress={() => navigation.goBack()} label="이전" />;
};

const App: React.FunctionComponent = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Screens.OnBoarding}>
        <Stack.Screen
          name={Screens.OnBoarding}
          component={OnBoarding}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Screens.AuthPhone}
          component={AuthPhone}
          options={{
            headerShadowVisible: false,
            headerTitle: () => (
              <View>
                <Text
                  style={{
                    color: colors.fontLightGray,
                    fontSize: 16,
                    fontWeight: "700",
                  }}>
                  1/3
                </Text>
              </View>
            ),
            headerTitleAlign: "center",
            headerBackVisible: false,
            headerLeft: props => <CustomBackButton {...props} />,
          }}
        />
        <Stack.Screen
          name={Screens.AuthPhoneCode}
          component={AuthPhoneCode}
          options={{
            headerShadowVisible: false,
            headerTitle: () => (
              <View>
                <Text
                  style={{
                    textAlign: "center",
                    color: colors.fontLightGray,
                    fontSize: 16,
                    fontWeight: "700",
                  }}>
                  1/3
                </Text>
              </View>
            ),
            headerLeft: props => <CustomBackButton {...props} />,
            headerBackVisible: false,
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name={Screens.Language}
          component={Language}
          options={{
            headerShadowVisible: false,
            headerTitle: () => (
              <View>
                <Text
                  style={{
                    textAlign: "center",
                    color: colors.fontLightGray,
                    fontSize: 16,
                    fontWeight: "700",
                  }}>
                  2/3
                </Text>
              </View>
            ),
            headerBackVisible: false,
            headerTitleAlign: "center",
            gestureEnabled: false,
          }}
        />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
};

export default App;
