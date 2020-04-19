const state = {
    menu:[],
    menuMap: {},
    hasSecondMenu: false,
    currSecondMenu: [],
    menuType: ''
}
const mutations = { 
    SAVE_MENU(state,menu){
        state.menu = menu
    },
    SET_MENUMAP(state,menu){
        state.menuMap = menu
    },
    TOGGLE_STATE(state, current){
        state.hasSecondMenu = current
    },
    TOGGLE_TYPE(state,type){
        state.menuType = type
    },
    SAVE_SECONDMENU(state,menu){
        state.currSecondMenu = menu
    }
}

const actions = {
    
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}