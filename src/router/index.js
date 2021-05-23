import Vue from "vue";
import VueRouter from "vue-router";

// Routes
import Home from '../views/Home/Home.vue'
import Submit from '../views/Submit/Submit.vue'
import Post from '../views/Post/Post.vue'
import Ask from '../views/Ask/Ask.vue'
import User from '../views/User/User.vue'
import Comment from '../views/Comment/Comment.vue'
import UpvotedPost from '../views/UpvotedPost/UpvotedPost.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/submit",
    name: "Submit",
    component: Submit,
  },
  {
    path: "/posts/:id",
    name: "Post",
    component: Post,
  },
  {
    path: '/ask',
    name: 'Ask',
    component: Ask,
  },
  {
    path: "/comments/:id",
    name: "Comment",
    component: Comment,
  },
  {
    path: "/users/:id",
    name: "User",
    component: User,
  },
  {
    path: "/uposts/:id",
    name: "UpvotedPost",
    component: UpvotedPost,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
