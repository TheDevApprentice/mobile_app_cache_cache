import { MainStackParamList } from "../../../utils/Types/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type CartComponentProps = {
    navigation: NativeStackNavigationProp<MainStackParamList, "MainTabs", undefined>
  }