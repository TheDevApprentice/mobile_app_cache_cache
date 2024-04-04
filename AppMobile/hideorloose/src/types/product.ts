export type Product = {
  id: number;
  farmId: number;
  category: string; 
  title: string;
  thumbnail: string;
  description: string;
  unit_price: number;
  total: number;
  inventory: number;
};

export type ProductInCart = {
  id: number;
  farmId: number;
  category: string; 
  title: string;
  thumbnail: string;
  description: string;
  unit_price: number;
  quantity: number;
  total: number;
  inventory: number;
};
  