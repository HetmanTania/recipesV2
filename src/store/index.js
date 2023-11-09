import { createStore } from 'vuex';
import auth from './auth';
import recipes from './recipes';

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth, 
    recipes
  }
})
