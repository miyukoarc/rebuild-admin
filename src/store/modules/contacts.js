import {getUserProfileByUserId} from '@/api/contacts'

const state ={
    currentContact:{}
}
const mutations = {
    SAVE_CURRENTCONTACT:(state,info)=>{
        state.currentContact = info
    }
}
const actions ={

    getUserProfileByUserId({commit},id){
        return new Promise((resolve,reject)=>{
            getUserProfileByUserId(id).then(res=>{
                console.log(res)
                commit('SAVE_CURRENTCONTACT',res)
                resolve()
            }).catch(err=>{
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