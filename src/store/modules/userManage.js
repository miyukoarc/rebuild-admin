import { getNormalUsers,getNormalUserDetail,disableUser,enableUser,kickUser } from "@/api/userManage.js";
import Page from "@/utils/PageDefault";
const userInit = {
  userList: [],
  userPage: new Page(),
  
};

const state = {
...userInit,
  userDetail: {}
};

const mutations = {
  SAVE_USERLIST(state, list) {
    state.userList = list;
  }
};
const actions = {
  getNormalUser({ commit, state }) {
    return new Promise((resolve, reject) => {
      getNormalUsers()
        .then(res => {
          commit('SAVE_USERLIST',res.items)
          resolve();
        })
        .catch(err => {
          console.log(err);
          reject();
        });
    });
  },
  getNormalUserDetail ({commit},id){
    return new Promise((resolve,reject) => {
      getNormalUserDetail(id)
        .then(res => {
          commit('SAVE_DETAIL',res)
          resolve()
        })
        .catch(err=>{
          console.log(err)
          reject()
        })
    })
  },
  /**
   * 禁用用户
   */
  disableUser({commit},data){
    return new Promise((resolve,reject) => {
      disableUser(data)
        .then(res => {
          resolve()
        })
        .catch(err=>{
          console.log(err)
          reject()
        })
    })
  },
  /**
   * 启用用户
   */
  enableUser({commit},data){
    return new Promise((resolve,reject) => {
      enableUser(data)
        .then(res => {
          resolve()
        })
        .catch(err=>{
          console.log(err)
          reject()
        })
    })
  },
  /**
   * 踢下线
   */
  kickUser({commit},data){
    return new Promise((resolve,reject) => {
      kickUser(data)
        .then(res => {
          resolve()
        })
        .catch(err=>{
          console.log(err)
          reject()
        })
    })
  },


};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
