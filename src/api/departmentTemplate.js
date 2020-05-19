import request from '@/utils/request'


export const addTemplate =(payload)=>{
    return request({
        url: '/v1/departmentTemplate/add',
        method: 'post',
        data: payload
    })
}

export const delTemplate = (payload) => {
    return request({
        url: '/v1/departmentTemplate/delete',
        method: 'post',
        data: payload
    })
}

export const updateTemplate = (payload) => {
    return request({
        url: '/v1/departmentTemplate/update',
        method: 'post',
        data: payload
    })
}

export const templateQueryList = (payload) => {
    return request({
        url: '/v1/departmentTemplate/queryList',
        method: 'get',
        params: {
            uuid: payload
        }
    })
}

export const templateQueryById = (payload)=>{
    return request({
        url: '/v1/departmentTemplate/queryById',
        method: 'get',
        params: {
            uuid: payload
        }
    })
}

export const templateQueryByCode = (payload)=>{
    return request({
        url: '/v1/departmentTemplate/queryByCode',
        method: 'get',
        params: {
            code: payload
        }
    })
}


export const templateQueryByTree = (payload)=>{
    return request({
        url: '/v1/departmentTemplate/queryByTree',
        method: 'get',
        params: {
            uuid: payload
        }
    })
}


export const templateQueryByName = (payload)=>{
    return request({
        url: '/v1/departmentTemplate/queryByName',
        method: 'get',
        params: {
            name: payload
        }
    })
}

