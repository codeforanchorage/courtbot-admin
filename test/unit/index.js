import Vue from 'vue'

Vue.config.productionTip = false

// require all test files (files that ends with .spec.js)
const testsContext = require.context('./specs', true, /\.spec$/)
testsContext.keys().forEach(testsContext)

// require all src files except main.js for coverage.
// you can also change this to match only the subset of files that
// you want coverage for.
const srcContext = require.context('../../src', true, /^\.\/(?!main(\.js)?$)/)
srcContext.keys().forEach(srcContext)


import axios from 'axios';
import config from '@/config.js'
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'

/**
 * Basic setup of vue object so we don't need to
 * do it in each test file.
 */

/* Setup axios on the vue prototype like we are in components */
Vue.prototype.$http = axios

moment.tz.setDefault(config.TIME_ZONE);

Vue.use(VueMoment, {
    moment,
})
