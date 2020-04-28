import API from "@/api/roleManage";
import Page from "@/utils/PageDefault";

const roleInit = {
  roleList: [],
  rolePage: new Page(),
  columns: [
    {
      visible: true,
      label: "Code",
      prop: "code",
      uuid: 3,
      align: "center"
    },
    {
      visible: true,
      label: "名称",
      prop: "name",
      uuid: 1,
      align: "center"
    },
    {
      visible: true,
      label: "终端",
      prop: "terminal",
      uuid: 2,
      align: "center",
      formatter: function(row, column, cellValue, index) {
        if (cellValue == "ORG") {
          return "企业端";
        } else if (cellValue == "USER") {
          return "用户端";
        }
        return "";
      }
    },
    {
      visible: true,
      label: "创建时间",
      prop: "createdAt",
      align: "center"
    },
    {
      visible: true,
      label: "操作",
      prop: "caozuo",
      align: "center",
      sort: false,
      type:'button',
      width: "240"
    }
  ]
};

const state = {
  ...roleInit,
};
const mutations = {
  SET_ROLELIST(state, val) {
    state.roleList = val;
  },
  CHANGE_ROLE_PAGE(state, val) {
    state.rolePage.total = val.total;
    state.rolePage.page = val.pageNumber+1;
    state.rolePage.rows = val.pageSize;
  }
};
const actions = {
  getRoleList({ commit, state }) {
    return API.getRoleList(state.rolePage)
      .then(result => {
        //   console.log(result);
        commit('SET_ROLELIST',result.items);
        commit('CHANGE_ROLE_PAGE',result);
        // return result;
      })
  },
  addRole({ commit, state },form){
    return API.addRole(form)
      .then(result => {
        //   console.log(result);
        return result;
      })
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
