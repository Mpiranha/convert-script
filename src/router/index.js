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
import PromoCode from '@/views/admin/PromoCode'
import UsedCode from '@/views/admin/UsedCode'
import UpgradeRedirect from '@/views/UpgradeRedirect'



Vue.use(VueRouter)

const routes = [{
  path: '/login',
  name: 'Login',
  component: Login,
  meta: {
    title: 'OneCopy AI Writer - Login'
  }
},
{
  path: '/register',
  name: 'Signup',
  component: Signup,
  meta: {
    title: 'OneCopy AI Writer - Sign Up'
  }
},
{
  path: '/reset-password',
  name: 'ForgotPassword',
  component: ForgotPassword,
  meta: {
    title: 'OneCopy AI Writer - Password Reset'
  }
},
{
  path: '/verify',
  name: 'Verify',
  component: Verify,
  meta: {
    title: 'OneCopy AI Writer - Verify',
    requiresAuth: true,
    adminAuth: false
  }
},
{
  path: '/',
  name: 'Dashboard',
  component: Dashboard,
  meta: {
    title: 'OneCopy AI Writer - Dashboard',
    requiresAuth: true,
    adminAuth: false
  }
},
{
  path: '/tutorial',
  name: 'Tutorial',
  component: Tutorial,
  meta: {
    title: 'OneCopy AI Writer - Tutorials',
    requiresAuth: true,
    adminAuth: false
  }
},
{
  path: '/billing',
  name: 'Billing',
  component: Billing,
  meta: {
    title: 'OneCopy AI Writer - Billings',
    requiresAuth: true,
    adminAuth: false
  }
},
{
  path: '/bonus',
  name: 'Bonus',
  component: Bonus,
  meta: {
    title: 'OneCopy AI Writer - Bonuses',
    requiresAuth: true,
    adminAuth: false
  }
},
{
  path: '/market',
  name: 'Market',
  component: Market,
  meta: {
    title: 'OneCopy AI Writer - MarketPlace',
    requiresAuth: true,
    adminAuth: false
  }
},
{
  path: '/agency',
  name: 'Agency',
  component: Agency,
  meta: {
    title: 'OneCopy AI Writer - Agency',
    requiresAuth: true,
    adminAuth: false
  }
},
{
  path: '/agency/setup',
  name: 'AgencySetup',
  component: AgencySetup,
  meta: {
    title: 'OneCopy AI Writer - Agency Setup',
    requiresAuth: true,
    adminAuth: false
  }
},
{
  path: '/reseller',
  name: 'Reseller',
  component: Reseller,
  meta: {
    title: 'OneCopy AI Writer - Reseller',
    requiresAuth: true,
    adminAuth: false
  }
},
{
  path: '/campaign',
  name: 'Campaign',
  component: Campaign,
  meta: {
    title: 'OneCopy AI Writer - All Campaign',
    requiresAuth: true,
    adminAuth: false
  }
},
{
  path: '/campaign/:id',
  name: 'CampaignScript',
  component: CampaignScript,
  meta: {
    title: 'OneCopy AI Writer - All Campaign Copies',
    requiresAuth: true,
    adminAuth: false
  }
},
{
  path: '/campaign/:id/script/select',
  name: 'CampaignScriptSelect',
  component: ScriptSelect,
  meta: {
    title: 'OneCopy AI Writer - Template Select',
    requiresAuth: true,
    adminAuth: false
  }
},
{
  path: '/campaign/:campaignId/script/new/:id',
  name: 'CampaignCreateScript',
  component: CreateScript,
  meta: {
    title: 'OneCopy AI Writer - Generate Copy',
    requiresAuth: true,
    adminAuth: false
  }
},
{
  path: '/script/select',
  name: 'ScriptSelect',
  component: ScriptSelect,
  meta: {
    title: 'OneCopy AI Writer - Template Select',
    requiresAuth: true,
    adminAuth: false
  }
},
{
  path: '/script/new/:id',
  name: 'CreateScript',
  component: CreateScript,
  meta: {
    title: 'OneCopy AI Writer - Generate Copy',
    requiresAuth: true,
    adminAuth: false
  }
},
{
  path: '/scripts',
  name: 'Scripts',
  component: Script,
  meta: {
    title: 'OneCopy AI Writer - All Copies',
    requiresAuth: true,
    adminAuth: false
  }
},
{
  path: '/favourites',
  name: 'Favourites',
  component: Favourites,
  meta: {
    title: 'OneCopy AI Writer - Favorites',
    requiresAuth: true,
    adminAuth: false
  }
},
{
  path: '/billing/plan/:id/upgrade',
  name: 'UpgradeRedirect',
  component: UpgradeRedirect,
  meta: {
    title: 'OneCopy AI Writer - Redirecting...',
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
    title: 'OneCopy AI Writer - Integration',
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
    title: 'OneCopy AI Writer - Account Settings',
    requiresAuth: true,
    adminAuth: false
  }
},
{
  path: '/404',
  name: 'NotFound',
  component: NotFound,
  meta: {
    title: '404',
    requiresAuth: false
  }
},
{
  path: '/projects',
  name: 'Projects',
  component: Projects,
  meta: {
    title: 'OneCopy AI Writer - Saved Pojects',
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
    title: 'OneCopy AI Writer - Admin Dashbord',
    requiresAuth: true,
    adminAuth: true
  }
},
{
  path: '/admin/users',
  name: 'Users',
  component: Users,
  meta: {
    title: 'OneCopy AI Writer Admin - All Users',
    requiresAuth: true,
    adminAuth: true
  }
},
{
  path: '/admin/promo-codes',
  name: 'PromoCodes',
  component: PromoCode,
  meta: {
    title: 'OneCopy AI Writer Admin - Promo Codes',
    requiresAuth: true,
    adminAuth: true
  }
},
{
  path: '/admin/promo-codes/used',
  name: 'UsedCodes',
  component: UsedCode,
  meta: {
    title: 'OneCopy AI Writer Admin - Used Codes',
    requiresAuth: true,
    adminAuth: true
  }
},
{
  path: '/admin/transactions',
  name: 'Transactions',
  component: Transaction,
  meta: {
    title: 'OneCopy AI Writer Admin - Transaction',
    requiresAuth: true,
    adminAuth: true
  }
},
{
  path: '/admin/script/type',
  name: 'ScriptTypes',
  component: ScriptType,
  meta: {
    title: 'OneCopy AI Writer - Copy Templates',
    requiresAuth: true,
    adminAuth: true
  }
},
{
  path: '/admin/category',
  name: 'Category',
  component: Category,
  meta: {
    title: 'OneCopy AI Writer - Categories',
    requiresAuth: true,
    adminAuth: true
  }
},
{
  path: '/admin/languages',
  name: 'Languages',
  component: Language,
  meta: {
    title: 'OneCopy AI Writer - Languages',
    requiresAuth: true,
    adminAuth: true
  }
},
{
  path: '/admin/keywords',
  name: 'OneCopy AI Writer - Keywords',
  component: Keyword,
  meta: {
    title: 'Keyword',
    requiresAuth: true,
    adminAuth: true
  }
},
{
  path: '/admin/tone',
  name: 'Tone',
  component: Tone,
  meta: {
    title: 'OneCopy AI Writer - Tone',
    requiresAuth: true,
    adminAuth: true
  }
},
{
  path: '/admin/script/type/:id/input',
  name: 'ScriptTypesInput',
  component: ScriptInput,
  meta: {
    title: 'OneCopy AI Writer - Template Setup',
    requiresAuth: true,
    adminAuth: true
  }
},
{
  path: '/admin/script/type/input',
  name: 'ScriptTypesCreate',
  component: ScriptInput,
  meta: {
    title: 'OneCopy AI Writer - Template Setup',
    requiresAuth: true,
    adminAuth: true
  }
},
{
  path: '/admin/scripts/flagged',
  name: 'FlaggedScript',
  component: ScriptFlagged,
  meta: {
    title: 'OneCopy AI Writer - Flagged Scripts',
    requiresAuth: true,
    adminAuth: true
  }
},
{
  path: '/admin/roles',
  name: 'RolesPermissions',
  component: RolesPermissions,
  meta: {
    title: 'OneCopy AI Writer - Permissions',
    requiresAuth: true,
    adminAuth: true
  }
},
{
  path: '/admin/roles/:id/permissions',
  name: 'SetPermission',
  component: SetPermission,
  meta: {
    title: 'OneCopy AI Writer - Roles Permissions',
    requiresAuth: true,
    adminAuth: true
  }
},
{
  path: '/admin/plans',
  name: 'Plans',
  component: Plans,
  meta: {
    title: 'OneCopy AI Writer - Plans',
    requiresAuth: true,
    adminAuth: true
  }
},

{
  path: '/admin/integration',
  name: 'IntegrationAdmin',
  component: IntegrationAdmin,
  meta: {
    title: 'Integration',
    requiresAuth: true,
    adminAuth: true
  }
},
{
  path: '/admin/suggestions',
  name: 'Suggestions',
  component: Suggestions,
  meta: {
    title: 'OneCopy AI Writer - Suggestions',
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
    title: 'OneCopy AI Writer - Bonuses Setup',
    requiresAuth: true,
    adminAuth: true
  }
},
{
  path: '/admin/tutorials',
  name: 'Tutorials',
  component: Tutorials,
  meta: {
    title: 'OneCopy AI Writer - Tutorials Setup',
    requiresAuth: true,
    adminAuth: true
  }
},
{
  path: '/admin/agency/files',
  name: 'AgencyFile',
  component: AgencyFile,
  meta: {
    title: 'OneCopy AI Writer - Agency Files Setup',
    requiresAuth: true,
    adminAuth: true
  }
},
]



