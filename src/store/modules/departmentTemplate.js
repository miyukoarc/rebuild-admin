
import {
    addTemplate,
    delTemplate,
    updateTemplate,
    templateQueryList,
    templateQueryById,
    templateQueryByCode,
    templateQueryByTree,
} from '@/api/departmentTemplate'

const state ={
    loading:false,
    currDepartmentTemplate: {},
    departmentTemplates: []
}
const mutations = {
    SAVE_LIST(){},
    SAVE_DETAIL(){},
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
                commit('SAVE_DETAIL',res.items)
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
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}