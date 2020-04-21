import store from '@/store'
import {staticRoutes,dynamicRoutes} from '@/router'
/**
 * 过滤权限路由表,将之与后台获取的menu作比较,menu中存在什么就将权限路由表中对应的加入到新生成的表中
 */


const state = {
    unlimitedRouter: [],//无限制路由
    filtedRouter: [],//过滤后的路由
    accessedRouter: []//menu过滤后的路由及无限制路由
}
const mutations = {
    SET_ROUTE(state,routes){
        state.filtedRouter = routes
        state.unlimitedRouter = staticRoutes
        state.accessedRouter = staticRoutes.concat(routes)
    }
}

const actions = {
    generateRoutes:({commit})=>{
        return new Promise(resolve=>{

            // let filtedRoutes  = filterdynamicRoutes(dynamicRoutes)

            console.log(dynamicRoutes)

            commit('SET_ROUTE',dynamicRoutes)

            // window.localStorage.setItem('filtedRoutes',JSON.stringify(dynamicRoutes))

            resolve()
        })

        
        
    }

}

export default {
    namespaced: true,
    state,
    actions,mutations
}