// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vueResource from 'vue-resource'
import auth from './auth'

Vue.config.productionTip = false
Vue.use(vueResource)
Vue.use(require('vue-moment'));

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

Vue.http.interceptors.push(function(request, next){
    /* this will set the auth header on all requests */
    request.headers.set('Authorization', 'JWT ' + auth.token)
    next()
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})

