import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import {RootStackParamList} from "./navigationTypes";
import colors from "../styles/color.ts";
import Home from "../screens/Home/Home.Container.tsx";

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={"Home"}
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
          name={"Home"}
          component={Home}
          options={{
            gestureEnabled: false,
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default HomeNavigation;
