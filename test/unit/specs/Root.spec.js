import Vue from 'vue'
import Root from '@/components/Root'

import vueResource from 'vue-resource'

import Router from 'vue-router'
import router from '@/router'

describe('Root.vue', () => {
  it('should render correct contents', () => {
    Vue.use(Router)
    Vue.use(vueResource)
    Vue.use(require('vue-moment'))
    const Constructor = Vue.extend(Root)
    const vm = new Constructor(
        {router}
    ).$mount()
    expect(vm.$el.querySelector('#charts h2').textContent)
      .to.equal('Total SMS hits by date')
  })
})
