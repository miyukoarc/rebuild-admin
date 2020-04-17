export default {
    path: '/state_setting',
    name: 'StateSetting',
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