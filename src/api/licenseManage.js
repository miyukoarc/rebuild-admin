
import request from '@/utils/request'

const baseURL = 'http://10.10.10.199:40002/'



/**
 * 发行证照
 * @param {object} payload 
 */
export const publishLicense =  (payload)=>{
    return ({
        baseURL,
        url: '/license/user/add',
        method: 'post',
        data:  payload
    })
}

/**
 * 删除证照
 * @param {string} payload 
 */
export const deleteLicense =  (payload)=>{
    return ({
        baseURL,
        url: '/license/user/delete',
        method: 'post',
        data:  {
            uuid: payload
        }
    })
}

/**
 * 查询列表
 * @param {string} payload 
 */

export const getLicenseList =  (payload)=>{
    return ({
        baseURL,
        url: '/license/user/queryList',
        method: 'get',
        params:  {
            orgId: payload
        }
    })
}


/**
 * 查询指定证照
 * @param {string} payload 
 */
export const getOneLicense =  (payload)=>{
    return ({
        baseURL,
        url: '/license/user/queryOne',
        method: 'get',
        params:  {
            uuid: payload
        }
    })
}

/**
 * 升级证照
 * @param {object} payload 
 */
export const updateLicense =  (payload)=>{
    return ({
        baseURL,
        url: '/license/user/update',
        method: 'get',
        data: payload
    })
}


