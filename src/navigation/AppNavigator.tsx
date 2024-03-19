import React, {useEffect, useState} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {
  NavigationContainer,
  useNavigation,
  useNavigationContainerRef,
} from "@react-navigation/native";
import OnBoarding from "../screens/OnBoarding/OnBoarding";
import AuthPhone from "../screens/AuthPhone/AuthPhone";
import AuthPhoneCode from "../screens/AuthPhoneCode/AuthPhoneCode";
import Language from "../screens/Language/Language";
import Permission from "../screens/Permission/Permission";
import {NavigationProp} from "@react-navigation/core";
import {RootStackParamList} from "./navigationTypes";
import {
  HeaderBackButton,
  HeaderBackButtonProps,
} from "@react-navigation/elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Text, View} from "react-native";
import colors from "../styles/color.ts";
import Home from "../screens/Home/Home.tsx";
import {checkAndRequestPermissions} from "../services/permissionService.ts";
import {useAppDispatch} from "../app/hooks.ts";
import {setAccessToken} from "../features/accessToken/tokenSlice.ts";
import Loading from "../screens/Loading/Loading.tsx";
import {NativeStackNavigatorProps} from "react-native-screens/lib/typescript/native-stack/types";

const Stack = createNativeStackNavigator<RootStackParamList>();

const CustomBackButton: React.FC<HeaderBackButtonProps> = props => {
  const navigation = useNavigation();
  return <HeaderBackButton onPress={() => navigation.goBack()} label="이전" />;
};

const CustomBackButtonInPermission: React.FC<HeaderBackButtonProps> = props => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <HeaderBackButton
      onPress={() => navigation.navigate("Language")}
      label="이전"
    />
  );
};

const AppNavigator: React.FC = () => {
  const navigationRef = useNavigationContainerRef<NativeStackNavigatorProps>();
  const dispatch = useAppDispatch();
  const [initialRoute, setInitialRoute] = useState<
    keyof RootStackParamList | undefined
  >();

  useEffect(() => {
    if (!initialRoute) {
      (async () => {
        await initializeApp();
      })();
    }
  }, [initialRoute]);

  useEffect(() => {
    if (initialRoute) {
      if (navigationRef.isReady()) {
        navigationRef.navigate(initialRoute);
      } else {
        setInitialRoute(undefined);
      }
    }
  }, [initialRoute]);

  const initializeApp = async () => {
    const isPermissionGranted = await checkAndRequestPermissions();
    const token = await AsyncStorage.getItem("token");
    dispatch(setAccessToken(token));

    if (token) {
      setInitialRoute(isPermissionGranted ? "Home" : "Permission");
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
          headerLeft: props => <CustomBackButton {...props} />,
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
            headerTitleStyle: {color: colors.fontLightGray},
            headerTitle: "1/3",
          }}
        />
        <Stack.Screen
          name={"AuthPhoneCode"}
          component={AuthPhoneCode}
          options={{
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
          }}
        />
        <Stack.Screen
          name={"Language"}
          component={Language}
          options={{
            gestureEnabled: false,
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
          }}
        />
        <Stack.Screen
          name={"Permission"}
          component={Permission}
          options={{
            headerTitle: () => (
              <View>
                <Text
                  style={{
                    textAlign: "center",
                    color: colors.fontLightGray,
                    fontSize: 16,
                    fontWeight: "700",
                  }}>
                  3/3
                </Text>
              </View>
            ),
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
