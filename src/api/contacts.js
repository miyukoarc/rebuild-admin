import request from '@/utils/request'


export function getUserProfileByUserId(id){
    return request({
        url:'/v1/detail/user/mobile/'+id,
        method: 'get'
    })
}