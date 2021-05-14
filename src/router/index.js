import Vue from 'vue'
import VueRouter from 'vue-router'

// Routes
import Home from '../views/Home/Home.vue'
import Submit from '../views/Submit/Submit.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/submit',
    name: 'Submit',
    component: Submit,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
