import Layout from '@/views/index.vue'

export default [
    {
        path: '/department/list',
        name: 'Department',
        component: ()=>import('./department/list.vue'),
    },
    {
        path: '/role/list',
        name: 'Role',
        component: ()=>import('./role/list.vue'),
    },
    {
        path: '/stateSetting/list',
        name: 'stateSetting',
        component: ()=>import('./stateSetting/list')
    }

]
        
