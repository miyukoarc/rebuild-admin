import request from '@/utils/request'

const baseURL = 'http://10.10.10.199:40001/'

export const addOrgTemplate = (payload) => {
  return request({
    baseURL,
    url: '/v1/orgTemplate/addOrgTemplate',
    method: 'post',
    data: payload
  })
}

export const delOrgTemplate = (payload) => {
  return request({
    baseURL,
    url: '/v1/orgTemplate/delOrgTemplate',
    method: 'post',
    data: payload
  })
}

export const orgTemplateQueryList = () => {
  return request({
    baseURL,
    url: '/v1/orgTemplate/queryList',
    method: 'get',
  })
}

export const orgTemplateQueryById = (payload) => {
  return request({
    baseURL,
    url: '/v1/orgTemplate/queryById',
    method: 'get',
    params: {
      uuid: payload
    }
  })
}

export const orgTemplateQueryByCode = (payload) => {
  return request({
    baseURL,
    url: '/v1/orgTemplate/queryByCode',
    method: 'get',
    params: {
      code: payload
    }
  })
}

export const updateOrgTemplate = (payload) => {
  return request({
    baseURL,
    url: '/v1/orgTemplate/updateOrgTemplate',
    method: 'post',
    data: payload
  })
}
