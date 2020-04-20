import request from '@/utils/request'

export function getDepartment(){
    return request({
        url: '/v1/list/department',
        method: 'get'
    })
}