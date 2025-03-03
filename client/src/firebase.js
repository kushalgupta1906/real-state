// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-efcb7.firebaseapp.com",
  projectId: "real-estate-efcb7",
  storageBucket: "real-estate-efcb7.firebasestorage.app",
  messagingSenderId: "635723811268",
  appId: "1:635723811268:web:df23acaf2303d5926dbc91"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);