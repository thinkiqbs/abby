import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import loginView from '../views/login.vue'
import QuestionList from '../views/questionsPage.vue'
import SignUp from '../views/Signup.vue'
import SignupVerify from '../views/SignupVerify.vue'
import MessagesPage from '../views/messages.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/questions',
    component: QuestionList,
  },
  {
    path: '/questions/:id',
    component: QuestionList,
    props: (route) => ({ id: parseInt(route.params.id), question: route.params.question }),
  },
  {
    path: '/signup/verify/code=:code',
    name: 'verify',
    component: SignupVerify,
    props: true,
  },

  {
    path:'/messages',
    name:'messages',
    component:MessagesPage
  },

  {
    path: '/Signup',
    name: 'Signup',
    component: SignUp
  },

  {
    path: '/login',
    name: 'login',
    component: loginView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
