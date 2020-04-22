import {treeNode} from '@/utils/normal'
const state = {
    menu:[],
    menuMap: {},
    hasSecondMenu: false,
    currSecondMenu: [],
    openArr: [],
    menuModule: '',
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
    },//二级菜单是否展示
    TOGGLE_TYPE(state,type){
        state.menuType = type
    },//菜单类型
    SAVE_SECONDMENU(state,menu){
        state.currSecondMenu = menu
    },
    SAVE_MODULE(state,module){
        state.menuModule = module
    },
    SET_OPENARR(state,menu){
        state.openArr = treeNode(menu,'name')
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