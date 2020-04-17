import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
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
    url: '/v1/list/menu',
    method: 'get'
  })
}
export function genKey(username){
  return axios(
    {
      url: 'http://10.10.10.25:40000/sms?username='+username,
      method:'get',
    })
}

