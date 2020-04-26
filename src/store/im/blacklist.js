import tim from '@/tim'

const state ={
    blacklist: []
}
const mutations = {
    updateBlacklist(state, blacklist) {
        state.blacklist = blacklist
      },
      removeFromBlacklist(state, userID) {
        state.blacklist = state.blacklist.filter(item => item.userID !== userID)
      },
      reset(state) {
        Object.assign(state, {
          blacklist: []
        })
      }
}
const actions ={
    getBlacklist(context) {
        tim
          .getBlacklist()
          .then(({ data }) => {
            if (data.length > 0) {
              tim.getUserProfile({ userIDList: data })
                .then(({ data }) => {
                  context.commit('updateBlacklist', data)
                })
            }
          })
      }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}