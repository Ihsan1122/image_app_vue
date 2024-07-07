import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Entries from '../views/Entries.vue'
import Admin from '../views/Admin.vue'
import store from '../store'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/entries', name: 'Entries', component: Entries, meta: { requiresAuth: true, role: 'user' } },
  { path: '/admin', name: 'Admin', component: Admin, meta: { requiresAuth: true, role: 'admin' } }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.state.auth.isAuthenticated || localStorage.getItem('isAuthenticated')
  const userRole = store.state.auth.user.role || localStorage.getItem('userRole')

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' })
  } else if (to.meta.requiresAuth && to.meta.role !== userRole) {
    next({ name: 'Home' })
  } else {
    next()
  }
})

export default router
