import request from '@/utils/request'

const baseURL = 'http://10.10.10.199:40001/'

export function getRoleList(page) {

  /**
   * 后台page从0开始的，前端初始为1.
   * 请求前需要-1
   * 请求完成需+1
   */
  let nPage = {};
  if (page != null) {
    nPage.sort = page.sort + ',' + page.order;
    nPage.page = page.page - 1;
    nPage.size = page.rows;
  }
  return request({
    baseURL,
    url: '/v1/list/role',
    method: 'get',
    params: nPage
  })
}


export function addRole(form) {
  return request({
    baseURL,
    url: '/v1/role/add',
    method: 'POST',
    data: form
  })
}

export function getORGList() {
  return request({
    baseURL,
    url: 'v1/list/org',
    method: 'get'
  })
}

export function editRole(form) {
  return request({
    baseURL,
    url: '/v1/role/update',
    method: 'post',
    data: form
  })
}

export function deleteRole(form) {
  return request({
    baseURL,
    url: '/v1/role/delete',
    method: 'post',
    data: form
  })
}
// export function getEmployeeList(){
//   return request({
//     url: '/v1/list/org/user',
//     method:'get'
//   })
// }

export function getRoleDetail(uuid) {
  return request({
    baseURL,
    url: '/v1/detail/role/' + uuid,
    method: 'get',
  })
}

export default {
  getRoleList,
  addRole,
  editRole,
  deleteRole,
  getRoleDetail
}
