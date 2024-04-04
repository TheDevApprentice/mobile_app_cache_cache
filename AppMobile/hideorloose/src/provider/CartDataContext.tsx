// CartContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartDataContextType } from '../types/Contexts/cartDataContext';
import { ProductInCart } from '../types/product';
import { useGlobalContext } from './GlobalContextProvider';

const CartContext = createContext<CartDataContextType | undefined>(undefined);

export const CartProvider : React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { cart } = useGlobalContext();
    const [cartList, setCartList] = useState<ProductInCart[]>(cart || []);
    
    useEffect(() => {
        if (cart !== undefined) {
        setCartList(cart);
        }
    }, [cart]);
    
    const handleQuantityChange = (productId: number, newQuantity: number) => {
        setCartList((prevCart) =>
            prevCart.map((product) =>
                product.id === productId ? { ...product, quantity: newQuantity, total: newQuantity * product.unit_price } : product
            )
        );
    };
  
    const handleRemoveProduct = (productId: number) => {
        setCartList((prevCart) => prevCart.filter((product) => product.id !== productId));
    };
  
    const getTotalPrice = () => {
        return cartList.reduce((total, item) => total + item.total, 0);
    };
  
    const handleAddProductToCart = (product: ProductInCart) => {
        const existingProductIndex = cartList.findIndex(item => item.title === product.title);
        // console.log(existingProductIndex)
        if (existingProductIndex !== -1) {
            const updatedCart = [...cartList];
            updatedCart[existingProductIndex].quantity += product.quantity;
            updatedCart[existingProductIndex].total += product.quantity * product.unit_price;
            setCartList(updatedCart);
        } else {
            const newId = cartList.length > 0 ? cartList[cartList.length - 1].id + 1 : 1 ;
            const newProduct = { ...product, id: newId };
            setCartList((prevCart) => [...prevCart, newProduct]);
        }
    };

  return (
    <CartContext.Provider
      value={{ 
        cart: cartList,
        cartList, 
        handleQuantityChange, 
        handleRemoveProduct, 
        getTotalPrice, 
        handleAddProductToCart 
    }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useGlobalContext must be used within a GlobalContextProvider');
    }
    return context;
};
