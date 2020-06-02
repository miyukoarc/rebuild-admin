import {addPenalize,deletePenalize,getPenalizeList,updatePenalize} from '@/api/licensePenalize'

const state = {
    loading: false,
    penalizeList: [],
    currentPenalize: {}
}
const mutations = {
    SAVE_LIST(state,payload){
        state.penalizeList = payload
    },
    SAVE_DETAIL(state, payload){
        state.currentPenalize = payload
    },
    TOGGLE_LOADING(state,current){
        state.loading = current
    }
}
const actions ={
    addPenalize({commit},payload){
        commit('TOGGLE_LOADING', true)
        return new Promise((resolve,reject)=>{
            addPenalize(payload).then(res=>{
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
    deletePenalize({commit}, payload){
        commit('TOGGLE_LOADING', true)
        return new Promise((resolve,reject)=>{
            deletePenalize(payload).then(res=>{
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
    getPenalizeList({commit}, payload){
        commit('TOGGLE_LOADING', true)
        return new Promise((resolve,reject)=>{
            getPenalizeList(payload).then(res=>{

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
    updatePenalize({commit}, payload){
        commit('TOGGLE_LOADING', true)
        return new Promise((resolve,reject)=>{
            updatePenalize(payload).then(res=>{

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