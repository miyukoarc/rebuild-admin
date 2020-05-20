import {} from '@/api/orgManage'

const state ={
  loading:false,
  currOrg: {},
  orgList:[]
}
const mutations = {
  SAVE_DETAIL(state, payload){
    state.currOrg = payload
  },
  SAVE_LIST(state, payload){
    state.orgList = payload
  }
}
const actions ={


}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
