import {
  getEmployeeList,
  getEmpByDepartId,
  addEmployee,
  getUserByPhone,
  addEmployForUser,
  departSetting,
  deleteUserByUnionId,
  locateUserRole
} from "@/api/employee";
// import {getDepartment} from '@/api/department';
import Page from "@/utils/PageDefault";
const state = {
  employeeList: [],
  page: new Page()
};
const mutations = {
  SAVE_EMPLOYEELIST(state, list) {
    state.employeeList = list;
  },
  CHANGE_PAGE(state, val) {
    state.page.total = val.total;
    state.page.page = val.pageNumber + 1;
    state.page.rows = val.pageSize;
  }
};
const actions = {
  getEmployeeList({ commit, state }) {
    return getEmployeeList(state.page)
      .then(res => {
        commit("SAVE_EMPLOYEELIST", res.items);
        commit("CHANGE_PAGE", res);
        return res.total;
      })
      .catch(err => {
        console.log(err);
      });
  },
  getEmpByDepartId({ commit, state }, id) {
    return getEmpByDepartId(id).then(res => {
      commit("SAVE_EMPLOYEELIST", res.items);
      return res;
    });
  },
  addEmployee({ commit, state }, id) {
    return addEmployee(form).then(res => {
      return res;
    });
  },
  getUserByPhone({ commit, state }, phone) {
    return getUserByPhone(phone).then(result => {
      return result;
    });
  },
  departSetting({ commit, state }, form) {
    return departSetting(form).then(result => {
      return result;
    });
  },
  addEmployForUser({ commit, state }, form) {
    return addEmployForUser(form).then(result => {
      return result;
    });
  },
  deleteUserByUnionId({ commit, state }, form) {
    return deleteUserByUnionId(form).then(result => {
      return result;
    });
  },
  locateUserRole({ commit, state }, form) {
    return locateUserRole(form).then(result => {
      return result;
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
