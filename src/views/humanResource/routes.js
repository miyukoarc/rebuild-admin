import Layout from '@/views/index.vue'

export default {
    path: '/human_resource',
    name: 'HumanResource',
    component: Layout,
    redirect: '/human_resource/roles',
    meta: { 
        title: '人资',
        icon: 'example'
    },
    children: [
        {
            path: 'roles',
            name: 'Role',
            component: ()=>import('./manage/role.vue'),
        },
        {
            path: 'department',
            name: 'Department',
            component: ()=>import('./manage/department.vue'),
        }
    ]
}