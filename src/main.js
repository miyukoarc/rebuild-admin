import Vue from 'vue'
import '@/styles/bootstrap.css'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import 'default-passive-events'

import i18n from './lang'


import Avatar from '@/components/Avatar/avatar.vue'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import tim from './tim'
import TIM from 'tim-js-sdk'
import {MessageBox} from 'element-ui'

import '@/assets/icon/iconfont.css'
import '@/assets/icon/tim.css'


import '@/utils/normal';//自定义工具函数

//iconfont
window.tim = tim
window.TIM = TIM
// window.store = store

Vue.prototype.$bus = new Vue() // event Bus 用于无关系组件间的通信。
Vue.prototype.tim = tim
Vue.prototype.TIM = TIM
Vue.prototype.$store = store
Vue.prototype.$confirm = MessageBox.confirm

Vue.prototype.dialogWidth = '600px' //dialog 统一宽度



/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
  // console.log('mock')
  // const { mockXHR } = require('../mock')
  // mockXHR()
// }

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI,{size:'small'})

Vue.config.productionTip = false

Vue.component('avatar', Avatar)
/**
 * 自定义指令安装
 */
import waves from '@/directive/waves';
Vue.use(waves)

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
