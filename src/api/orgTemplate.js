import request from '@/utils/request'


export const addOrgTemplate =(payload)=>{
    return request({
        url: '/v1/orgTemplate/addOrgTemplate',
        method: 'post',
        data:payload
    })
}

export const delOrgTemplate = (payload) => {
    return request({
        url: '/v1/orgTemplate/delOrgTemplate',
        method: 'post',
        data: payload
    })
}

export const orgTemplateQueryList = () => {
    return request({
        url: '/v1/orgTemplate/queryList',
        method: 'get',
    })
}

export const orgTemplateQueryById = (payload)=>{
    return request({
        url: '/v1/orgTemplate/queryById',
        method: 'get',
        params: {
            uuid: payload
        }
    })
}

export const orgTemplateQueryByCode = (payload)=>{
    return request({
        url: '/v1/orgTemplate/queryByCode',
        method: 'get',
        params: {
            code: payload
        }
    })
}

export const updateOrgTemplate = (payload) => {
    return request({
        url: '/v1/orgTemplate/updateOrgTemplate',
        method: 'post',
        data: payload
    })
}