import request from '@/utils/request'

const baseURL = 'http://10.10.10.199:40002/'


/**
 * 添加规则
 * @param {object} payload
 */

 export const addReason = (payload) => {
     return request({
         baseURL,
         url: '/license/reason/add',
         method: 'post',
         data: payload
     })
 } 

 /**
  * 删除规则
 * @param {string} payload
 */

export const deleteReason = (payload) => {
    return request({
        baseURL,
        url: '/license/reason/delete',
        method: 'post',
        data: {
            uuid: payload
        }
    })
}

/**
 * 查找规则
 * @param {string} payload
 */

export const getReason = (payload) => {
    return request({
        baseURL,
        url: '/license/reason/queryList',
        method: 'get',
        params: {
            licenseTemplateReasonId: payload
        } 
    })
} 

/**
 * 升级规则
 * @param {object} payload
 */

export const updateReason = (payload) => {
    return request({
        baseURL,
        url: '/license/reason/update',
        method: 'post',
        data: payload
    })
} 

/**
 * 启用规则
 * @param {string} payload
 */

export const enableReason = (payload) => {
    return request({
        baseURL,
        url: '/license/reason/update/enable',
        method: 'post',
        data: {
            uuid: payload
        }
    })
} 