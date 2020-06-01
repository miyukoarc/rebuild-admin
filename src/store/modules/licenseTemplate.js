import {addLicense,getLicenseList,getLicenseByOrg,deleteLicense} from '@/api/licenseTemplate'

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
    addLicense({commit},payload){
        commit('TOGGLE_LOADING', true)
        return new Promise((resolve,reject)=>{
            addLicense(payload).then(res=>{
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
    getLicenseByOrg({commit}, payload){
        commit('TOGGLE_LOADING', true)
        return new Promise((resolve,reject)=>{
            getLicenseByOrg(payload).then(res=>{

                commit('TOGGLE_LOADING', false)
                commit('SAVE_CURRENT',res.items[0])
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