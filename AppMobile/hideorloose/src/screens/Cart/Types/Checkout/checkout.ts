import { Product, ProductInCart } from "../../../../utils/Types/product";
import { MainStackParamList } from "../../../../utils/Types/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type CheckoutComponentProps = {
  navigation: NativeStackNavigationProp<MainStackParamList, "MainTabs", undefined>
    cartList: ProductInCart[]; 
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    selectedProduct: Product | null; 
    selectedQuantity: number;
    setSelectedQuantity: (quantity: number) => void;
    handleConfirmQuantity: () => void;
    setTotal:(quantity: number) => void;
    total: number;
    taxRate: number; 
  }