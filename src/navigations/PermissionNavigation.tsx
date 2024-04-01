import React, {useEffect, useState} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import Permission from "../screens/Permission/Permission";
import {RootStackParamList} from "./navigationTypes";
import colors from "../styles/color.ts";

const Stack = createNativeStackNavigator<RootStackParamList>();

const PermissionNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={"Permission"}
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
          name={"Permission"}
          component={Permission}
          options={{
            gestureEnabled: false,
            headerTitle: "3 / 3",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default PermissionNavigation;
