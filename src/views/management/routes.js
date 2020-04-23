
import departmentList from './department/list.vue'
import roleList from './role/index.vue'
import stateSettingList from './stateSetting/list'
import departmentTree from './department/tree.vue'

export default [
    {
        path: 'department/list',
        name: 'Department',
        component: departmentList,
    },
    {
        path: 'department/tree',
        name: 'Department',
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
    }

]
        
