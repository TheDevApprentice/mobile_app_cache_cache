import React, { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, User as FirebaseUser, signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGlobalContext } from "../GlobalContextProvider";
import { getFirestore, doc, getDoc, collection, setDoc } from "firebase/firestore";
import { User } from "../../utils/Types/user";
import { AuthContextProps } from "../Types/Auth/authContextProps";

const AuthContext = createContext<Partial<AuthContextProps>>({});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setUserData, userData } = useGlobalContext();

  const auth = getAuth();
  const [user, setUser] = useState<User>();
 
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  useEffect(() => {
    checkLogin();
  }, []);

  async function checkLogin() {
    onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const { email, uid } = firebaseUser;
        console.log("User is signed in:", email, uid);
        const firestore = getFirestore();

        if(email){
          const userDocRef = doc(firestore, "users", uid);
          const userDocSnapshot = await getDoc(userDocRef);

          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            
            const updatedUserData: User = {
              ...userData,
              isConnected: true,
              email: userData.email,
              uid: uid,
              name: userData.firstName + " " + userData.lastName,
              userType: userData.type,
              avatar: userData.avatar,
              transactions: userData.transactions,
              badges: userData.badges,
              cart: [],
              location: userData.location,
              messages: userData.messages,
              friends: userData.friends
            };
            console.log(updatedUserData)
            setUser(updatedUserData);
            setUserData(updatedUserData);
          } else {
            console.log("User document does not exist in Firestore");
          }
        }
      } else {
        const updatedUserData: User = {
          ...userData,
          isConnected: false,
          email: '',
          uid: '0',
          name: "",
          userType: "",
          avatar: "",
          transactions: [],
          badges: []
        };
        setUser(updatedUserData);
        console.log("User is not signed in");
      }
    });
  }

  useEffect(() => {
    if (user !== undefined) {
      AsyncStorage.setItem('userData', JSON.stringify(user))
        .catch(error => console.error('Error saving user data:', error));
    }
  }, [user]);

  async function login() {
    setLoading(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError("Password must contain at least 8 characters, including one letter, one number, and one special character.");
      setLoading(false);
      return;
    }

    // Authentification avec l'email et le mot de passe
    await signInWithEmailAndPassword(auth, email, password).catch(function (
      error
    ) {
      var errorCode = error.code;
      var errorMessage = error.message;

      setLoading(false);
    });
  }
  
  return (
    <AuthContext.Provider
      value={{
        login, 
        user,
        auth, 
        email, 
        password, 
        passwordError, 
        loading, 
        emailError, 
        setEmail, 
        setEmailError, 
        setLoading, 
        setPassword, 
        setPasswordError, 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };