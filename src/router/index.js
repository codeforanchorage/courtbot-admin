import Vue from 'vue'
import Router from 'vue-router'
import Root from '@/components/Root'
import citation_search from '@/components/citationSearch/citation_search'
import phone_search from '@/components/citationSearch/phone_search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Root',
      component: Root
    },
    {
        path: '/citation/:citationNumber',
        name: 'Citation-Search',
        component:citation_search,
        props:true
    },
    {
        path: '/phone/:phoneHash',
        name: 'Phone-Search',
        component: phone_search,
        props: true
    }
  ]
})
