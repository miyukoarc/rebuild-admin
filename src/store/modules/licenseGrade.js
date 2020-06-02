import {addGrade,deleteGrade,getGradeList,updateGrade} from '@/api/licenseGrade'

const state = {
    loading: false,
    gradeList: [],
    currentGrade: {}
}
const mutations = {
    SAVE_LIST(state,payload){
        state.gradeList = payload
    },
    SAVE_DETAIL(state, payload){
        state.currentGrade = payload
    },
    TOGGLE_LOADING(state,current){
        state.loading = current
    }
}
const actions ={
    addGrade({commit},payload){
        commit('TOGGLE_LOADING', true)
        return new Promise((resolve,reject)=>{
            addGrade(payload).then(res=>{
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
    deleteGrade({commit}, payload){
        commit('TOGGLE_LOADING', true)
        return new Promise((resolve,reject)=>{
            deleteGrade(payload).then(res=>{
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
    getGradeList({commit}, payload){
        commit('TOGGLE_LOADING', true)
        return new Promise((resolve,reject)=>{
            getGradeList(payload).then(res=>{

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
    updateGrade({commit}, payload){
        commit('TOGGLE_LOADING', true)
        return new Promise((resolve,reject)=>{
            updateGrade(payload).then(res=>{

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