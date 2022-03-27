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
import AgencySetup from '@/views/AgencySetup'
import Reseller from '@/views/Reseller'
import Verify from '@/views/Verify'
import Campaign from '@/views/Campaign'
import CampaignScript from '@/views/CampaignScript'
import ScriptSelect from '@/views/ScriptSelect'
import CreateScript from '@/views/CreateScript'
import Script from '@/views/Script'
import Market from '@/views/Market'
import Favourites from '@/views/Favourites'
// import Presets from '@/views/Presets'
// import PresetAdd from '@/views/PresetAdd'
import Integration from '@/views/Integration'
import IntegrationNew from '@/views/IntegrationNew'
import Settings from '@/views/Settings'
import Stat from '@/views/admin/Stat'
import NotFound from '@/views/NotFound'
import Users from '@/views/admin/Users'
import Transaction from '@/views/admin/Transaction'
import ScriptType from '@/views/admin/ScriptType'
import ScriptInput from '@/views/admin/ScriptInput'
import ScriptFlagged from '@/views/admin/ScriptFlagged'
import RolesPermissions from '@/views/admin/RolesPermissions'
import SetPermission from '@/views/admin/SetPermission'
import IntegrationAdmin from '@/views/admin/Integration'
import Suggestions from '@/views/admin/Suggestions'
import Configuration from '@/views/admin/Configuration'
import Bonuses from '@/views/admin/Bonuses'
import Tutorials from '@/views/admin/Tutorials'
import AgencyFile from '@/views/admin/AgencyFile'
import Plans from '@/views/admin/Plans'
import Category from '@/views/admin/Category'
import Projects from '@/views/Projects'
import Language from '@/views/admin/Language'
import Tone from '@/views/admin/Tone'
import Keyword from '@/views/admin/Keyword'



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
      requiresAuth: true,
      adminAuth: false
    }
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true,
      adminAuth: false
    }
  },
  {
    path: '/tutorial',
    name: 'Tutorial',
    component: Tutorial,
    meta: {
      requiresAuth: true,
      adminAuth: false
    }
  },
  {
    path: '/billing',
    name: 'Billing',
    component: Billing,
    meta: {
      requiresAuth: true,
      adminAuth: false
    }
  },
  {
    path: '/bonus',
    name: 'Bonus',
    component: Bonus,
    meta: {
      requiresAuth: true,
      adminAuth: false
    }
  },
  {
    path: '/market',
    name: 'Market',
    component: Market,
    meta: {
      requiresAuth: true,
      adminAuth: false
    }
  },
  {
    path: '/agency',
    name: 'Agency',
    component: Agency,
    meta: {
      requiresAuth: true,
      adminAuth: false
    }
  },
  {
    path: '/agency/setup',
    name: 'AgencySetup',
    component: AgencySetup,
    meta: {
      requiresAuth: true,
      adminAuth: false
    }
  },
  {
    path: '/reseller',
    name: 'Reseller',
    component: Reseller,
    meta: {
      requiresAuth: true,
      adminAuth: false
    }
  },
  {
    path: '/campaign',
    name: 'Campaign',
    component: Campaign,
    meta: {
      requiresAuth: true,
      adminAuth: false
    }
  },
  {
    path: '/campaign/:id',
    name: 'CampaignScript',
    component: CampaignScript,
    meta: {
      requiresAuth: true,
      adminAuth: false
    }
  },
  {
    path: '/campaign/:id/script/select',
    name: 'CampaignScriptSelect',
    component: ScriptSelect,
    meta: {
      requiresAuth: true,
      adminAuth: false
    }
  },
  {
    path: '/campaign/:campaignId/script/new/:id',
    name: 'CampaignCreateScript',
    component: CreateScript,
    meta: {
      requiresAuth: true,
      adminAuth: false
    }
  },
  {
    path: '/script/select',
    name: 'ScriptSelect',
    component: ScriptSelect,
    meta: {
      requiresAuth: true,
      adminAuth: false
    }
  },
  {
    path: '/script/new/:id',
    name: 'CreateScript',
    component: CreateScript,
    meta: {
      requiresAuth: true,
      adminAuth: false
    }
  },
  {
    path: '/scripts',
    name: 'Scripts',
    component: Script,
    meta: {
      requiresAuth: true,
      adminAuth: false
    }
  },
  {
    path: '/favourites',
    name: 'Favourites',
    component: Favourites,
    meta: {
      requiresAuth: true,
      adminAuth: false
    }
  },
  // {
  //   path: '/presets',
  //   name: 'Preset',
  //   component: Presets,
  //   meta: {
  //     requiresAuth: true,
  //     adminAuth: false
  //   }
  // },
  // {
  //   path: '/presets/create',
  //   name: 'CreatePreset',
  //   component: PresetAdd,
  //   meta: {
  //     requiresAuth: true,
  //     adminAuth: false
  //   }
  // },
  {
    path: '/integration',
    name: 'Integration',
    component: Integration,
    meta: {
      requiresAuth: true,
      adminAuth: false
    }
  },
  {
    path: '/integration/new',
    name: 'IntegrationNew',
    component: IntegrationNew,
    meta: {
      requiresAuth: true,
      adminAuth: false
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: {
      requiresAuth: true,
      adminAuth: false
    }
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects,
    meta: {
      requiresAuth: true,
      adminAuth: false
    }
  },
  // Admin End points
  {
    path: '/admin',
    name: 'Stat',
    component: Stat,
    meta: {
      requiresAuth: true,
      adminAuth: true
    }
  },
  {
    path: '/admin/users',
    name: 'Users',
    component: Users,
    meta: {
      requiresAuth: true,
      adminAuth: true
    }
  },
  {
    path: '/admin/transactions',
    name: 'Transactions',
    component: Transaction,
    meta: {
      requiresAuth: true,
      adminAuth: true
    }
  },
  {
    path: '/admin/script/type',
    name: 'ScriptTypes',
    component: ScriptType,
    meta: {
      requiresAuth: true,
      adminAuth: true
    }
  },
  {
    path: '/admin/category',
    name: 'Category',
    component: Category,
    meta: {
      requiresAuth: true,
      adminAuth: true
    }
  },
  {
    path: '/admin/languages',
    name: 'Languages',
    component: Language,
    meta: {
      requiresAuth: true,
      adminAuth: true
    }
  },
  {
    path: '/admin/keywords',
    name: 'Keywords',
    component: Keyword,
    meta: {
      requiresAuth: true,
      adminAuth: true
    }
  },
  {
    path: '/admin/tone',
    name: 'Tone',
    component: Tone,
    meta: {
      requiresAuth: true,
      adminAuth: true
    }
  },
  {
    path: '/admin/script/type/:id/input',
    name: 'ScriptTypesInput',
    component: ScriptInput,
    meta: {
      requiresAuth: true,
      adminAuth: true
    }
  },
  {
    path: '/admin/script/type/input',
    name: 'ScriptTypesCreate',
    component: ScriptInput,
    meta: {
      requiresAuth: true,
      adminAuth: true
    }
  },
  {
    path: '/admin/scripts/flagged',
    name: 'FlaggedScript',
    component: ScriptFlagged,
    meta: {
      requiresAuth: true,
      adminAuth: true
    }
  },
  {
    path: '/admin/roles',
    name: 'RolesPermissions',
    component: RolesPermissions,
    meta: {
      requiresAuth: true,
      adminAuth: true
    }
  },
  {
    path: '/admin/roles/:id/permissions',
    name: 'SetPermission',
    component: SetPermission,
    meta: {
      requiresAuth: true,
      adminAuth: true
    }
  },
  {
    path: '/admin/plans',
    name: 'Plans',
    component: Plans,
    meta: {
      requiresAuth: true,
      adminAuth: true
    }
  },

  {
    path: '/admin/integration',
    name: 'IntegrationAdmin',
    component: IntegrationAdmin,
    meta: {
      requiresAuth: true,
      adminAuth: true
    }
  },
  {
    path: '/admin/suggestions',
    name: 'Suggestions',
    component: Suggestions,
    meta: {
      requiresAuth: true,
      adminAuth: true
    }
  },
  {
    path: '/admin/config',
    name: 'Configuration',
    component: Configuration,
    meta: {
      requiresAuth: true,
      adminAuth: true
    }
  },
  {
    path: '/admin/bonuses',
    name: 'Bonuses',
    component: Bonuses,
    meta: {
      requiresAuth: true,
      adminAuth: true
    }
  },
  {
    path: '/admin/tutorials',
    name: 'Tutorials',
    component: Tutorials,
    meta: {
      requiresAuth: true,
      adminAuth: true
    }
  },
  {
    path: '/admin/agency/files',
    name: 'AgencyFile',
    component: AgencyFile,
    meta: {
      requiresAuth: true,
      adminAuth: true
    }
  },


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
  mode: 'history',
  routes
})

