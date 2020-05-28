import request from  '@/utils/request'


const baseURL = 'http://10.10.10.199:40002/'
/**
 * 添加
 * @param {object} payload
 */

 export const addGrade = (payload) => {
     return request({
         baseURL,
         url: '/license/grade/add',
         method: 'post',
         data: payload 
     })
 }

 /**
  * 删除
  * @param {string} uuid 
  */

  export const deleteGrade = (uuid) => {
      return request({
          baseURL,
          url: '/license/grade/delete',
          method: 'post',
          data: {
              uuid
          }
      })
  } 
  /**
   * 查询列表
   * @param {}
   */

   /** */

  export const getGradeList = () => {
      return request({
          baseURL,
          url: '/license/grade/queryList',
          method: 'get'
      })
  }

  /**
   * 修改证照
   * @param {object} payload
   */

   export const updateGrade = (payload) => {
       return request({
           baseURL,
           url: '/license/grade/update',
           method: 'post',
           data: payload
       })
   }
