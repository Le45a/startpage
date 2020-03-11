import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ToDo from "../components/home/Todo.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path:'/todo',
    component:ToDo
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
