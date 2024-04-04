import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import Language from "../screens/Language/Lanugage.Container.tsx";
import {RootStackParamList} from "./navigationTypes";
import colors from "../styles/color.ts";

const Stack = createNativeStackNavigator<RootStackParamList>();

const SignNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={"Language"}
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
          name={"Language"}
          component={Language}
          options={{
            gestureEnabled: false,
            headerTitle: "2 / 3",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default SignNavigation;
