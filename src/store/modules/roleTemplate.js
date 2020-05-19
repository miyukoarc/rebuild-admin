import {
    getRoleTemplateList,
    delRoleTemplate,
    addTemplate,
    delTemplate,
    updateTemplate,
    linkMenu,
    templateQueryList,
    templateQueryById,
    templateQueryByCode,
    templateQueryByName,
} from '@/api/roleTemplate';
const state ={
    loading:false,
    orgList:[],
    roleTemplates: [],
    currRoleTemplate: {}
}
const mutations = {
    SET_ORGLIST(state,val){
        state.orgList = val;
    },
    SET_LOADING(state,val){
        state.loading = val;
    },
    /**
     * 
     */
    SAVE_DETAIL(state,payload){
        state.currRoleTemplate = payload
    },
    SAVE_LIST(state,payload){
        state.roleTemplates = payload
    },
    TOGGLE_LOADING(state,current){
        state.loading = current
    }
}
const actions ={
    getRoleTemplateList({commit,state},code){
        commit("SET_LOADING",true)
        return getRoleTemplateList(code).then((result) => {
                commit("SET_ORGLIST",result.items);
                commit("SET_LOADING",false);
            }).catch((err) => {
                commit("SET_LOADING",false);
                throw new Error(err);
            });
    },
    delRoleTemplate({commit,state},form){
        commit("SET_LOADING",true)
        return delRoleTemplate(form).then((result) => {
                commit("SET_LOADING",false);
            }).catch((err) => {
                commit("SET_LOADING",false);
                throw new Error(err);
            })
    },
    /**
     * 
     */
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
    linkMenu({commit},payload){
        commit('TOGGLE_LOADING',true)
        return new Promise((resolve,reject)=>{
            linkMenu(payload).then(()=>{
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
            templateQueryList(payload).then((res)=>{
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
    templateQueryById({commit},payload){
        commit('TOGGLE_LOADING',true)
        return new Promise((resolve,reject)=>{
            templateQueryById(payload).then((res)=>{
                commit('SAVE_DETAIL',res.items[0])
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
    templateQueryByName({commit},payload){
        commit('TOGGLE_LOADING',true)
        return new Promise((resolve,reject)=>{
            templateQueryByName(payload).then(()=>{
                commit('SAVE_DETAIL',res.items[0])
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