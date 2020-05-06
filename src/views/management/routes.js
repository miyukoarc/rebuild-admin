
import departmentList from './department/list.vue'
import roleList from './role/index.vue'
// import stateSettingList from './stateSetting/list'
// import stateSettingTree from './stateSetting/tree'
import departmentTree from './department/tableTree.vue'
import employee from './employee/rightList'
import menu from './menu'
import User from './user/list'

export default [
    {
        path: 'department/list',
        name: 'Department',
        component: departmentList,
    },
    {
        path: 'department/tree',
        name: 'DepartmentTree',
        component: departmentTree,
    },
    {
        path: 'role/list',
        name: 'Role',
        component: roleList,
    },
    // {
    //     path: 'state_setting/tree',
    //     name: 'stateSettingTree',
    //     component: stateSettingTree
    // },
    {
        path: 'employee/list',
        name: 'employee',
        component: employee
    },
    {
        path: 'menu/list',
        name: 'menu',
        component: menu
    },
    {
        path: 'user/list',
        name: 'User',
        component: User
    }

]
        
