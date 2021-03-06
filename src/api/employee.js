import request from "@/utils/request";

const baseURL = 'http://10.10.10.199:40001/'

export function getEmployeeList(page) {
  let nPage = {};
  nPage.sort = page.sort + "," + page.order;
  nPage.page = page.page - 1; 
  nPage.size = page.rows;
  return request({
    baseURL,
    url: "/v1/list/org/user",
    method: "get",
    params:nPage
  });
}
export function getEmpByDepartId(id) {
  return request({
    baseURL,
    url: `/v1/list/user/department/${id}`,
    method: "get"
  });
}

export function addEmployee(form) {
  return request({
    baseURL,
    url: `/v1/org/addUser`,
    method: "post",
    data: form
  });
}

export function getUserByPhone(phone) {
  return request({
    baseURL,
    url: `/v1/detail/user/mobile/${phone}`,
    method: "get"
  });
}

export function departSetting(form) {
  return request({
    baseURL,
    url: "/v1/org/locateUserDepartment",
    method: "post",
    data: form
  });
}

export function addEmployForUser(form) {
  return request({
    baseURL,
    url: "/v1/org/addUser",
    method: "post",
    data: form
  });
}

export function deleteUserByUnionId(form) {
  return request({
    baseURL,
    url: "/v1/org/deleteUser",
    method: "post",
    data: form
  });
}

export function locateUserRole(form){
  return request({
    baseURL,
    url: "/v1/org/locateUserRole",
    method: "post",
    data: form
  });
}
