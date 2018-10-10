import Vue from 'vue'
import Router from 'vue-router'
import ViewLog from '@/components/ViewLog'
import ConfigAdd from '@/components/ConfigAdd'
import ConfigSearch from '@/components/ConfigSearch'
import HRLog_multi from '@/components/HRLog_multi'

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
    {
      path: '/hrlog_multi',
      name: 'HRLog_multi',
      component: HRLog_multi
    }
  ],
})
