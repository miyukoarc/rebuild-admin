import request from '@/utils/request'
import axios from 'axios'

// export function login(data) {
//   return request({
//     url: '/vue-admin-template/user/login',
//     method: 'post',
//     data
//   })
// }

export function login(data){
  return axios(
    {
      url: 'http://10.10.10.199:40000/oauth/token',
      method:'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data,
      auth:{
        username: 'org',
        password: 'org@tianyoukeji'
      }
    })
}

export function getInfo() {
  return request({
    url: '/v1/detail/myInfo',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}



// export function getInfo() {
//   return request({
//     url: '/v1/detail/myInfo',
//     method: 'get',
//   })
// }

export function getMenu(){
  return request({
    url: '/v1/list/myMenuTree',
    method: 'get'
  })
}

export function genKey(username){
  return axios(
    {
      url: 'http://10.10.10.199:40000/sms?username='+username,
      method:'get',
    })
}

export function updateUserInfo(data){
  return request({
    url: '/v1/user/update',
    method: 'post',
    data
  })
}
