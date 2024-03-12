// In App.js in a new project

import * as React from "react";
import {NavigationContainer, useNavigation} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import OnBoarding from "./src/screens/OnBoarding/OnBoarding.tsx";
import AuthPhone from "./src/screens/AuthPhone/AuthPhone.tsx";
import AuthPhoneCode from "./src/screens/AuthPhoneCode/AuthPhoneCode.tsx";
import {HeaderBackButton} from "@react-navigation/elements";
import {Text, View} from "react-native";
import colors from "./src/styles/color.ts";

export enum Screens {
  OnBoarding = "OnBoarding",
  AuthPhone = "AuthPhone",
  AuthPhoneCode = "AuthPhoneCode",
}

export type RootStackParamList = {
  OnBoarding: undefined;
  AuthPhone: undefined;
  AuthPhoneCode: {totalPhoneNumber: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const CustomBackButton = () => {
  const navigation = useNavigation();
  return <HeaderBackButton onPress={() => navigation.goBack()} />;
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
            headerBackTitle: "이전",
            headerLeft: props => <CustomBackButton />,
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
                    color: colors.fontLightGray,
                    fontSize: 16,
                    fontWeight: "700",
                  }}>
                  1/3
                </Text>
              </View>
            ),
            headerLeft: props => <CustomBackButton />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
