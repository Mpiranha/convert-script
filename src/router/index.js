import Vue from 'vue'
import VueRouter from 'vue-router'
// import {
//   store
// } from '../store/index.js'
import store from '../store'

import Dashboard from '../views/Dashboard.vue'
import Login from '@/views/Login'
import Signup from '@/views/Signup'
import ForgotPassword from '@/views/ForgotPassword'
import Tutorial from '@/views/Tutorial'
import Billing from '@/views/Billing'
import Bonus from '@/views/Bonus'
import Agency from '@/views/Agency'
import Reseller from '@/views/Reseller'
import Verify from '@/views/Verify'
import Campaign from '@/views/Campaign'
import CampaignScript from '@/views/CampaignScript'
import ScriptSelect from '@/views/ScriptSelect'
import CreateScript from '@/views/CreateScript'

Vue.use(VueRouter)

const routes = [{
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/reset-password',
    name: 'ForgotPassword',
    component: ForgotPassword
  },
  {
    path: '/verify',
    name: 'Verify',
    component: Verify,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/tutorial',
    name: 'Tutorial',
    component: Tutorial,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/billing',
    name: 'Billing',
    component: Billing,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/bonus',
    name: 'Bonus',
    component: Bonus,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/agency',
    name: 'Agency',
    component: Agency,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/reseller',
    name: 'Reseller',
    component: Reseller,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/campaign',
    name: 'Campaign',
    component: Campaign,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/campaign/script',
    name: 'CampaignScript',
    component: CampaignScript,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/script/select',
    name: 'ScriptSelect',
    component: ScriptSelect,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/script/new',
    name: 'CreateScript',
    component: CreateScript,
    meta: {
      requiresAuth: true
    }
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]



const router = new VueRouter({
  routes
})


router.beforeEach((to, from, next) => {
  console.log(window.location.hash.split('#')[1])
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const loginpath = window.location.hash.split('#')[1]

    if (store.getters.isAuthenticated) {
      next()
      return
    }

    // next('/login')
    console.log(loginpath)
    next({
      name: 'Login',
      query: {
        from: loginpath
      }
    })
  } else {
    next()
  }
})



export default router