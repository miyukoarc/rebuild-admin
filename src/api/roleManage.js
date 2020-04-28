import request from '@/utils/request'

export function getRoleList(page){
  let nPage = {};
   if(page!=null){
    nPage.sort = page.sort+','+page.order;
    nPage.page = page.page - 1; //后台page从0开始的，前端初始为1，请求前需要-1，请求完成需+1
    nPage.size = page.rows;
   }
    return request({
      url: '/v1/list/role',
      method: 'get',
      params:nPage
    })
}



export function addRole(form){
  return request({
    url:'/v1/role/add',
    method:'POST',
    data:form
  })
}
export function getORGList(){
  return request({
    url:'v1/list/org',
    method:'get'
  })
}

// export function getEmployeeList(){
//   return request({
//     url: '/v1/list/user',
//     method:'get'
//   })
// }
export default {
    getRoleList,
    addRole,
}