// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import config from '@/config.js'
import auth from './auth'
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'
moment.tz.setDefault(config.TIME_ZONE);


Vue.config.productionTip = false

Vue.use(VueMoment, {
    moment,
})
/* Make axios available to all components
   components can simply use `this.$http.get()`
*/
Vue.prototype.$http = axios

/* components can make requests relative to this URL */
axios.defaults.baseURL = config.API_URL;

// Intercept all requests to add auth token //
axios.interceptors.request.use(
    config => {
      config.headers.authorization = 'JWT ' + auth.token;
      return config;
    },
    error => Promise.reject(error)
  );

/*
    Setup routes that require auth
    This will look at the routes in router.index to see which
    need authentication. This is not a security feature — the backend API requires auth
    so this is only a convenience so users don't see an interface without data when not logged in.
*/
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth) && !auth.loggedIn) {
        next({ path: '/login' })
    } else {
        next()
    }
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})

