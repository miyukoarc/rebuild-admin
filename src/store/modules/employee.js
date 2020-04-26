import {
  getEmployeeList,
  getEmpByDepartId,
  addEmployee
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
    return new Promise((resolve,reject)=>{
      getEmpByDepartId(id).then(res => {
        commit('SAVE_EMPLOYEELIST', res.items)
        resolve(res)
      }).catch(err=>{
          console.log(err);
          reject(err)
      })
    })
  },
  addEmployee({
    commit,state
  },id) {
    return new Promise((resolve,reject)=>{
      addEmployee(form).then(res => {
        resolve(res)
      }).catch(err=>{
          console.log(err);
          reject(err)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
