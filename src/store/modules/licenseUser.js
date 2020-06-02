import {publishLicense,getLicenseList,getLicenseByOne,deleteLicense} from '@/api/licenseUser'

const state = {
    loading: false,
    licenseList: [],
    currentLicense: {}
}
const mutations = {
    SAVE_LIST(state,payload){
        state.licenseList = payload
    },
    SAVE_DETAIL(state, payload){
        state.currentLicense = payload
    },
    TOGGLE_LOADING(state,current){
        state.loading = current
    }
}
const actions ={
    publishLicense({commit},payload){
        commit('TOGGLE_LOADING', true)
        return new Promise((resolve,reject)=>{
            publishLicense(payload).then(res=>{
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
    getLicenseList({commit}, payload){
        commit('TOGGLE_LOADING', true)
        return new Promise((resolve,reject)=>{
            getLicenseList(payload).then(res=>{
                console.log(res)
                commit('TOGGLE_LOADING', false)
                commit('SAVE_LIST',res.items)
                resolve()
                
            })
            .catch((err)=>{
                console.log(err)
                commit('TOGGLE_LOADING', false)
                reject()
            })
        })
    },
    getLicenseByOne({commit}, payload){
        commit('TOGGLE_LOADING', true)
        return new Promise((resolve,reject)=>{
            getLicenseByOne(payload).then(res=>{

                commit('TOGGLE_LOADING', false)
                commit('SAVE_DETAIL',res.items[0])
                resolve()
                
            })
            .catch((err)=>{
                console.log(err)
                commit('TOGGLE_LOADING', false)
                reject()
            })
        })
    },
    deleteLicense({commit}, payload){
        commit('TOGGLE_LOADING', true)
        return new Promise((resolve,reject)=>{
            deleteLicense(payload).then(res=>{

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