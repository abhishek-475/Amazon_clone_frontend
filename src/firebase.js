import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyBgPrS4eGqoFUujkUGB_-8SXQOL9qRCZ5A",
  authDomain: "clone-caea2.firebaseapp.com",
  projectId: "clone-caea2",
  storageBucket: "clone-caea2.firebasestorage.app",
  messagingSenderId: "924342453823",
  appId: "1:924342453823:web:b093fbd014473545a69a8a",
  measurementId: "G-0HLCCVPF9N"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider()