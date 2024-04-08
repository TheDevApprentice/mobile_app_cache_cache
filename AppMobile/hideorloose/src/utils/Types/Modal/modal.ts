import { Product } from "../product";
import { MainStackParamList } from "../navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type ModalComponentProps = {
    navigation: NativeStackNavigationProp<MainStackParamList, "MainTabs", undefined>
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    selectedProduct: Product | null; 
    selectedQuantity: number;
    setSelectedQuantity: (quantity: number) => void;
    handleConfirmQuantity: () => void;
    setTotal:(quantity: number) => void;
    total: number;
  }