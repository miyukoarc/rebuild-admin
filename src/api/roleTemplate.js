import request from '@/utils/request'

const baseURL = 'http://10.10.10.199:40001/'

export function getRoleTemplateList(code) {
  return request({
    baseURL,
    method: "get",
    url: "/v1/roleTemplate/queryByCode",
    params: {
      code,
    }
  })
}

export function delRoleTemplate(form) {
  return request({
    baseURL,
    method: "post",
    url: "/v1/roleTemplate/delete",
    data: form
  })
}

export const addTemplate = (payload) => {
  return request({
    baseURL,
    url: '/v1/roleTemplate/add',
    method: 'post',
    data: payload
  })
}

export const delTemplate = (payload) => {
  return request({
    baseURL,
    url: '/v1/roleTemplate/delete',
    method: 'post',
    data: payload
  })
}

export const updateTemplate = (payload) => {
  return request({
    baseURL,
    url: '/v1/roleTemplate/update',
    method: 'post',
    data: payload
  })
}

export const linkMenu = (payload) => {
  return request({
    baseURL,
    url: '/v1/roleTemplate/linkMenu',
    method: 'post',
    data: payload
  })
}

export const templateQueryList = (payload) => {
  return request({
    baseURL,
    url: '/v1/roleTemplate/queryList',
    method: 'get',
    params: {
      uuid: payload
    }
  })
}

export const templateQueryById = (payload) => {
  return request({
    baseURL,
    url: '/v1/roleTemplate/queryById',
    method: 'get',
    params: {
      uuid: payload
    }
  })
}

export const templateQueryByCode = (payload) => {
  return request({
    baseURL,
    url: '/v1/roleTemplate/queryByCode',
    method: 'get',
    params: {
      code: payload
    }
  })
}



export const templateQueryByName = (payload) => {
  return request({
    baseURL,
    url: '/v1/roleTemplate/queryByName',
    method: 'get',
    params: {
      name: payload
    }
  })
}
