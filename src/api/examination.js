import request from '@/utils/request'

const baseURL = 'http://10.10.10.199:40002/'


/**
 * 添加试题及答案
 * @param {object} payload
 */
export const addQuestion = (payload)=> {
    return request({
        baseURL,
        url: '/license/question/add',
        method: 'post',
        data: payload
    })
}

/**
 * 删除试题及答案
 * @param {string} payload
 */

 export const deleteQuestion = (payload) => {
    return request({
        baseURL,
        url: '/license/question/delete',
        method: 'post',
        data: {
            uuid: payload
        }
    })
 }

/**
 *申请考试 
 * @param  {object} payload
 */

export const applyExamination =  (payload)=>{
    return ({
        baseURL,
        url: '/license/question/exam',
        method: 'post',
        data:  payload
    })
}


/**
 * 查验考题
 * @param {object} payload 
 */
export const checkoutQuestion =  (payload)=>{
    return ({
        baseURL,
        url: '/license/question/exam/isRight',
        method: 'post',
        data:  payload
    })
}

/**
 *考试结果 
 * @param {object} payload 
 */
export const resultOfExamination = (payload) =>{
    return request({
        baseURL,
        url: '/license/question/exam/result',
        method: 'post',
        data: payload
    })
}

/**
 * 查询试题及答案列表
 * @param {string} payload 
 */
export const getAnswerAndQuestion = (payload)=>{
    return request({
        baseURL,
        url: '/license/question/queryList',
        method: 'get',
        params: {
            orgId:payload
        }
    })
}

/**
 * 获取指定题目及其答案
 * @param {string} payload 
 */

export const getOneQuestionAndAnswer = (payload)=>{
    return request({
        baseURL,
        url: '/license/question/queryOne',
        method: 'get',
        params: {
            uuid:payload
        }
    })
}

/**
 * 膝盖题目及答案
 * @param {object} payload 
 */

export const updateQuestion = (payload)=> {
    return request({
        baseURL,
        url: '/license/question/update',
        method: 'get',
        data: payload
    })
}
}

