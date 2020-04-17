const state = {
    menu:[],
    menuMap: {}
}
const mutations = { 
    SAVE_MENU(state,menu){
        state.menu = menu
    },
    SET_MENUMAP(state,menu){
        state.menuMap = menu
        // menu.forEach(item=>{
        //     state.menuMap[item.url]=item
        // })
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