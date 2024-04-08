import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProductInCart } from "../../../../utils/Types/product";
import { MainStackParamList } from "../../../../utils/Types/navigation";

export type BillProps = {
    setModalVisible: (visible: boolean) => void
    items: ProductInCart[];
    taxRate: number;
    navigation: NativeStackNavigationProp<MainStackParamList, "MainTabs", undefined>
  }
  