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
    }
}

const actions = {

}

export default{
    namespaced: true,
    state,
    mutations,
    actions
}