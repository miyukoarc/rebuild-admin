import request from '@/utils/request'

const baseURL = 'http://10.10.10.199:40001/'

export function getUserProfileByUserId(id){
    return request({
        url:'/v1/detail/user/mobile/'+id,
        baseURL,
        method: 'get'
    })
}