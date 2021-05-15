import Vue from 'vue'
import VueRouter from 'vue-router'

// Routes
import Home from '../views/Home/Home.vue'
import Submit from '../views/Submit/Submit.vue'
import Post from '../views/Post/Post.vue'

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
  {
    path: '/posts/:id',
    name: 'Post',
    component: Post,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
