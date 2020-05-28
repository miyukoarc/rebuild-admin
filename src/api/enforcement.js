import request from '@/utils/request'

const baseURL = 'http://10.10.10.199:40002/'

/**
 * 添加执法单
 * @param {Object} payload 
 */

export const addTicket = (payload) => {
    return request({
        baseURL,
        url: '/license/receipt/add',
        method: 'post',
        data: payload
    })
}

/**
 * 删除执法单
 * @param {string} uuid
 */
export const deleteTicket = (uuid) => {
    return request({
        baseURL,
        url: '/license/receipt/delete',
        method: 'post',
        data: {
            uuid
        }
    })
}

/**
 * 查询执法单列表
 * @param {}
 */

export const getTicketList = () => {
    return request({
        baseURL,
        url: '/license/receipt/queryList',
        method: 'get'

    })
}


/**
 * 修改执法单
 * @param {Object} payload
 */

 export const updateTicket = (payload) => {
     return request({
        baseURL,
        url: '/license/receipt/update',
        method: 'post',
        data: payload
     })
 }