const state ={
    showRightPanel: false,
    showConversationProfile: true,

}
const mutations = {
    TOGGLE_PANEL(state,current){
        state.showRightPanel = current
    },
    TOGGLE_CONVERSATIONPROFILE(state,current){
        state.showConversationProfile = current
    }
}
const actions ={

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}