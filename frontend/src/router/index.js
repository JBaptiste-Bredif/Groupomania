import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Profil from '@/views/Profil.vue';
import NotFound from '@/views/NotFound.vue';

const routes = [
  {
    name: 'Home',
    path: '/',
    component: Home,
    meta: {
      title: 'Groupomania - Accueil'
    }
  },
  {
    name: 'Profil',
    path: '/profil',
    component: Profil,
    meta: {
      title: 'Groupomania - Profil'
    }
  },
  {
    name: 'Login',
    path: '/login',
    component: Login,
    meta: {
      title: 'Groupomania - Connexion'
    }
  },
  {
    name: 'Not Found',
    path: '/:pathMatch(.*)',
    component: NotFound,
    meta: {
      title: 'Groupomania - 404'
    }
  }
];

const router = new createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from) => {
//   console.log("🚀 ~ file: index.js ~ line 48 ~ router.beforeEach ~ to, from", to, from)
//   // Retourne sur login si local storage clean
//   // explicitly return false to cancel the navigation 
//   return false
// })

router.afterEach((to, from) => {
  console.log(to, from);
  document.title = to.meta.title;
});

export default router;