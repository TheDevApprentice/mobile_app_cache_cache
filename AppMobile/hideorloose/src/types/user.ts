import { Location } from "./localisation";
import { ProductInCart } from "./product";
import { Badge } from "./badge";
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
  }