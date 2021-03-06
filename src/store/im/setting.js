
import {Message} from 'element-ui'

const state = {
  current: Date.now(), // 当前时间
  intervalID: 0,
  message: undefined
}
const mutations = {
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
}

const getters = {
  hidden(state) {
    // eslint-disable-next-line no-unused-vars
    const temp = state.current
    if (typeof document.hasFocus !== 'function') {
      return document.hidden
    }
    return !document.hasFocus()
  }
}
const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
