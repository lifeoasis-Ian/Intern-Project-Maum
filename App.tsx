import * as React from "react";
import {useEffect, useState} from "react";
import AuthNavigation from "./src/navigations/AuthNavigation.tsx";
import actions from "./src/redux/actions";
import {useAppDispatch, useAppSelector} from "./src/redux/hooks";
import HomeNavigation from "./src/navigations/HomeNavigation.tsx";
import SignNavigation from "./src/navigations/SignNavigation.tsx";
import PermissionNavigation from "./src/navigations/PermissionNavigation.tsx";
import {Provider} from "react-redux";
import {store} from "./src/redux/store";
import Toast from "react-native-toast-message";

const App: React.FC = () => {
  const account = useAppSelector(state => state.account);

  useEffect(() => {
    (async () => {
      const {payload: token} = await actions.account.getAccessToken();
      if (token) {
        await actions.account.isSignIn(token);
        await actions.account.checkPermission();
      }
    })();
  }, []);

  const renderNavigation = () => {
    if (account.token === "") {
      return <AuthNavigation />;
    }
    if (!account.isSignIn) {
      return <SignNavigation />;
    }
    if (!account.permission) {
      return <PermissionNavigation />;
    }

    return <HomeNavigation />;
  };

  return renderNavigation();
};

export default App;
