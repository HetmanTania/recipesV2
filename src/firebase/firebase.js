import 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";


let app = null;
if(!app) {
  app = initializeApp({
    apiKey: "AIzaSyCCWyeKePbYetcKEm6O3Mgw93qHPTeMMYo",
    authDomain: "recipes-89aac.firebaseapp.com",
    projectId: "recipes-89aac",
    storageBucket: "recipes-89aac.appspot.com",
    messagingSenderId: "380153764364",
    appId: "1:380153764364:web:9ade9d54f6634f928dec29",
    measurementId: "G-YBJB0RTKR0",
    databaseURL: "https://recipes-89aac-default-rtdb.firebaseio.com",
  });
}

let auth = null;
if(!auth) { //// ???????????????????????
  auth = getAuth();
}

let database = null;
if(!database) { //// ???????????????????????
  database = getDatabase(app);
}

let storage = null 
if(!storage) {
  storage = getStorage();
}


export  { database, auth, storage};