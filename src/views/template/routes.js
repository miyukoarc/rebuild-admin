
import departmentList from './department/list'
import roleList from './role/list'
import orgList from './org/list'
import menuList from './menu/list'

export default [
    {
        path: 'departmentTemplate/list',
        name: 'DepartmentTemplate',
        component: departmentList,
    },
    {
        path: 'roleTemplate/list',
        name: 'RoleList',
        component: roleList,
    },
    {
        path: 'orgTemplate/list',
        name: 'OrgList',
        component: orgList,
    },
    {
        path: 'menuTemplate/list',
        name: 'MenuList',
        component: menuList,
    },
]