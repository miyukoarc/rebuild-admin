import {addMenu,getMenuList,getMenuListByRole,addMenuForRole} from '@/api/menuManage';

const state ={
    menuList:[],//所有的菜单
    roleMenus:[]
}
// const getters = {
//     filterMenuCheck(state){
//         let menus = state.menuList;
//         let roles = state.roleMenus;
//         if (menus.length&&roles.length) {
           
//         }
//     }
// }
const mutations = {
    SET_MENULIST(state,val){
        state.menuList = val;
    },
    SET_ROLEMENU(state,val){
        state.roleMenus = val;
    }
}
const actions ={
    getMenuList({commit,state}){
        return getMenuList().then(res=>{
            commit('SET_MENULIST',res.items);
        })
    },
    getMenuListByRole({commit,state},id){
        return getMenuListByRole(id).then(res=>{
            commit('SET_ROLEMENU',res.items);
        })
    },
    addMenuForRole({commit,state},form){
        return addMenuForRole(form);
    },
    addMenu({commit,state},form){
        return addMenu(form);
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}