import * as React from "react";
import {useEffect, useState} from "react";
import AuthNavigation from "./src/navigations/AuthNavigation.tsx";
import actions from "./src/redux/actions";
import {useAppSelector} from "./src/redux/hooks";
import HomeNavigation from "./src/navigations/HomeNavigation.tsx";
import SignNavigation from "./src/navigations/SignNavigation.tsx";
import PermissionNavigation from "./src/navigations/PermissionNavigation.tsx";

const App: React.FC = () => {
  const account = useAppSelector(state => state.account);
  const device = useAppSelector(state => state.permission);

  useEffect(() => {
    (async () => {
      const {payload: token} = await actions.account.getAccessToken();

      if (token) {
        await actions.account.saveAccessToken(token);
        await actions.account.isSignIn(token);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await actions.permission.updatePermissionStatus();
    })();
  }, [account.isSignIn]);

  const renderNavigation = () => {
    if (account.token === "") {
      return <AuthNavigation />;
    }
    if (!account.isSignIn) {
      return <SignNavigation />;
    }
    if (!device.permission) {
      return <PermissionNavigation />;
    }

    return <HomeNavigation />;
  };

  return renderNavigation();
};

export default App;
