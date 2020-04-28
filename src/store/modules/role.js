import API from '@/api/roleManage';
import Page from '@/utils/PageDefault';

const state ={
    roleList:[],
    page:new Page()
}
const mutations = {
    SET_ROLELIST(state,val){
        state.roleList =  val;
    }
}
const actions ={
    getRoleList({commit,state}){
        return API.getRoleList(state.page.isNull()).then(res=>{
            commit('SET_ROLELIST',res.items);
        })
    }

}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}