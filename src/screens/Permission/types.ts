import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../../navigations/navigationTypes.ts";

export type PermissionScreenNavigationProps = StackNavigationProp<
  RootStackParamList,
  "Permission"
>;

export interface PermissionScreenProps {
  navigation: PermissionScreenNavigationProps;
}

export interface PermissionParamsProps {
  handleSetPermissions: () => void;
}
