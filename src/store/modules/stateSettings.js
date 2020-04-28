import {getStateMachineDetail,getEventList}  from '@/api/stateSetting'

const state ={
    stateMachine: {},
    currentEntity: 'order',
    currentStateList: []
}

const mutations = {
    SAVE_STATEMACHINE(state,obj){
        state.stateMachine = obj
    },
    SAVE_ENTITY(state,entity){
        state.currentEntity = entity
    },
    SET_CURRENT(state,current){
        state.currentStateList = current
    }
}

const actions = {
    GET_STATELIST({commit},role){
        return new Promise((resolve,reject)=>{
            getStateMachineDetail(role).then()
        })
    },
    getEventList({commit}){
        return new Promise((resolve,reject)=>{
            getEventList().then((res)=>{
                console.log(res)
                resolve()
            })
            .catch(err=>{
                console.log(err)
                reject()
            })
        })
    }
}

export default{
    namespaced: true,
    state,
    mutations,
    actions
}