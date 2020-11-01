import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Activity from '../views/Activity.vue';
import Login from '../views/Login.vue';
import store from '@/store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/activity/:id',
    name: 'Activity',
    component: Activity,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const user = store.state.user;
    if (!Object.prototype.hasOwnProperty.call(user, 'username')) {
      next({
        name: 'Login'
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
