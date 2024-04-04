import { Location } from "../localisation";
import { ProductInCart } from "../product";
import { User } from "../user";
import { Badge } from "../badge";
import { Transactions } from "../transaction";

export type GlobalContextProviderType = {
	userData: User
	response: any;
	action: string;
	token: string;
	uid: string;
	isUserConencted: string;
	userType: string;
	firstName: string;
	lastName: string;
	email: string;
	username: string;
	sendRequestSignIn: any;
	updateTokenUser: any;
	sendRequestSignUp: any;
	setUserData: any;
	localStorage: Storage
	name: string;
	isConnected: boolean;
	type: string;
	avatar: string;
	transactions: Transactions[];
	badges: Badge[];
	cart: ProductInCart[];
	location: Location;
  };
  
 