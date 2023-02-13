import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyC4uoyn31NToON3AjpyagIASpEufJiUekc",
    authDomain: "get-your-car-c0800.firebaseapp.com",
    projectId: "get-your-car-c0800",
    storageBucket: "get-your-car-c0800.appspot.com",
    messagingSenderId: "269029687573",
    appId: "1:269029687573:web:4dd9431c716ab12df3e91c"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { auth, db, storage }