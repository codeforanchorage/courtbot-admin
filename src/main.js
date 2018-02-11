// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';

import auth from './auth'

Vue.config.productionTip = false
//Vue.use(vueResource)
Vue.use(require('vue-moment'));

Vue.prototype.$http = axios
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

// Intercept all requests to add auth token //
axios.interceptors.request.use(
    config => {
      config.headers.authorization = 'JWT ' + auth.token;
      return config;
    },
    error => Promise.reject(error)
  );



/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})

