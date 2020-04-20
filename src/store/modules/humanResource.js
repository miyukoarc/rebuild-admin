import {getDepartment} from '@/api/humanResource'

const state ={
    department: []
}

const mutations = {
    SAVE_DEPARTMENT(state,department){
        state.department = department
    }
}

const actions = {
    getDepartment({commit}){
        return new Promise((resolve,reject)=>{
            getDepartment().then(res=>{
                commit('SAVE_DEPARTMENT',res.items)
                // console.log(res.items)
            })
            .catch(err=>{
                console.log(err)
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