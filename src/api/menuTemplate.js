import request from '@/utils/request'


export const addTemplate =(payload)=>{
    return request({
        url: '/v1/menuTemplate/add',
        method: 'post',
        data: payload
    })
}

export const delTemplate = (payload) => {
    return request({
        url: '/v1/menuTemplate/delete',
        method: 'post',
        data: payload
    })
}

export const updateTemplate = (payload) => {
    return request({
        url: '/v1/menuTemplate/update',
        method: 'post',
        data: payload
    })
}

export const templateQueryList = (payload) => {
    return request({
        url: '/v1/menuTemplate/queryList',
        method: 'get',
        params: {
            uuid: payload
        }
    })
}

export const templateQueryById = (payload)=>{
    return request({
        url: '/v1/menuTemplate/queryById',
        method: 'get',
        params: {
            uuid: payload
        }
    })
}

export const templateQueryByCode = (payload)=>{
    return request({
        url: '/v1/menuTemplate/queryByCode',
        method: 'get',
        params: {
            code: payload
        }
    })
}


export const templateQueryByTree = (payload)=>{
    return request({
        url: '/v1/menuTemplate/queryTree',
        method: 'get',
        params: {
            uuid: payload
        }
    })
}


export const templateQueryByName = (payload)=>{
    return request({
        url: '/v1/menuTemplate/queryByName',
        method: 'get',
        params: {
            name: payload
        }
    })
}

