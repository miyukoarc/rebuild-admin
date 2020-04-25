
import departmentList from './department/list.vue'
import roleList from './role/index.vue'
import stateSettingList from './stateSetting/list'
import stateSettingTree from './stateSetting/tree'
import departmentTree from './department/tree.vue'
import employee from './employee/index'
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
    {
        path: 'state_setting/list',
        name: 'stateSetting',
        component: stateSettingList
    },
    {
        path: 'state_setting/tree',
        name: 'stateSettingTree',
        component: stateSettingTree
    },
    {
        path: 'employee/list',
        name: 'employee',
        component: employee
    }

]
        
