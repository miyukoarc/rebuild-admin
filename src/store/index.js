import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import conversation from './modules/im/conversation'
import group from './modules/im/group'
import user from './modules/im/user'
import video from './modules/im/video'
import friend from './modules/im/friend'
import blacklist from './modules/im/blacklist'
import {Message} from 'element-ui'
// import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})




const store = new Vuex.Store({
  state: {
    current: Date.now(), // 当前时间
    intervalID: 0,
    message: undefined
  },
  modules,
  getters:{
    ...getters,
    hidden(state) {
      // eslint-disable-next-line no-unused-vars
      const temp = state.current 
      if (typeof document.hasFocus !== 'function') {
        return document.hidden
      }
      return !document.hasFocus()
    }
  },
  mutations: {
    startComputeCurrent(state) {
      state.intervalID = setInterval(() => {
        state.current = Date.now()
      }, 500)
    },
    stopComputeCurrent(state) {
      clearInterval(state.intervalID)
      state.intervalID = 0
    },
    showMessage(state, options) {
      if (state.message) {
        state.message.close()
      }
      state.message = Message({
        message: options.message,
        type: options.type || 'success',
        duration: options.duration || 2000,
        offset: 40
      })
    }
  },
  // plugins: [createPersistedState()],
})

export default store
