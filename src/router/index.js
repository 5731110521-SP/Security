import Vue from 'vue'
import Router from 'vue-router'
import ViewLog from '@/components/ViewLog'
import HRLog_multi from '@/components/HRLog_multi_old'
import HR_Logging from '@/components/HR_Logging'

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
    }
  ],
})
