import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Profil from '@/views/Profil.vue';
import NotFound from '@/views/NotFound.vue';
import store from '@/store/index';

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

router.beforeEach(async (to, from) => {
  from;
  // verify user was authenticated and have his token
  if (store.state.token == -1 && localStorage.getItem('token')) {
    // reload account info after page reload
    await store.dispatch('relog');
  } else if (
    // make sure the user is authenticated
    !localStorage.getItem('token') &&
    // ❗️ Avoid an infinite redirect
    to.name !== 'Login'
  ) {
    return { name: 'Login' }
    // redirect the user to the login page
  }
})

router.afterEach((to, from) => {
  from;
  document.title = to.meta.title;
});

export default router;