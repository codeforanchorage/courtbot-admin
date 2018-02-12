import Vue from 'vue'
import caseCounts from '@/components/globalStats/caseCounts'
import axios from 'axios';
import moxios from 'moxios';

import config from '@/config'
const apiURL = 'hearing_counts'

describe('caseCounts.vue', () => {
    beforeEach(function(){
        moxios.install()
    })
    afterEach(function(){
        moxios.uninstall()
    })
    it('should render contents from API correctly', (done) => {
        moxios.stubRequest(/\/hearing_counts/, {
            status: 200,
            response: [
                { count: 100, date: "2018-02-09T10:20:06-09:00", error_count: null, id: 169, runner: "load"},
              ]
        })
        moxios.wait(function () {
            const listElements = vm.$el.querySelectorAll("ul li")
            expect(listElements[0].textContent).to.equal('Records: 100')
            expect(listElements[1].textContent).to.equal('Imported: Feb 09, 2018')
            done()
        })

        Vue.prototype.$http = axios
        Vue.use(require('vue-moment'))
        Vue.prototype.$http = axios
        axios.defaults.baseURL = config.API_URL;
        const Constructor = Vue.extend(caseCounts)
        const vm = new Constructor().$mount()

    })
})
