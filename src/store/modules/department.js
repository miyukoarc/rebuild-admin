import {getDepartment,createDepartment,updateDepartment,getDepartmentUser,getDepartmentDetail} from '@/api/department'
import {Message} from 'element-ui'
const state ={
    department: [],
    currentUsers: [],
    currentDetail: {},
    currentParent: {},
    currentChildren: [],
    // relationNest: {}
}

const mutations = {
    SAVE_DEPARTMENT(state,department){
        state.department = department
    },
    SAVE_USERS(state,users){
        state.currentUsers = users
    },
    SAVE_DETAIL(state,detail){
        state.currentDetail = detail
        if(detail.parent){
            state.currentParent = detail.parent
        }
        if(detail.children.length){
            state.currentChildren = detail.children
        }
        
    }
}

const actions = {
    getDepartment({commit}){
        return new Promise((resolve,reject)=>{
            getDepartment().then(res=>{
                //  Message({
                //     message: '操作成功',
                //     type: 'success',
                //     duration: 2 * 1000
                //     })

                commit('SAVE_DEPARTMENT',res.items)
                resolve()
            })
            .catch(err=>{
                console.log(err)
                reject()
            })
        })
    },
    createDepartment({commit},formData){
        return new Promise((resolve,reject)=>{

            createDepartment(formData).then(res=>{
               

                    console.log(res)

                    resolve()

            }).catch(err => {
                // Message({
                //     message: '添加失败',
                //     type: 'error',
                //     duration: 2 * 1000
                // })
                console.log(err)
                reject()
            })
        })
    },
    updateDepartment({commit},formData){
        return new Promise((resolve,reject)=>{

            updateDepartment(formData).then(res=>{
                // Message({
                //     message: '更新成功',
                //     type: 'success',
                //     duration: 2*1000
                // })
                resolve()
            }).catch(err=>{
                // Message
                console.log(err)
                reject()
            })
        })
    },
    getDepartmentUser({commit},id){
        return new Promise((resolve,reject)=>{
            getDepartmentUser(id).then(res=>{
                commit('SAVE_USERS',id)
                resolve()
            }).catch(err=>{
                console.log(err)
                reject()
            })
        })
    },
    getDepartmentDetail({commit},id){
        return new Promise((resolve,reject)=>{
            getDepartmentDetail(id).then(res=>{
                commit('SAVE_DETAIL',res)
                resolve()
            }).catch(err=>{
                console.log(err)
                reject()
            })
        })
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}