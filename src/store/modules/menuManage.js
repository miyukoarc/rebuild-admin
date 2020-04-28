import {addMenu,getMenuList,getMenuListByRole} from '@/api/menuManage';

const state ={
    menuList:[],//所有的菜单
    roleMenus:[]
}
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
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}