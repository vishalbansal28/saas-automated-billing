// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "YOUR FIREBASE API KEY",
//   authDomain: "YOUR FIREBASE AUTHDOMAIN",
//   projectId: "YOUR FIREBASE PROJECTID",
//   storageBucket: "YOUR FIREBASE STORAGE BUCKET",
//   messagingSenderId: "YOUR FIREBASE MESSAGESENDER ID",
//   appId: "YOUR FIREBASE APPID"
// };

const firebaseConfig = {
  apiKey: "AIzaSyClgF5sUrAUhBSY8_Yj_K_mfdNAi7-_sl0",
  authDomain: "auth-c3acf.firebaseapp.com",
  projectId: "auth-c3acf",
  storageBucket: "auth-c3acf.appspot.com",
  messagingSenderId: "578576417632",
  appId: "1:578576417632:web:84d0372f2c3c902111d405",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
