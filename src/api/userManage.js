import request from "@/utils/request";

export function getNormalUsers() {
  return request({
    url: "/v1/list/user",
    method: "get"
  });
}

export function getNormalUserDetail(id){
  return request({
    url: '/v1/detail/user/'+id,
    method: 'get'
  })
}

export function disableUser(data){
  return request({
    url: '/v1/user/disable',
    method: 'post',
    data
  })
}

export function enableUser(data){
  return request({
    url: '/v1/user/enable',
    method: 'post',
    data
  })
}

export function kickUser(data){
  return request({
    url:'/v1/user/kick',
    method: 'post',
    data
  })
}