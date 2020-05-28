import request from '@/utils/request'

const baseURL = 'http://10.10.10.199:40002/'

/**
 * 添加答案
 * @param {object} payload
 * 
 */

 export const addAnswer = (payload)=>{
     return request({
         baseURL,
         url: '/v1/answer/add',
         method: 'post',
         data: payload
     })
 }

 /**
  * 删除答案
 * @param {string} uuid
 * 
 */

export const deleteAnswer = (uuid)=>{
    return request({
        baseURL,
        url: '/v1/answer/delete',
        method: 'post',
        data: {
            uuid
        }
    })
}
/**
 * 查询答案
 * @param {string} payload
 * 
 */

export const getAnswer = (payload)=>{
    return request({
        baseURL,
        url: '/v1/answer/queryList',
        method: 'get',
        params: {
            licenseTemplateQuestionId: payload
        }
    })
}

/**
 * 修改答案
 * @param {object} payload
 * 
 */

export const updateAnswer = (payload)=>{
    return request({
        baseURL,
        url: '/v1/answer/update',
        method: 'post',
        data: payload
    })
}
