import Layout from '@/views/index.vue'

export default {
    path: '/im_conversation',
    name: 'Conversation',
    component: Layout,
    redirect: '/im_conversation/index',
    meta: { 
        title: '会话',
        icon: 'example'
    },
    children: [
        {
            path: 'index',
            component: ()=>import('./index.vue')
        }
    ]
}