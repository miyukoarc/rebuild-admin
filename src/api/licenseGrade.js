import request from '@/utils/request'

const baseURL = 'http://10.10.10.199:40002/'

/**
 * 添加证照的等级
 * @param {object} payload 
 */

export const addGrade = (payload)=>{
    return request({
        baseURL,
        url: '/license/grade/add',
        method:'post',
        data: payload
    })
}

/**
 * 删除证照的等级
 * @param {string} payload 
 */
export const deleteGrade = (payload)=>{
    return request({
        baseURL,
        url: '/license/grade/delete',
        method:'post',
        data: {
            uuid: payload
        }

    })
}

/**
 * 查询证照关联的等级
 * @param {string} payload 
 */
export const getGradeList = (payload)=>{
    return request({
        baseURL,
        url: '/license/grade/queryList/'+payload,
        method:'get'
    })
}

/**
 * 修改企业证照的等级
 * @param {object} payload 
 */
export const updateGrade = (payload)=>{
    return request({
        baseURL,
        url: '/license/grade/update',
        method:'post',
        data: payload
    })
}
