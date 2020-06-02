import request from '@/utils/request'

const baseURL = 'http://10.10.10.199:40002/'

/**
 * 添加证照的惩罚
 * @param {object} payload 
 */

export const addPenalize = (payload)=>{
    return request({
        baseURL,
        url: '/license/penalize/add',
        method:'post',
        data: payload
    })
}

/**
 * 删除证照的惩罚
 * @param {string} payload 
 */
export const deletePenalize = (payload)=>{
    return request({
        baseURL,
        url: '/license/penalize/delete',
        method:'post',
        data: {
            uuid: payload
        }

    })
}

/**
 * 查询证照关联的惩罚
 * @param {string} payload 
 */
export const getPenalizeList = (payload)=>{
    return request({
        baseURL,
        url: '/license/penalize/queryList/'+payload,
        method:'get'
    })
}

/**
 * 修改企业证照的惩罚
 * @param {object} payload 
 */
export const updatePenalize = (payload)=>{
    return request({
        baseURL,
        url: '/license/penalize/update',
        method:'post',
        data: payload
    })
}
