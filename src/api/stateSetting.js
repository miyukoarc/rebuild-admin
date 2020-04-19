
import request from '@/utils/request'

export function getRoles(){
    return request({
      url: '/v1/list/role',
      method: 'get'
    })
}


export function getStateMachine(){
    return request({
        url: '/v1/list/stateMachine',
        method: 'get'
    })
}


 