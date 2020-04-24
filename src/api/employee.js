import request from '@/utils/request'

export function getEmployeeList(){
    return request({
      url: '/v1/list/user',
      method:'get'
    })
  }
  export function getEmpByDepartId(id){
    return request({
      url: `/v1/list/user/department/${id}`,
      method:'get'
    })
  }
  
  export function addEmployee(form){
    return request({
      url: `/v1/org/addUser`,
      method:'post',
        data:form
    })
  }