const state ={
    showRightPanel: false
}
const mutations = {
    TOGGLE_PANEL(state,current){
        state.showRightPanel = current
    }
}
const actions ={}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}