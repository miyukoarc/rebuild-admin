import request from '@/utils/request'

export const getDepartmentList = ()=>{
    return request({
        url: '/v1/list/department',
        method: 'get',
    })
}

