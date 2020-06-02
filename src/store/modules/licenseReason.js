import {addReason,deleteReason,getReasonList,updateReason} from '@/api/licenseReason'

const state = {
    loading: false,
    reasonList: [],
    currentReason: {}
}
const mutations = {
    SAVE_LIST(state,payload){
        state.reasonList = payload
    },
    SAVE_DETAIL(state, payload){
        state.currentReason = payload
    },
    TOGGLE_LOADING(state,current){
        state.loading = current
    }
}
const actions ={
    addReason({commit},payload){
        commit('TOGGLE_LOADING', true)
        return new Promise((resolve,reject)=>{
            addReason(payload).then(res=>{
                console.log(res)
                commit('TOGGLE_LOADING', false)
                resolve()
            })
            .catch((err)=>{
                console.log(err)
                commit('TOGGLE_LOADING', false)
                
                reject()
            })
        })
    },
    deleteReason({commit}, payload){
        commit('TOGGLE_LOADING', true)
        return new Promise((resolve,reject)=>{
            deleteReason(payload).then(res=>{
                console.log(res)
                commit('TOGGLE_LOADING', false)
                
                resolve()
                
            })
            .catch((err)=>{
                console.log(err)
                commit('TOGGLE_LOADING', false)
                reject()
            })
        })
    },
    getReasonList({commit}, payload){
        commit('TOGGLE_LOADING', true)
        return new Promise((resolve,reject)=>{
            getReasonList(payload).then(res=>{

                commit('TOGGLE_LOADING', false)
                if(res.items.length){
                    commit('SAVE_LIST',res.items)
                }
                
                resolve()
                
            })
            .catch((err)=>{
                console.log(err)
                commit('TOGGLE_LOADING', false)
                reject()
            })
        })
    },
    updateReason({commit}, payload){
        commit('TOGGLE_LOADING', true)
        return new Promise((resolve,reject)=>{
            updateReason(payload).then(res=>{

                commit('TOGGLE_LOADING', false)
                resolve()
            })
            .catch((err)=>{
                console.log(err)
                commit('TOGGLE_LOADING', false)
                reject()
            })
        })
    },

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}