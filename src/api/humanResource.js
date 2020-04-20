import request from '@/utils/request'

export function getDepartment(){
    return request({
        url: '/v1/list/department',
        method: 'get'
    })
}

export function createDepartment(data){
    return request({
        url: '/v1/department/add',
        method: 'post',
        data
    })
}

export function updateDepartment(data){
    return request({
        url: '/v1/department/update',
        method: 'post',
        data
    })
}

export function getDepartmentUser(id){
    return request({
        url: '/v1/list/user/'+id,
        method: 'get',
    })
}