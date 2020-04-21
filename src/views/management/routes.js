import Layout from '@/views/index.vue'
import departmentList from './department/list.vue'
import roleList from './role/list.vue'
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
        path: 'stateSetting/list',
        name: 'stateSetting',
        component: stateSettingList
    }

]
        
