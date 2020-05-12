import request from '@/utils/request'


export const addOrgTemplate =(payload)=>{
    return request({
        url: '/v1/orgTemplate/addOrgTemplate',
        method: 'post',
        payload
    })
}

export const delOrgTemplate = (payload) => {
    return request({
        url: '/v1/orgTemplate/delOrgTemplate',
        method: 'post',
        payload
    })
}

export const queryOrgTemplate = (query='') => {
    return request({
        url: '/v1/orgTemplate/queryOrgTemplate' + query,
        method: 'get',
    })
}

export const updateOrgTemplate = (payload) => {
    return request({
        url: '/v1/orgTemplate/updateOrgTemplate',
        method: 'post',
        payload
    })
}