const router = new VueRouter({
  mode: 'history',
  routes
})

// const parseJwt = (token) => {
//   var base64Url = token.split('.')[1];
//   var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//   var jsonPayload = decodeURIComponent(Buffer.from(base64, "base64").toString("ascii").split("").map(function (c) {
//     return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//   }).join(''));

//   return JSON.parse(jsonPayload);
// };


router.beforeEach((to, from, next) => {

  const loginpath = window.location.hash.split('#')[1];

  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

  if (nearestWithTitle) {
    document.title = nearestWithTitle.meta.title;
  }

  if (to.matched.length > 0) {

    if (to.matched.some(record => record.meta.requiresAuth)) {


      if (store.getters.isAuthenticated) {
        // console.log('authenticated');
        // if (localStorage.token) {
        //   const jwtPayload = parseJwt(localStorage.token);
        //   if (jwtPayload.exp < Date.now() / 1000) {
        //     // token expired
        //     store.dispatch("logout");
        //     next("/login");

        //     return;
        //   }
        // }

        // if (
        //   )

        let role = store.state.user.role || JSON.parse(localStorage.getItem('user'));
        if (to.matched.some(record => record.meta.adminAuth)) {

          if (role.toLowerCase() === "admin") {
            next();
            return;
          } else {

            next({
              name: "NotFound",
              query: {
                from: window.location.hash.split('#')[1]
              }
            });
            return;
          }
        }
        // next({
        //      path: '/settings'
        //  });
        // console.log(store.state.user.first_name);
        // console.log(store.state.user.last_name);
        setTimeout(function () {
          // console.log(store.state.user.first_name);
          // console.log(store.state.user.last_name);
           if (Boolean(store.state.user.first_name) === false && Boolean(store.state.user.last_name) === false &&  to.name !== 'Settings') {

          next('/settings');
          //console.log("yeah");
        }
        }, 5000);

        console.log(JSON.parse(localStorage.getItem('user')));
        // if (Boolean(store.state.user.first_name) == false && Boolean(store.state.user.last_name) == false &&  to.name !== 'Settings') {
        //   // next('/settings');
        //   // next({
        //   //   path: '/settings'
        //   // })
        //   //return;
        //   next('/settings');
        //   //console.log("yeah");
        // }

        next();
        return;
      } else {
        // console.log("Not Authenticated");
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
  } else {
    next({
      name: "NotFound",
      query: {
        from: window.location.hash.split('#')[1]
      }
    });
  }

})



export default router