import request from '@/utils/request'

export const queryOrg = (payload)=>{
  return request({
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
        url: '/v1/org/commitOrg',
        method: 'get',
        data: payload
      })
 }
