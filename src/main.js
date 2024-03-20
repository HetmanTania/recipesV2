import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { auth } from "./firebase/firebase";

let app = null;

auth.onAuthStateChanged(async (authInfo) => {
    if(!app) {
        app = createApp(App).use(store).use(router).mount('#app');
    }
    await store.dispatch('setAuthInfo', authInfo);
})


