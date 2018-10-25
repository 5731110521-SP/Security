import Vue from 'vue'
import Router from 'vue-router'
import ViewLog from '@/components/ViewLog'
import HRLog_multi from '@/components/HRLog_multi'
import HR_Logging from '@/components/HR_Logging'
import ConfigSearch from '@/components/ConfigSearch_old2'

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
      path: '/hrlog_multi',
      name: 'HRLog_multi',
      component: HRLog_multi
    },
    {
      path: '/hrLogging',
      name: 'HR_Logging',
      component: HR_Logging
    },
    {
      path: '/ConfigSearch',
      name: 'ConfigSearch',
      component: ConfigSearch
    }
  ],
})
