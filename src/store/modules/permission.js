import store from '@/store'
import {constantRoutes,asyncRoutes} from '@/router'
/**
 * 过滤权限路由表,将之与后台获取的menu作比较,menu中存在什么就将权限路由表中对应的加入到新生成的表中
 */
function filterAsyncRoutes(routes){
    const res = []

    const menu = store.state.secondMenu.menuMap
    routes.children.forEach(route=>{
        Object.keys(menu).forEach(url=>{
            // if(!url.includes('http')){
            //     if(route.path){
            //         res.push(route)
            //     }
            // }
            if(url.includes(route.path)){
                res.push(route)
            }
        })
    })
    console.log(res,'filter函数中过滤后的路由')
    return res
}

const state = {
    unlimitedRouter: [],//无限制路由
    filtedRouter: [],//过滤后的路由
    accessedRouter: []//menu过滤后的路由及无限制路由
}
const mutations = {
    SET_ROUTE(state,routes){
        state.filtedRouter = routes
        state.unlimitedRouter = constantRoutes
        state.accessedRouter = constantRoutes.concat(routes)
    }
}

const actions = {
    generateRoutes:({commit})=>{
        return new Promise(resolve=>{

            // let filtedRoutes  = filterAsyncRoutes(asyncRoutes)

            console.log(asyncRoutes)

            commit('SET_ROUTE',asyncRoutes)

            window.localStorage.setItem('filtedRoutes',JSON.stringify(asyncRoutes))

            resolve()
        })

        
        
    }

}

export default {
    namespaced: true,
    state,
    actions,mutations
}