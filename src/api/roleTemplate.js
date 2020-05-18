import request from '@/utils/request'

export function getRoleTemplateList(code){
    return request({
        method:"get",
        url:"/v1/roleTemplate/queryByCode",
        data:{
            code,
        }
    })
}

export function delRoleTemplate(form){
    return request({
        method:"post",
        url:"/v1/roleTemplate/delete",
        data:form
    })
}