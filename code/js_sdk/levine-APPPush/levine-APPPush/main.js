import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

/**
 * 推送弹框
 */
import appPush from '@/plugins/APPPush/index.js'
Vue.use(appPush)

const app = new Vue({
    ...App
})
app.$mount()


