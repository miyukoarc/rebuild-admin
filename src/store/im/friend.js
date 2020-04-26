
const state ={
    friendList: [],
    createGroupModelVisible: false
}
const mutations = {
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