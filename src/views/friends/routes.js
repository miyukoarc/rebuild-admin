import Layout from '@/views/index.vue'

export default {
    path: '/im_friend',
    name: 'Friend',
    component: Layout,
    redirect: '/im_friend/index',
    meta: { 
        title: '联系人',
        icon: 'example'
    },
    children: [
        {
            path: 'index',
            component: ()=>import('./index.vue')
        }
    ]
}