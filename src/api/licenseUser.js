import request from '@/utils/request'

const baseURL = 'http://10.10.10.199:40002/'

/**
 * 添加证件模板
 * @param {object} payload
 */
export const publishLicense = (payload) => {
    return request({
      baseURL,
      url: '/license/user/add',
      method: 'post',
      data: payload
    })
  }
  
  /**
   * 删除证件模板
   * @param {string} uuid
   */
  
  export const deleteLicense = (uuid) => {
    return request({
      baseURL,
      url: '/license/user/delete',
      method: 'post',
      data: {
        uuid
      }
    })
  }

  /**
   * 将证件修改到指定颜色
   * @param {object} payload 
   */

  export const setLicenseGrade = (payload)=>{
      return request({
          baseURL,
          url: '/license/user/grade/update',
          method: 'post',
          data: payload
      })
  }
  
  /**
   * 查询证件列表
   * @param {string} payload
   */
  
  export const getLicenseList = (payload) => {
    return request({
      baseURL,
      url: '/license/user/queryList/'+payload,
      method: 'get',
    })
  }
  
  /**
   * 查询证件
   * @param {string} payload
   */
  
   export const getLicenseByOne = (payload) => {
      return request({
          baseURL,
          url: '/license/user/queryOne/'+payload,
          method: 'get',
  
      })
   }
  
   /**
    * 修改模板
    * @param {object} payload
    */
  
    export const updataLicense = (payload)=> {
      return request({
          baseURL,
          url: '/license/user/update',
          method:'post',
          data: payload
      })
    }
  