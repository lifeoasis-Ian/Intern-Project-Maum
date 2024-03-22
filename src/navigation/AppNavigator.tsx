import React, {useEffect, useState} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import OnBoarding from "../screens/OnBoarding/OnBoarding";
import AuthPhone from "../screens/AuthPhone/AuthPhone";
import AuthPhoneCode from "../screens/AuthPhoneCode/AuthPhoneCode";
import Language from "../screens/Language/Language";
import Permission from "../screens/Permission/Permission";
import {RootStackParamList} from "./navigationTypes";
import colors from "../styles/color.ts";
import Home from "../screens/Home/Home.tsx";
import {useAppDispatch} from "../app/hooks.ts";
import {setAccessToken} from "../features/accessToken/tokenSlice.ts";
import Loading from "../screens/Loading/Loading.tsx";
import {NativeStackNavigatorProps} from "react-native-screens/lib/typescript/native-stack/types";
import {
  CustomBackButton,
  CustomBackButtonInPermission,
} from "../components/CustomBackButtons.tsx";
import {getUserDataService, permissionService} from "../services";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const [initialRoute, setInitialRoute] = useState<
    keyof RootStackParamList | undefined
  >();

  const navigationRef = useNavigationContainerRef<NativeStackNavigatorProps>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (initialRoute) {
      if (navigationRef.isReady()) {
        navigationRef.navigate(initialRoute);
      } else {
        setInitialRoute(undefined);
      }
    } else {
      initializeApp();
    }
  }, [initialRoute]);

  const initializeApp = async () => {
    const isPermissionGranted =
      await permissionService.checkAndRequestLocationAndMicPermissions();
    const token = await getUserDataService.getToken();
    dispatch(setAccessToken(token));

    if (token) {
      const savedLanguage = await getUserDataService.getUserLanguage(token);
      if (savedLanguage.data.language !== "" && isPermissionGranted) {
        setInitialRoute("Home");
      } else if (savedLanguage.data.language !== "" && !isPermissionGranted) {
        setInitialRoute("Permission");
      } else {
        setInitialRoute("Language");
      }
      return;
    }
    setInitialRoute("OnBoarding");
  };

  if (!initialRoute) {
    return (
      <NavigationContainer ref={navigationRef}>
        <Loading />
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={initialRoute}
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
          component={AuthPhoneCode}
          options={{
            headerLeft: props => <CustomBackButton {...props} />,
            headerTitle: "1 / 3",
          }}
        />
        <Stack.Screen
          name={"Language"}
          component={Language}
          options={{
            gestureEnabled: false,
            headerTitle: "2 / 3",
          }}
        />
        <Stack.Screen
          name={"Permission"}
          component={Permission}
          options={{
            headerLeft: props => <CustomBackButtonInPermission {...props} />,
            headerTitle: "3 / 3",
          }}
        />
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

export default AppNavigator;
