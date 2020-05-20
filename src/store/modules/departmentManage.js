import {getDepartmentList} from '@/api/departmentManage'
const state ={
    loading:false
}
const mutations = {
    SAVE_DETAIL({commit},payload){

    },
    SAVE_LIST({commit},payload){

    }
    
}
const actions ={
    getDepartmentList({commit},payload){
        return new Promise((resolve,reject)=>{
            getDepartmentList().then(res=>{
                commit('SAVE_LIST')
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