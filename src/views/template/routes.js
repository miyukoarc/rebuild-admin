
import departmentList from './department/list'
import roleList from './role/list'
import orgList from './org/list'
import menuList from './menu/list'
import stateSetting from './stateSetting/list'

export default [
    {
        path: ':org/departmentTemplate',
        name: 'DepartmentTemplate',
        component: departmentList,
    },
    {
        path: ':org/roleTemplate',
        name: 'RoleTemplate',
        component: roleList,
    },
    {
        path: ':org/orgTemplate',
        name: 'OrgTemplate',
        component: orgList,
    },
    {
        path: ':org/menuTemplate',
        name: 'MenuTemplate',
        component: menuList,
    },
    {
        path: ':org/stateTemplate',
        name: 'StateTemplate',
        component: stateSetting
    }
]