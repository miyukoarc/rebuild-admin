import {
  getEmployeeList
} from '@/api/roleManage'
import Page from "@/utils/PageDefault";
const state = {
  employeeList: [],
  page:new Page()
}
const mutations = {
  SAVE_EMPLOYEELIST(state, list) {
    state.employeeList = (list)
  }
}
const actions = {

  getEmployeeList({
    commit,state
  }) {
    return getEmployeeList(state.page).then(res => {
      commit('SAVE_EMPLOYEELIST', res.items)
    }).catch(err=>{
        console.log(err)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
