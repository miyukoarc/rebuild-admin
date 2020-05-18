import {
addOrgTemplate,
delOrgTemplate,
orgTemplateQueryList,
orgTemplateQueryById,
orgTemplateQueryByCode,
updateOrgTemplate
} from '@/api/orgTemplate'
import Page from "@/utils/PageDefault";


const state = {
    orgTemplateList: [],
    currOrgTemplate: {},
    loading: false,
    page: new Page()
}

const mutations = {
    SAVE_LIST(state,payload){
        state.orgTemplateList = payload
    },
    SAVE_DETAIL(state,payload){
        state.currOrgTemplate = payload
    },
    TOGGLE_LOADING(state,payload){
        state.loading = payload
    }
}

const actions = {
addOrgTemplate({commit},payload){
    console.log(payload)
    return new Promise((resolve,reject)=>{
        addOrgTemplate(payload).then(res=>{
            console.log(res)
            resolve()
        }).catch(err=>{
            console.log(err)
            reject()
        })
    })
},
delOrgTemplate({commit},payload){
    commit('TOGGLE_LOADING',true)
    return new Promise((resolve,reject)=>{

        delOrgTemplate(payload).then(res=>{
        commit('TOGGLE_LOADING',false)
        resolve()
        }).catch(err=>{
            
            console.log(err)
            commit('TOGGLE_LOADING',false)
            reject()
        })
    })
},
orgTemplateQueryList({commit}){
    commit('TOGGLE_LOADING',true)
    return new Promise((resolve,reject)=>{
        orgTemplateQueryList().then(res=>{
            commit('SAVE_LIST',res.items)
            commit('TOGGLE_LOADING',false)
            resolve()
        }).catch(err=>{
            console.log(err)
            commit('TOGGLE_LOADING',false)
            reject()
        })
    })
},
orgTemplateQueryById({commit},payload){
    commit('TOGGLE_LOADING',true)
    return new Promise((resolve, reject)=>{
        orgTemplateQueryById(payload).then(res=>{
            commit('SAVE_DETAIL',res.items)
            commit('TOGGLE_LOADING',false)
            resolve()
        })
        .catch(err => {
            console.log(err)
            commit('TOGGLE_LOADING',false)
            reject()
        })
    })

},
orgTemplateQueryByCode({commit},payload){
    commit('TOGGLE_LOADING',true)
    return new Promise((resolve, reject)=>{
        orgTemplateQueryByCode(payload).then(res=>{
            commit('SAVE_DETAIL',res.items[0])
            commit('TOGGLE_LOADING',false)
            resolve()
        })
        .catch(err => {
            console.log(err)
            commit('TOGGLE_LOADING',false)
            reject()
        })
    })
}
,
updateOrgTemplate({commit},payload){
    return new Promise((resolve,reject)=>{
        updateOrgTemplate(payload).then(res=>{
            resolve()
        }).catch(err=>{
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