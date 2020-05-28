import request from '@/utils/request'

const baseURL = 'http://10.10.10.199:40002/'

/**
 * 添加试题及答案
 */

export const addPunishment = () => {
    return request({
        baseURL,
        url: '/license/question/add',
        method: 'post',
        data: {

        }
        
    })
}

/**
 * 删除试题以及答案
 * @type {string}
 */

 export const deletePunishment = (uuid) => {
    return request({
        baseURL,
        url: '/license/penalize/delete',
        method: 'post',
        data: {
            uuid: uuid
        }
    })
 }

 /**
  * 查询企业证照的惩罚
  * @type {string}
  */

  export const getPunishmentByLicenseTemplateId = (id) => {
      return request({
          baseURL,
          url: '/license/penalize/queryList',
          params: {
            licenTemplateId:id
          }
      })
  }

  /**
   * 修改企业证照的惩罚
   * 
   */

   export const updatePunishment = (payload)=>{
       return request({
           baseURL,
           url: '/license/penalize/update',
           data: payload
       })
   }

   