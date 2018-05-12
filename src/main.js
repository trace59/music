// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import VueLazyload from 'vue-lazyload'

import 'common/stylus/index.styl'

fastclick.attach(document.body)
Vue.component('icon', Icon)
Vue.use(VueLazyload, {
  loading: require('common/image/fm.png')
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
