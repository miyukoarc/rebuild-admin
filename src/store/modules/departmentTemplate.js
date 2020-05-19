
import {
    addTemplate,
    delTemplate,
    updateTemplate,
    templateQueryList,
    templateQueryById,
    templateQueryByCode,
    templateQueryByTree,
    templateQueryByName
} from '@/api/departmentTemplate'

const state ={
    loading:false,
    currDepartmentTemplate: {},
    departmentTemplates: []
}
const mutations = {
    SAVE_LIST(state,payload){
        state.departmentTemplates = payload
    },
    SAVE_DETAIL(state,payload){
        state.currDepartmentTemplate = payload
    },
    TOGGLE_LOADING(state,current){
        state.loading = current
    }
}
const actions ={
    addTemplate({commit},payload){
        commit('TOGGLE_LOADING',true)
        return new Promise((resolve,reject)=>{
            addTemplate(payload).then(()=>{

                commit('TOGGLE_LOADING',false)
                resolve()
            }).catch(err=>{
                commit('TOGGLE_LOADING',false)
                console.log(err)
                reject()
            })
        })
    },
    delTemplate({commit},payload){
        commit('TOGGLE_LOADING',true)
        return new Promise((resolve,reject)=>{
            delTemplate(payload).then(()=>{

                commit('TOGGLE_LOADING',false)
                resolve()
            }).catch(err=>{
                commit('TOGGLE_LOADING',false)
                console.log(err)
                reject()
            })
        })
    },
    updateTemplate({commit},payload){
        commit('TOGGLE_LOADING',true)
        return new Promise((resolve,reject)=>{
            updateTemplate(payload).then(()=>{

                commit('TOGGLE_LOADING',false)
                resolve()
            }).catch(err=>{
                commit('TOGGLE_LOADING',false)
                console.log(err)
                reject()
            })
        })
    },
    templateQueryList({commit},payload){
        commit('TOGGLE_LOADING',true)
        return new Promise((resolve,reject)=>{
            templateQueryList(payload).then(()=>{

                commit('TOGGLE_LOADING',false)
                resolve()
            }).catch(err=>{
                commit('TOGGLE_LOADING',false)
                console.log(err)
                reject()
            })
        })
    },
    templateQueryById({commit},payload){
        commit('TOGGLE_LOADING',true)
        return new Promise((resolve,reject)=>{
            templateQueryById(payload).then(()=>{

                commit('TOGGLE_LOADING',false)
                resolve()
            }).catch(err=>{
                commit('TOGGLE_LOADING',false)
                console.log(err)
                reject()
            })
        })
    },
    templateQueryByCode({commit},payload){
        commit('TOGGLE_LOADING',true)
        return new Promise((resolve,reject)=>{
            templateQueryByCode(payload).then((res)=>{
                commit('SAVE_LIST',res.items)
                commit('TOGGLE_LOADING',false)
                resolve()
            }).catch(err=>{
                commit('TOGGLE_LOADING',false)
                console.log(err)
                reject()
            })
        })
    },
    templateQueryByTree({commit},payload){
        commit('TOGGLE_LOADING',true)
        return new Promise((resolve,reject)=>{
            templateQueryByTree(payload).then(()=>{

                commit('TOGGLE_LOADING',false)
                resolve()
            }).catch(err=>{
                commit('TOGGLE_LOADING',false)
                console.log(err)
                reject()
            })
        })
    },
    templateQueryByName({commit},payload){
        commit('TOGGLE_LOADING',true)
        return new Promise((resolve,reject)=>{
            templateQueryByName(payload).then(()=>{

                commit('TOGGLE_LOADING',false)
                resolve()
            }).catch(err=>{
                commit('TOGGLE_LOADING',false)
                console.log(err)
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