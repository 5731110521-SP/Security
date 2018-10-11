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
import DatePicker from "vue2-datepicker";
import SuiVue from 'semantic-ui-vue';
import 'semantic-ui-css/semantic.min.css';

Vue.use(BootstrapVue);
Vue.use(VueSession)
Vue.use(SuiVue);
Vue.component('multiselect', Multiselect)
Vue.component('modal', Modal)
Vue.component('config-add', ConfigAdd)
Vue.component('date-picker', DatePicker)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
