import { createRouter, createWebHistory } from 'vue-router';
import { getAuth } from "firebase/auth";
const routes = [
  { 
    path: "/welcome",
    name: "Welcome",
    component: () => import('../views/Welcome/Welcome'), 
    meta: {
      auth: false
    }
  },
  { 
    path: "/registration", 
    name: "registration", 
    component: () => import('../views/Registration/Registration'), 
    meta: {
      auth: false
    }
  },
  { 
    path: "/signIn", 
    name: "SignIn", 
    component: () => import('../views/Auth/Auth'), 
    meta: {
      auth: false
    }
  },
  { 
    path: "/",
    name: "Home",
    component: () => import('../views/Home/Home'), 
    meta: {
      auth: true
    }
  },
  {
    path: '/recipe/:id', 
    name: 'recipe',
    component: () => import('../views/Recipe/Recipe'),
    meta: {
      auth: true
    }
  },
  { 
    path: "/categories",
    name: "Categories",
    component: () => import('../views/Categories/Categories'), 
    meta: {
      auth: true
    }
  },
  { 
    path: "/search",
    name: "Search",
    component: () => import('../views/Search/Search'), 
    meta: {
      auth: true
    }
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, _, next) => {
  const currentUser = getAuth().currentUser;
  const isAuth = to.matched.some((record) => record.meta.auth);

  if(isAuth && !currentUser) {
    next('signIn');
  }
  else if (!isAuth && currentUser) {
    next('/');
  }
  else {
    next();
  }
})


export default router
