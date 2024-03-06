// In App.js in a new project

import * as React from "react";
import {View, Text} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import OnBoarding from "./src/screens/OnBoarding/OnBoarding.tsx";
import AuthPhone from "./src/screens/AuthPhone/AuthPhone.tsx";
import {useNavigation} from "@react-navigation/native";

export enum Screens {
  OnBoarding = "OnBoarding",
  AuthPhone = "AuthPhone",
}

export type RootStackParamList = {
  OnBoarding: undefined;
  AuthPhone: {
    id: number;
    title: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FunctionComponent = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OnBoarding">
        <Stack.Screen
          name={Screens.OnBoarding}
          component={OnBoarding}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Screens.AuthPhone}
          component={AuthPhone}
          options={{
            headerTitle: " ",
            headerBackTitle: "이전",
            headerShadowVisible: false, // applied here
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
