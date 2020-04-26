import {
  getEmployeeList,
  getEmpByDepartId,
  addEmployee,
  getUserByPhone,
  addEmployForUser,
  deleteUserByUnionId
} from '@/api/employee'
// import {getDepartment} from '@/api/department';
// import Page from "@/utils/PageDefault";
const state = {
  employeeList: [],
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
    return getEmployeeList().then(res => {
      commit('SAVE_EMPLOYEELIST', res.items);
      return res.total;
    }).catch(err=>{
        console.log(err)
    })
  },
  getEmpByDepartId({
    commit,state
  },id) {
    return getEmpByDepartId(id).then(res => {
        commit('SAVE_EMPLOYEELIST', res.items)
        return res;
      })
  },
  addEmployee({
    commit,state
  },id) {
    return addEmployee(form).then(res => {
        return res;
      })
  },
  getUserByPhone({
    commit,state
  },phone){
    return getUserByPhone(phone).then((result) => {
      return result;
    })
  },
  addEmployForUser({
    commit,state
  },form){
    return addEmployForUser(form).then((result) => {
      return result;
    })
  },
  deleteUserByUnionId({commit,state},form){
    return deleteUserByUnionId(form).then((result) => {
      return result;
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
