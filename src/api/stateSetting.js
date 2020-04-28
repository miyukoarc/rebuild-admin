
import request from '@/utils/request'

export function getRoles(){
    return request({
      url: '/v1/list/role',
      method: 'get'
    })
}


export function getStateMachine(){
    return request({
        url: '/v1/stateMachine/list',
        method: 'get'
    })
}


export function getStateMachineDetail(params){
    return request({
        url: '/v1/stateMachine/list'+params,
        method: 'get',
    })
}

export function getEventList(){
    return request({
        url: '/v1/stateMachine/listEvent',
        method: 'get'
    })
}




 