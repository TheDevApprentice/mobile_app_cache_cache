import { Auth } from "firebase/auth";
import { User } from "../../../utils/Types/user";

export type AuthContextProps = {
  login: any; 

  user: User | null;
  auth: Auth

  email: any; 
  password: any; 
  loading: any; 
  emailError: any; 
  passwordError: any; 
  setEmail: any; 
  setPassword: any; 
  setLoading: any; 
  setEmailError: any; 
  setPasswordError: any; 
};

export type AuthProps = {
  children: React.ReactNode;
}
  