import Vue from 'vue'
import VueRouter from 'vue-router'

// Routes
import Home from '../views/Home/Home.vue'
import Usuaris from '../views/Usuaris.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/usuaris',
    name: 'Usuaris',
    component: Usuaris,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
