import request from "@/utils/request";

export function addMenu(form) {
  return request({
    url: "/v1/menu/add",
    method: "post",
    data: form
  });
}

export function getMenuList() {
  return request({
    url: "/v1/list/menuTree",
    method: "get"
  });
}

export function getMenuListByRole(id) {
  return request({
    url: `/v1/list/menuTree/role/${id}`,
    method: "get"
  });
}

export function addMenuForRole(form) {
  return request({
    url: `/v1/role/linkMenu`,
    method: "post",
    data:form
  });
}


export function delMenuById(uuid) {
  return request({
    url: `/v1/menu/delete`,
    method: "post",
    data:{
      uuid,
    }
  });
}

export function editMenu(form) {
  return request({
    url: `/v1/menu/update`,
    method: "post",
    data:form
  });
}
