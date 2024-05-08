import { createStore } from 'vuex';
import auth from './auth';
import recipes from './recipes';
import products from './products';

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth, 
    recipes,
    products,

  }
})
