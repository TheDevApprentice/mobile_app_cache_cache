import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Friend } from "../../utils/Types/user";

export type MessageDataContextType = {
  message: string,
  setInputFieldMessage: any,
  selectedUser: Friend | null,
  sendMessage: any,
  handleFriendSelect: any,
  getSelectedFriendData: any,
  }