import request from '@/utils/request'

const baseURL = 'http://10.10.10.199:40001/'

export const getDepartmentList = ()=>{
    return request({
        baseURL,
        url: '/v1/list/department',
        method: 'get',
    })
}

