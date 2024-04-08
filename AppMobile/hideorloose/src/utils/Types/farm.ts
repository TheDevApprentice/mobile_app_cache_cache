import { Location } from "./localisation";
import { Product } from "./product";

export type Farm = {
    id: number;
    name: string;
    image: string;
    price: string;
    address: string;
    squareMeters: string;
    stars: string;
    reviews: string;
    products: Product[];
    location: Location;
  };