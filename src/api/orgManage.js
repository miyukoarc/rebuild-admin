import request from '@/utils/request'

const baseURL = 'http://10.10.10.199:40001/'

export const queryOrg = (payload) => {
  return request({
    baseURL,
    url: '/v1/org/queryOrg',
    method: 'get',
    params: {
      uuid: payload
    }
  })
}

/**
 * 测试接口,省略流程
 */
export const commitTestOrg = (payload) => {
  return request({
    baseURL,
    url: '/v1/org/commitOrg',
    method: 'get',
    data: payload
  })
}
