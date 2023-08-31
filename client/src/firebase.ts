import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCVh9LgLNYcROYSUC543ZRrkBZdpwXOoT4",
    authDomain: "tcyfinni.firebaseapp.com",
    projectId: "tcyfinni",
    storageBucket: "tcyfinni.appspot.com",
    messagingSenderId: "853336490360",
    appId: "1:853336490360:web:3dac8fb34a85e9a7d1488d",
    measurementId: "G-6DCHWRYCRT"
  };
  
  

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);