import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDnVfMWEnDy7xbpWneNJS1lMcpWX5cJKOs",
    authDomain: "textable-4be18.firebaseapp.com",
    projectId: "textable-4be18",
    storageBucket: "textable-4be18.appspot.com",
    messagingSenderId: "802916814412",
    appId: "1:802916814412:web:5cd4b6d194f0b8e1f52ee9",
    measurementId: "G-XYDGNRCN5N"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);