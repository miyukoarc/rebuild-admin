import {
  getDepartment,
  createDepartment,
  updateDepartment,
  getDepartmentUser,
  getDepartmentDetail,
  getDepartmenList,
  deleteDepartment
} from "@/api/department";
import {
  Message
} from "element-ui";
import Page from "@/utils/PageDefault";

const columns = [{
    visible: true,
    label: "Code",
    prop: "code",
    uuid: 1,
    align: "center"
  },
  {
    visible: true,
    label: "名称",
    prop: "name",
    uuid: 2,
    align: "center"
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
    label: "操作",
    prop: "caozuo",
    align: "center",
    sort: false,
    showCaozuo: true,
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
    if (detail.children&&detail.children.length) {
      state.currentChildren = detail.children;
    }
  },
  SET_DEPARTLIST(state, val) {
    state.departList = val;
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
     * @param {*} param0 get departmentlist
     */
  getDepartment({
    commit
  }) {
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
  createDepartment({
    commit
  }, formData) {
    return new Promise((resolve, reject) => {
      createDepartment(formData)
        .then(res => {
          console.log(res);

          resolve();
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
  updateDepartment({
    commit
  }, formData) {
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
  getDepartmentUser({
    commit
  }, id) {
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
  getDepartmentDetail({
    commit
  }, id) {
    return new Promise((resolve, reject) => {
      getDepartmentDetail(id)
        .then(res => {
          commit("SAVE_DETAIL", res);
          resolve();
        })
    }).catch(err => {
      console.log(err)
      reject()
    })
  },
  /**
   * 
   * @param {*} param0 
   * @param {*} data 
   * delete department
   */
  deleteDepartment({
    commit
  }, data) {

    console.warn(data)
    return new Promise((resolve, reject) => {
      deleteDepartment(data).then(res => {
          commit('component/TOGGLE_PANEL',false,{root:true})
        resolve()
      }).catch(err => {
        console.log(err)
        reject()
      })
    })
  },
  getDepartmenList({
    commit,
    state
  }) {
    return getDepartmenList(state.page)
      .then(result => {
        commit("SET_DEPARTLIST", result.items);
        commit("CHANGE_PAGE", result);
      }).catch(err => {
        console.log(err);
        reject();
      });
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
