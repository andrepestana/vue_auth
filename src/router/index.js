import Vue from 'vue'
import VueRouter from 'vue-router'
import WelcomePage from '../components/welcome/welcome.vue'
import DashboardPage from '../components/dashboard/dashboard.vue'
import authRoutes from '../components/auth/router'
import authUtil from '../components/auth/authUtil'

Vue.use(VueRouter)

let routes = [
  { 
    path: '/', 
    component: WelcomePage,
    meta: { public: true }
  },
  {
    path: '/dashboard',
    component: DashboardPage
  }
]
routes = routes.concat(
  authRoutes
)

export default new VueRouter({mode: 'history', routes})