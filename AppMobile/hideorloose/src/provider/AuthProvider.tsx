import React, { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGlobalContext } from "./GlobalContextProvider";
import { getFirestore, doc, getDoc, collection } from "firebase/firestore";
import { User } from "../types/user";

type ContextProps = {
  user: User | null;
};

const AuthContext = createContext<Partial<ContextProps>>({});

interface Props {
  children: React.ReactNode;
}

const AuthProvider = (props: Props) => {
  const { setUserData, userData } = useGlobalContext();
  const auth = getAuth();
  const [user, setUser] = useState<User>();

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
            // console.log("User data from Firestore:", userData);
            
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
              // cart: createProducts(),
              cart: [],
              location: userData.location
            };
            
            setUser(updatedUserData);
            // console.log("User before global", updatedUserData)
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
          uid: '',
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
    AsyncStorage.setItem('userData', JSON.stringify(user));
  }, [user]);

  // function createProducts() {
  //   return [
  //     {
  //       id: 1,
  //       farmId: 1, 
  //       title: 'Apple',
  //       thumbnail: 'https://fruiteriepotager.com/wp-content/uploads/2020/07/74134-1-Pomme-delicieuse-red.jpg',
  //       description: 'This is an apple',
  //       unit_price: 100,
  //       quantity: 2,
  //       total: 200,
  //       inventory: 200,
  //     },
  //     {
  //       id: 2,
  //       farmId: 2, 
  //       title: 'Potatoes',
  //       thumbnail: 'https://mapetiteassiette.com/wp-content/uploads/2020/11/pomme-de-terre333-e1605184894919.jpg',
  //       description: 'This is a potatoes',
  //       unit_price: 450,
  //       quantity: 1,
  //       total: 450,
  //       inventory: 200,
  //     },
  //     {
  //       id: 3,
  //       farmId: 2, 
  //       title: 'Leek',
  //       thumbnail: 'https://cdn.pratico-pratiques.com/app/uploads/sites/2/2021/10/06102335/quoi-faire-avec-les-poireaux01-500x500.jpg',
  //       description: 'This is a leek',
  //       unit_price: 100,
  //       quantity: 2,
  //       total: 200,
  //       inventory: 200,
  //     },
  //     {
  //       id: 4,
  //       farmId: 2, 
  //       title: 'Cucumber',
  //       thumbnail: 'https://iod.keplrstatic.com/api/c_fill,dpr_auto,g_north,f_auto,q_70,w_1100/mon_marche/8379_CONCOMBRE.jpg',
  //       description: 'This is a cucumber',
  //       unit_price: 450,
  //       quantity: 1,
  //       total: 450,
  //       inventory: 200,
  //     },
  //     {
  //       id: 5,
  //       farmId: 2, 
  //       title: 'Bell pepper',
  //       thumbnail: 'https://www.jaimefruitsetlegumes.ca/wp-content/uploads/2019/09/poivrons-Hans-Braxmeier-from-Pixabay-e1568384871652-700x700.jpg',
  //       description: 'This is a bell pepper',
  //       unit_price: 100,
  //       quantity: 2,
  //       total: 200,
  //       inventory: 200,
  //     },
  //     {
  //       id: 6,
  //       farmId: 2, 
  //       title: 'Cabbage',
  //       thumbnail: 'https://i0.wp.com/www.jardinsdupieddeceleri.ca/wp-content/uploads/2023/03/Chou-vert-1-scaled-e1678461027740.jpg?fit=1337%2C1330&ssl=1',
  //       description: 'This is a cabbage',
  //       unit_price: 450,
  //       quantity: 1,
  //       total: 450,
  //       inventory: 200,
  //     },
  //   ];
  // }

  return (
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
