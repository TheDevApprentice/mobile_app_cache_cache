import { Location } from "./localisation";
import { ProductInCart } from "./product";
import { Badge } from "./Badge/badge";
import { Transactions } from "./transaction";

export type User = {
	uid: string;
	name: string;
	isConnected: boolean;
	email: string;
	userType: string;
	avatar: string;
	transactions: Transactions[];
	badges: Badge[];
	cart: ProductInCart[];
	location: Location;
	messages: UserMessage[];
	friends: Friend[]; 
  }

  export type Friend = {
	id: number;
	avatar: string;
	uid: string;
	username: string;
	messages: UserMessage[]; 
  }

  export type UserMessage = {
	id: number; 
	uid: string; 
	message: string 
  }