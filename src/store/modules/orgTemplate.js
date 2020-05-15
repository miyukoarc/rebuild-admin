import {
addOrgTemplate,
delOrgTemplate,
queryOrgTemplate,
updateOrgTemplate
} from '@/api/orgTemplate'


const state = {
    orgTemplateList: [],
    loading: false,
}

const mutations = {
    SAVE_LIST(state,payload){
        state.orgTemplateList = payload
    },
    TOGGLE_LOADING(state,payload){
        state.loading = payload
    }
}

const actions = {
addOrgTemplate({commit},payload){
    return new Promise((resolve,reject)=>{
        addOrgTemplate(payload).then(res=>{

        }).catch(err=>{
            console.log(err)
        })
    })
},
delOrgTemplate({commit},payload){
    commit('TOGGLE_LOADING',true)
    return new Promise((resolve,reject)=>{
        delOrgTemplate(payload).then(res=>{
        commit('TOGGLE_LOADING',false)
        }).catch(err=>{
            console.log(err)
            commit('TOGGLE_LOADING',false)
        })
    })
},
queryOrgTemplate({commit},payload){
    commit('TOGGLE_LOADING',true)
    return new Promise((resolve,reject)=>{
        queryOrgTemplate(payload).then(res=>{
            commit('SAVE_LIST',res.item)
            commit('TOGGLE_LOADING',false)
        }).catch(err=>{
            console.log(err)
            commit('TOGGLE_LOADING',false)
        })
    })
},
updateOrgTemplate({commit},payload){
    return new Promise((resolve,reject)=>{
        updateOrgTemplate(payload).then(res=>{

        }).catch(err=>{
            console.log(err)
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