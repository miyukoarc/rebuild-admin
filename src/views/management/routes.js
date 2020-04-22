
import departmentList from './department/list.vue'
import roleList from './role/index.vue'
import stateSettingList from './stateSetting/list'

export default [
    {
        path: 'department/list',
        name: 'Department',
        component: departmentList,
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
        
