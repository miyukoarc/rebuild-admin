import request from '@/utils/request'

const baseURL = 'http://10.10.10.199:40001/'

export const addTemplate =(payload)=>{
    return request({
        baseURL,
        url: '/v1/departmentTemplate/add',
        method: 'post',
        data: payload
    })
}

export const delTemplate = (payload) => {
    return request({
        baseURL,
        url: '/v1/departmentTemplate/delete',
        method: 'post',
        data: payload
    })
}

export const updateTemplate = (payload) => {
    return request({
        baseURL,
        url: '/v1/departmentTemplate/update',
        method: 'post',
        data: payload
    })
}

export const templateQueryList = (payload) => {
    return request({
        baseURL,
        url: '/v1/departmentTemplate/queryList',
        method: 'get',
        params: {
            uuid: payload
        }
    })
}

export const templateQueryById = (payload)=>{
    return request({
        baseURL,
        url: '/v1/departmentTemplate/queryById',
        method: 'get',
        params: {
            uuid: payload
        }
    })
}

export const templateQueryByCode = (payload)=>{
    return request({
        baseURL,
        url: '/v1/departmentTemplate/queryByCode',
        method: 'get',
        params: {
            code: payload
        }
    })
}


export const templateQueryByTree = (payload)=>{
    return request({
        baseURL,
        url: '/v1/departmentTemplate/queryByTree',
        method: 'get',
        params: {
            uuid: payload
        }
    })
}


export const templateQueryByName = (payload)=>{
    return request({
        baseURL,
        url: '/v1/departmentTemplate/queryByName',
        method: 'get',
        params: {
            name: payload
        }
    })
}