const parseJwt = (token) => {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(Buffer.from(base64, "base64").toString("ascii").split("").map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};


router.beforeEach((to, from, next) => {
  console.log(window.location.hash.split('#')[1])
  const loginpath = window.location.hash.split('#')[1];
  if (to.matched.some(record => record.meta.requiresAuth)) {

    if (store.getters.isAuthenticated) {
      console.log('authenticated');
      if (localStorage.token) {
        const jwtPayload = parseJwt(localStorage.token);
        if (jwtPayload.exp < Date.now() / 1000) {
          // token expired
          store.dispatch("logout");
          next("/login");

          return;
        }
      }



      // store.dispatch("getUser");
      let role = store.state.user.role || JSON.parse(localStorage.getItem('user'));
      console.log("Role " + role);




      if (to.matched.some(record => record.meta.adminAuth)) {

        if (role === "Admin") {
          next();
          return;
        } else {

          next({
            name: "NotFound",
            query: {
              from: window.location.hash.split('#')[1]
            }
          });
        }
      }

      next();
    } else {
      console.log("Not Authenticated");
      next({
        name: 'Login',
        query: {
          from: loginpath
        }
      })
    }
  } else {
    next();
  }
  // if (to.matched.some(record => record.meta.requiresAuth)) {
  //   const loginpath = window.location.hash.split('#')[1]

  //   if (to.matched.some(record => record.meta.adminAuth)) {
  //     // alert("Admin Only")
  //     // alert("User role: " + role)
  //     if (role === "Admin") {
  //       // alert("You're an Admin")
  //       next()
  //     } else {
  //       next({
  //         name: 'NotFound',
  //         query: {
  //           from: loginpath
  //         }
  //       })
  //       return
  //     }
  //   }

  //   if (store.getters.isAuthenticated) {
  //     if (localStorage.token) {
  //       const jwtPayload = parseJwt(localStorage.token);
  //       if (jwtPayload.exp < Date.now() / 1000) {
  //         // token expired
  //         store.dispatch("logout");
  //         next("/login");
  //       }
  //       next();
  //     } else {
  //       next("/");
  //     }

  //     store.dispatch("getUser")
  //     next()

  //     return
  //   }



  //   // next('/login')
  //   console.log(loginpath)
  //   next({
  //     name: 'Login',
  //     query: {
  //       from: loginpath
  //     }
  //   })
  // } else {
  //   next()
  // }


})



export default router