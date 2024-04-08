import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../navigation";

export type ButtonProps = {
    OnPress: (visible: boolean) => void
    text: string;
    isDarkmode: boolean | undefined
    navigation: NativeStackNavigationProp<MainStackParamList, "MainTabs", undefined> | null; 
    styles: any; 
  }