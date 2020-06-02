import request from '@/utils/request'

const baseURL = 'http://10.10.10.199:40002/'

/**
 * 添加证照的规则
 * @param {object} payload 
 */

export const addReason = (payload)=>{
    return request({
        baseURL,
        url: '/license/reason/add',
        method:'post',
        data: payload
    })
}

/**
 * 删除证照的规则
 * @param {string} payload 
 */
export const deleteReason = (payload)=>{
    return request({
        baseURL,
        url: '/license/reason/delete',
        method:'post',
        data: {
            uuid: payload
        }

    })
}

/**
 * 查询证照关联的规则
 * @param {string} payload 
 */
export const getReasonList = (payload)=>{
    return request({
        baseURL,
        url: '/license/reason/queryList/'+payload,
        method:'get'
    })
}

/**
 * 修改企业证照的规则
 * @param {object} payload 
 */
export const updateReason = (payload)=>{
    return request({
        baseURL,
        url: '/license/reason/update',
        method:'post',
        data: payload
    })
}
