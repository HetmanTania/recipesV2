import { createRouter, createWebHistory } from 'vue-router';
import middleware from "@/router/middleware";
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
      auth: true,
      limitsOver: true,
    }
  },
  {
    path: '/recipe/:id', 
    name: 'recipe',
    component: () => import('../views/Recipe/Recipe'),
    meta: {
      auth: true,
      limitsOver: true,
    }
  },
  { 
    path: "/categories",
    name: "Categories",
    component: () => import('../views/Categories/Categories'), 
    meta: {
      auth: true,
      limitsOver: true,
    }
  },
  { 
    path: "/search",
    name: "Search",
    component: () => import('../views/Search/Search'), 
    meta: {
      auth: true,
      limitsOver: true,
    }
  },
  {
    path: "/505",
    name: "505",
    component: () => import('../views/Page505/Page505.vue'),
    meta: {
      auth: true
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(middleware)
export default router
