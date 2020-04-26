import {
  getDepartment,
  createDepartment,
  updateDepartment,
  getDepartmentUser,
  getDepartmentDetail,
  getDepartmentList,
  deleteDepartment,
  getAllDepartments,
  setDepartmentManager
} from "@/api/department";
import { Message } from "element-ui";
import Page from "@/utils/PageDefault";
import { isEmpty } from "@/utils/normal";

const columns = [
  {
    visible: true,
    label: "名称",
    prop: "name",
    uuid: 2,
    align: "center"
  },
  {
    visible: true,
    label: "主管",
    prop: "manager",
    uuid: 3,
    align: "center",
    sort: false,
    formatter: function(row, column, cellValue, index) {
      if (cellValue) {
        return cellValue.nickname;
      }
      return "";
    }
  },
  {
    visible: true,
    label: "上级部门",
    prop: "parent",
    uuid: 5,
    align: "center",
    sort: false,
    formatter: function(row, column, cellValue, index) {
      if (cellValue) {
        return cellValue.name;
      }
      return "";
    }
  },
  {
    visible: true,
    label: "人数",
    prop: "users",
    uuid: 6,
    align: "center",
    sort: false,
    formatter: function(row, column, cellValue, index) {
      if (!isEmpty(cellValue)) {
        return cellValue.length;
      }
      return "";
    }
  },
  {
    visible: true,
    label: "创建时间",
    prop: "createdAt",
    uuid: 4,
    align: "center"
  },
  {
    visible: true,
    label: "Code",
    prop: "code",
    uuid: 1,
    sort: false,
    align: "center"
  },
  {
    visible: true,
    label: "操作",
    prop: "caozuo",
    align: "center",
    sort: false,
    type: "button",
    width: "240"
  }
];
const state = {
  department: [],
  currentUsers: [],
  currentDetail: {},
  currentParent: {},
  currentChildren: [],
  departList: [],
  page: new Page(),
  allDepartments: [],
  columns: columns
  // relationNest: {}
};

const mutations = {
  SAVE_DEPARTMENT(state, department) {
    state.department = department;
  },
  SAVE_USERS(state, users) {
    state.currentUsers = users;
  },
  SAVE_DETAIL(state, detail) {
    state.currentDetail = detail;
    if (detail.parent) {
      state.currentParent = detail.parent;
    }
    if (detail.children && detail.children.length) {
      state.currentChildren = detail.children;
    }
  },
  SET_DEPARTLIST(state, val) {
    state.departList = val;
  },
  SAVE_ALLDEPARTMENT(state, all) {
    state.allDepartments = all;
  },
  CHANGE_PAGE(state, val) {
    state.page.total = val.total;
    state.page.page = val.pageNumber + 1;
    state.page.rows = val.pageSize;
  }
};

const actions = {
  /**
   *
   * @param {*} param0 get department tree
   */
  getDepartment({ commit }) {
    return new Promise((resolve, reject) => {
      getDepartment()
        .then(res => {
          //  Message({
          //     message: '操作成功',
          //     type: 'success',
          //     duration: 2 * 1000
          //     })

          commit("SAVE_DEPARTMENT", res.items);
          resolve();
        })
        .catch(err => {
          console.log(err);
          reject();
        });
    });
  },
  /**
   *
   * @param {*} param0
   * @param {*} formData
   * add new department
   */
  createDepartment({ commit }, formData) {
    return new Promise((resolve, reject) => {
      createDepartment(formData)
        .then(res => {
          console.log(res);

          resolve(res);
        })
        .catch(err => {
          // Message({
          //     message: '添加失败',
          //     type: 'error',
          //     duration: 2 * 1000
          // })
          console.log(err);
          reject();
        });
    });
  },
  /**
   *
   * @param {*} param0
   * @param {*} formData
   *
   * updata department info
   */
  updateDepartment({ commit }, formData) {
    return new Promise((resolve, reject) => {
      updateDepartment(formData)
        .then(res => {
          // Message({
          //     message: '更新成功',
          //     type: 'success',
          //     duration: 2*1000
          // })
          resolve();
        })
        .catch(err => {
          // Message
          console.log(err);
          reject();
        });
    });
  },
  /**
   *
   * @param {*} param0
   * @param {*} id
   *
   * get users of the department
   */
  getDepartmentUser({ commit }, id) {
    return new Promise((resolve, reject) => {
      getDepartmentUser(id)
        .then(res => {
          commit("SAVE_USERS", id);
          resolve();
        })
        .catch(err => {
          console.log(err);
          reject();
        });
    });
  },
  /**
   *
   * @param {*} param0
   * @param {*} id
   * get department detail
   */
  getDepartmentDetail({ commit }, id) {
    return new Promise((resolve, reject) => {
      getDepartmentDetail(id).then(res => {
        commit("SAVE_DETAIL", res);
        resolve();
      });
    }).catch(err => {
      console.log(err);
      reject();
    });
  },
  /**
   *
   * @param {*} param0
   * @param {*} data
   * delete department
   */
  deleteDepartment({ commit }, data) {
    return new Promise((resolve, reject) => {
      deleteDepartment(data)
        .then(res => {
          commit("component/TOGGLE_PANEL", false, { root: true });
          resolve();
        })
        .catch(err => {
          // console.log()
          reject("请先删除该部门所有员工和下属部门");
        });
    });
  },
  /**
   * get department list
   */
  getDepartmenList({ commit, state }) {
    return new Promise((resolve, reject) => {
      getDepartmentList(state.page)
        .then(result => {
          commit("SET_DEPARTLIST", result.items);
          commit("CHANGE_PAGE", result);
          resolve();
        })
        .catch(err => {
          console.log(err);
          reject();
        });
    });
  },
  getAllDepartments({ commit }) {
    return new Promise((resolve, reject) => {
      getAllDepartments()
        .then(res => {
          commit("SAVE_ALLDEPARTMENT", res.items);
          resolve();
        })
        .catch(err => {
          console.log(err);
          reject();
        });
    });
  },
  setDepartmentManager({ commit }, data) {
    return new Promise((resolve, reject) => {
      setDepartmentManager(data)
        .then(res => {
          resolve();
        })
        .catch(err => {
          console.log(err);
          reject();
        });
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
