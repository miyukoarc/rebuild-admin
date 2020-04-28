
const state ={
    friendList: [],
    currentFriendInfo: {},
    createGroupModelVisible: false
}
const mutations = {
  SAVE_CURRENTINFO(state, info){
    state.currentFriendInfo = info
  },
    upadteFriendList(state, friendList) {
        state.friendList = friendList
      },
      reset(state) {
        Object.assign(state, {
          friendList: [],
          createGroupModelVisible: false
        })
      }
}
const actions ={}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}