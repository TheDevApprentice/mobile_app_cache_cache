import { Location } from "../../utils/Types/localisation";
import { ProductInCart } from "../../utils/Types/product";
import { Friend, User } from "../../utils/Types/user";
import { Badge } from "../../utils/Types/Badge/badge";
import { Transactions } from "../../utils/Types/transaction";

export type GlobalContextProviderType = {
	auth: any; 
	userData: User;
	setUserData: any;
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
	localStorage: Storage
	name: string;
	isConnected: boolean;
	type: string;
	avatar: string;
	transactions: Transactions[];
	badges: Badge[];
	cart: ProductInCart[];
	location: Location;
	friends: Friend[]; 
	messages: any; 
  };
  
 