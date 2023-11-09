import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { auth } from "./firebase/firebase";


// import { onAuthStateChanged } from 'firebase/auth';
// import { initializeApp } from "firebase/app";



// initializeApp({
//     apiKey: "AIzaSyCCWyeKePbYetcKEm6O3Mgw93qHPTeMMYo",
//     authDomain: "recipes-89aac.firebaseapp.com",
//     projectId: "recipes-89aac",
//     storageBucket: "recipes-89aac.appspot.com",
//     messagingSenderId: "380153764364",
//     appId: "1:380153764364:web:9ade9d54f6634f928dec29",
//     measurementId: "G-YBJB0RTKR0",
//     databaseURL: "https://recipes-89aac-default-rtdb.firebaseio.com",
// });

let app = null;

auth.onAuthStateChanged((authInfo) => {
    if(!app) {
        app = createApp(App).use(store).use(router).mount('#app');
    }
    store.dispatch('setAuthInfo', authInfo);
    console.log('onAuthStateChanged');
})


console.log('createApp(App)');

