import request from "@/utils/request";


const baseURL = 'http://10.10.10.199:40001/'

export function getDepartment() {
  return request({
    baseURL,
    url: "/v1/list/departmentTree",
    method: "get"
  });
}

export function createDepartment(data) {
  return request({
    baseURL,
    url: "/v1/department/add",
    method: "post",
    data
  });
}

export function updateDepartment(data) {
  return request({
    baseURL,
    url: "/v1/department/update",
    method: "post",
    data
  });
}

export function getDepartmentUser(id) {
  return request({
    baseURL,
    url: "/v1/list/user/department/" + id,
    method: "get"
  });
}

export function getDepartmentDetail(id) {
  return request({
    baseURL,
    url: "/v1/detail/department/" + id,
    method: "get"
  });
}

export function getDepartmentList(page) {
  let nPage = {};
  nPage.sort = page.sort + "," + page.order;
  nPage.page = page.page - 1; //后台page从0开始的，前端初始为1，请求前需要-1，请求完成需+1
  nPage.size = page.rows;
  return request({
    baseURL,
    url: "/v1/list/department",
    method: "get",
    params:nPage
  });
}

export function deleteDepartment(data){
  return request({
    baseURL,
    url: '/v1/department/delete',
    method: 'post',
    data
  })
}

export function setDepartmentManager(data){
  return request({
    baseURL,
    url: '/v1/org/locateDepartmentManager',
    method: 'post',
    data
  })
}

export function getAllDepartments(){
  return request({
    baseURL,
    url: '/v1/list/department',
    method: 'get',
  })
}