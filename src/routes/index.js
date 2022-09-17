import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import Home from '/src/components/Home.vue'
import Login from '/src/components/Login.vue'
import Profile from '/src/components/Profile.vue'
import Create from '/src/components/Create.vue'
import Edit from '/src/components/Edit.vue'
import PageNotFound from '/src/components/PageNotFound.vue'

const routes = [
    {
        path: '/:pathMatch(.*)*',
        name: 'PageNotFound',
        component: PageNotFound
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: { 
          requiresAuth: true
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/create',
        name: 'Create',
        component: Create,
        meta: { 
          requiresAuth: true
        }
    },
    {
        path: '/edit/:id',
        name: 'Edit',
        component: Edit,
        meta: { 
          requiresAuth: true
        }
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (useAuthStore().isLoggedIn) {
      next()
      return
    }
    next('/login') 
  } else {
    next() 
  }
})

export default router
