// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAHVnVhjMpSpDM5tqpCZd8-BBG5GnMu_wU",
    authDomain: "proiect2-fc0a6.firebaseapp.com",
    projectId: "proiect2-fc0a6",
    storageBucket: "proiect2-fc0a6.appspot.com",
    messagingSenderId: "334824437222",
    appId: "1:334824437222:web:57be8fddaa8b019dadd227",
    measurementId: "G-CDWFVVFKL8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);