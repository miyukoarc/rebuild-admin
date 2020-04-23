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
    url: '/v1/detail/department/'+id,
    method: 'get'
  })
}

export function deleteDepartment(data){
  return request({
    url: '/v1/department/update',
    method: 'post',
    data
  })
}