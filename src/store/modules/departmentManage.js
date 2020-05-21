import { getDepartmentList } from '@/api/departmentManage'
import Page from '@/utils/PageDefault'
const state ={
    loading:false,
    page: new Page(),
    departmentList: [],
    currDepartment: {},
}
const mutations = {
    SAVE_DETAIL(state,payload){

    },
    SAVE_LIST(state,payload){
        state.departmentList = payload
    },
    TOGGLE_LOADING(state,current){
        state.loading = false
    }
}

const actions ={
    getDepartmentList({commit},payload){
        commit('TOGGLE_LOADING', true)
        return new Promise((resolve,reject)=>{
            getDepartmentList().then(res=>{
                commit('SAVE_LIST',res.items)
                commit('TOGGLE_LOADING', false)
                resolve()
            }).catch(err=>{
                console.table(err)
                commit('TOGGLE_LOADING', false)
                reject()
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