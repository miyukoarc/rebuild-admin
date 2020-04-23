import request from "@/utils/request";

export function getDepartment() {
  return request({
    url: "/v1/list/departmentTree",
    method: "get"
  });
}

export function createDepartment(data) {
  return request({
    url: "/v1/department/add",
    method: "post",
    data
  });
}

export function updateDepartment(data) {
  return request({
    url: "/v1/department/update",
    method: "post",
    data
  });
}

export function getDepartmentUser(id) {
  return request({
    url: "/v1/list/user/" + id,
    method: "get"
  });
}

export function getDepartmentDetail(id) {
  return request({
    url: "/v1/detail/department/" + id,
    method: "get"
  });
}

export function getDepartmenList(page) {
  let nPage = {};
  nPage.sort = page.sort + "," + page.order;
  nPage.page = page.page - 1; //后台page从0开始的，前端初始为1，请求前需要-1，请求完成需+1
  nPage.size = page.rows;
  return request({
    url: "/v1/list/department",
    method: "get",
    params:nPage
  });
}
