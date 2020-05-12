import {
addOrgTemplate,
delOrgTemplate,
queryOrgTemplate,
updateOrgTemplate
} from '@/api/orgTemplate'

const state = {
    orgTemplateList: []
}

const mutations = {
    SAVE_LIST(state,payload){
        state.orgTemplateList = payload
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
    return new Promise((resolve,reject)=>{
        delOrgTemplate(payload).then(res=>{

        }).catch(err=>{
            console.log(err)
        })
    })
},
queryOrgTemplate({commit},payload){
    return new Promise((resolve,reject)=>{
        queryOrgTemplate(payload).then(res=>{

        }).catch(err=>{
            console.log(err)
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