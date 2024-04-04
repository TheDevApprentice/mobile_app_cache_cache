import { ProductInCart } from "../product";

export type CartDataContextType = {
  cart: ProductInCart[]; 
  cartList: ProductInCart[]; 
  
  handleQuantityChange: any; 
  handleRemoveProduct: any; 
  getTotalPrice: any; 
  handleAddProductToCart: any; 
};
 