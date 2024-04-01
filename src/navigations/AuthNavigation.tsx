import React, {useEffect, useState} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import OnBoarding from "../screens/OnBoarding/OnBoarding.Container.tsx";
import AuthPhone from "../screens/AuthPhone/AuthPhone.Container.tsx";
import AuthCode from "../screens/AuthPhoneCode/AuthCode.Container.tsx";
import {RootStackParamList} from "./navigationTypes";
import colors from "../styles/color.ts";
import {
  CustomBackButton,
  CustomBackButtonInPermission,
} from "../components/CustomBackButtons.tsx";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={"OnBoarding"}
        screenOptions={{
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerBackVisible: false,
          headerTitleStyle: {
            color: colors.fontLightGray,
            fontSize: 16,
            fontWeight: "700",
          },
        }}>
        <Stack.Screen
          name={"OnBoarding"}
          component={OnBoarding}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={"AuthPhone"}
          component={AuthPhone}
          options={{
            headerTitle: "1 / 3",
            headerLeft: props => <CustomBackButton {...props} />,
          }}
        />
        <Stack.Screen
          name={"AuthPhoneCode"}
          component={AuthCode}
          options={{
            headerLeft: props => <CustomBackButton {...props} />,
            headerTitle: "1 / 3",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigator;
