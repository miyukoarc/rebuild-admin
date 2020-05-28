import request from "@/utils/request";

const baseURL = 'http://10.10.10.199:40001/'

export function addMenu(form) {
  return request({
    baseURL,  
    url: "/v1/menu/add",
    method: "post",
    data: form
  });
}

export function getMenuList() {
  return request({
    baseURL,  
    url: "/v1/list/menuTree",
    method: "get"
  });
}

export function getMenuListByRole(id) {
  return request({
    baseURL,  
    url: `/v1/list/menuTree/role/${id}`,
    method: "get"
  });
}

export function addMenuForRole(form) {
  return request({
    baseURL,  
    url: `/v1/role/linkMenu`,
    method: "post",
    data:form
  });
}


export function delMenuById(uuid) {
  return request({
    baseURL,  
    url: `/v1/menu/delete`,
    method: "post",
    data:{
      uuid,
    }
  });
}

export function editMenu(form) {
  return request({
    baseURL,  
    url: `/v1/menu/update`,
    method: "post",
    data:form
  });
}
