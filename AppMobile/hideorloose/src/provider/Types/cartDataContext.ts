import { ProductInCart } from "../../utils/Types/product";

export type CartDataContextType = {
  cart: ProductInCart[]; 
  cartList: ProductInCart[]; 
  taxRate: any; 

  handleQuantityChange: any; 
  handleRemoveProduct: any; 
  getTotalPrice: any; 
  handleAddProductToCart: any; 
};
 