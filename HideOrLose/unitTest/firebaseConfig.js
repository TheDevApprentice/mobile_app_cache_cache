import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBPZHqN-259ZBkxAkxg9SXOKsi-MrImgjA",
    authDomain: "hideorloose.firebaseapp.com",
    databaseURL: "https://hideorloose-default-rtdb.firebaseio.com",
    projectId: "hideorloose",
    storageBucket: "hideorloose.appspot.com",
    messagingSenderId: "820410943037",
    appId: "1:820410943037:web:865b9aaab7813e364e4c54",
    measurementId: "G-ZZY4R181SN"
  };

firebase.initializeApp(firebaseConfig);

export {firebase};