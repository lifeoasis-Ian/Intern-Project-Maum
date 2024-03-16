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
import {RootStackParamList, Screens} from "./navigationTypes";
import {
  HeaderBackButton,
  HeaderBackButtonProps,
} from "@react-navigation/elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Text, View} from "react-native";
import colors from "../styles/color.ts";
import Home from "../screens/Home/Home.tsx";
import {checkSetPermissions} from "../services/permissionService.ts";
import {useDispatch} from "react-redux";

const Stack = createNativeStackNavigator<RootStackParamList>();

const CustomBackButton: React.FC<HeaderBackButtonProps> = props => {
  const navigation = useNavigation();
  return <HeaderBackButton onPress={() => navigation.goBack()} label="이전" />;
};

const CustomBackButtonInPermission: React.FC<HeaderBackButtonProps> = props => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <HeaderBackButton
      onPress={() => navigation.navigate(Screens.Language)}
      label="이전"
    />
  );
};

const AppNavigator: React.FC = () => {
  const navigationRef = useNavigationContainerRef();
  const dispatch = useDispatch();
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    const initializeApp = async () => {
      const permissionChecked = await checkSetPermissions(dispatch);
      const token = await AsyncStorage.getItem("token");

      if (token) {
        if (permissionChecked) {
          setInitialRoute(Screens.Home);
        } else {
          setInitialRoute(Screens.Permission);
        }
      }
    };
    initializeApp();
  }, [dispatch]);

  useEffect(() => {
    if (initialRoute) {
      navigationRef.reset({
        index: 0,
        routes: [{name: initialRoute}],
      });
    }
  }, [initialRoute]);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="OnBoarding">
        <Stack.Screen
          name={Screens.OnBoarding}
          component={OnBoarding}
          options={{headerShown: false, gestureEnabled: false}}
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
        <Stack.Screen
          name={Screens.Permission}
          component={Permission}
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
                  3/3
                </Text>
              </View>
            ),
            headerBackVisible: false,
            headerTitleAlign: "center",
            headerLeft: props => <CustomBackButtonInPermission {...props} />,
          }}
        />
        <Stack.Screen
          name={Screens.Home}
          component={Home}
          options={{
            headerShadowVisible: false,
            headerTitle: " ",
            headerBackVisible: false,
            headerTitleAlign: "center",
            gestureEnabled: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
