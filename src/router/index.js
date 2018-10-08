import Vue from 'vue'
import Router from 'vue-router'
import ViewLog from '@/components/ViewLog'
import ConfigAdd from '@/components/ConfigAdd'
import ConfigSearch from '@/components/ConfigSearch'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/viewLog',
      name: 'ViewLog',
      component: ViewLog
    },
    {
      path: '/configAdd',
      name: 'ConfigAdd',
      component: ConfigAdd
    },
    {
      path: '/configSearch',
      name: 'ConfigSearch',
      component: ConfigSearch
    },
  ],
})
