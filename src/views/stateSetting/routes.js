import Layout from '@/views/index.vue'

export default {
    path: '/state_setting',
    name: 'StateSetting',
    component: Layout,
    redirect: '/state_setting/index',
    meta: { 
        title: '状态',
        icon: 'example'
    },
    children: [
        {
            path: 'index',
            component: ()=>import('./index.vue')
        }
    ]
}