import request from "@/utils/request";


const baseURL = 'http://10.10.10.199:40001/'

export function getNormalUsers() {
  return request({
    baseURL,
    url: "/v1/list/user",
    method: "get"
  });
}

export function getNormalUserDetail(id) {
  return request({
    baseURL,
    url: '/v1/detail/user/' + id,
    method: 'get'
  })
}

export function disableUser(data) {
  return request({
    baseURL,
    url: '/v1/user/disable',
    method: 'post',
    data
  })
}

export function enableUser(data) {
  return request({
    baseURL,
    url: '/v1/user/enable',
    method: 'post',
    data
  })
}

export function kickUser(data) {
  return request({
    baseURL,
    url: '/v1/user/kick',
    method: 'post',
    data
  })
}
