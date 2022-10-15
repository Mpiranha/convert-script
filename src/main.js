import Vue from 'vue'
import 'es6-promise/auto'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loader from '@/components/Loader'

import VueApexCharts from 'vue-apexcharts'




import {
  BootstrapVue,
  IconsPlugin
} from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
//Vuelidate
Vue.use(Vuelidate)
Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)
Vue.component('loader-modal', Loader)

Vue.config.productionTip = false

// Check that service workers are supported
// if ('serviceWorker' in navigator) {
//   // Use the window load event to keep the page load performant
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/sw.js').then(
//       () => {
//         // console.log('Service worker registration succeeded:', registration);
//       }, /*catch*/(error) => {
//         console.error(`Service worker registration failed: ${error}`);
//       });
//   });
// }

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')