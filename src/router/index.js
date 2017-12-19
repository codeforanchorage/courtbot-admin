import Vue from 'vue'
import Router from 'vue-router'
import Root from '@/components/Root'
import citation_search from '@/components/citationSearch/citation_search'
import phone_search from '@/components/citationSearch/phone_search'
import notification_list from '@/components/notificationList/notifications'
import login from '@/components/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Root',
      meta: { requiresAuth: true },
      component: Root
    },
    {
        path: '/login',
        name: 'Login',
        component: login
    },
    {
        path: '/citation/:citationNumber',
        meta: { requiresAuth: true },
        name: 'Citation-Search',
        component:citation_search,
        props:true
    },
    {
        path: '/phone/:phoneHash',
        meta: { requiresAuth: true },
        name: 'Phone-Search',
        component: phone_search,
        props: true
    },
    {
        path: '/notifications',
        meta: { requiresAuth: true },
        name: 'Notification-List',
        component: notification_list,
        props: true
    }
  ]
})
