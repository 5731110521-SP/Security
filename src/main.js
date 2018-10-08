// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import VueSession from 'vue-session'
import Multiselect from 'vue-multiselect'
import Modal from './components/Modal'
import ConfigAdd from './components/ConfigAdd'

Vue.use(BootstrapVue);
Vue.use(VueSession)
Vue.component('multiselect', Multiselect)
Vue.component('modal', Modal)
Vue.component('config-add', ConfigAdd)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
