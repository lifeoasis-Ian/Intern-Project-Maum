import React from "react";
import {service} from "../../domains";
import actions from "../../redux/actions";
import {useAppSelector} from "../../redux/hooks";
import {PermissionScreenProps} from "./types.ts";
import PermissionView from "./Permission.View.tsx";

const PermissionContainer: React.FC<PermissionScreenProps> = ({navigation}) => {
  const device = useAppSelector(state => state.permission);

  async function handleSetPermissions() {
    await actions.permission.updatePermissionStatus();

    if (!device.permission) {
      await service.permission.showLocationAndMicPermissionAlert();
    }
  }

  return <PermissionView handleSetPermissions={handleSetPermissions} />;
};

export default PermissionContainer;
