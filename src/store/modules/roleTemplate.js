import {getRoleTemplateList,delRoleTemplate} from '@/api/roleTemplate';
const state ={
    loading:false,
    orgList:[]
}
const mutations = {
    SET_ORGLIST(state,val){
        state.orgList = val;
    },
    SET_LOADING(state,val){
        state.loading = val;
    }
}
const actions ={
    getRoleTemplateList({commit,state},code){
        commit("SET_LOADING",true)
        return new Promise((resolve,reject)=>{
            getRoleTemplateList(code).then((result) => {
                commit("SET_ORGLIST",result.items);
                commit("SET_LOADING",false);
            }).catch((err) => {
                commit("SET_LOADING",false)
            });
        })
    },
    delRoleTemplate({commit,state},form){
        commit("SET_LOADING",true)
        return new Promise((resolve,reject)=>{
            delRoleTemplate(form).then((result) => {
                commit("SET_LOADING",false);
            }).catch((err) => {
                commit("SET_LOADING",false)
            });
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}