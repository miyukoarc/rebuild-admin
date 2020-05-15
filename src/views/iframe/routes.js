import Iframe from './iframe.vue'


export default [
    {
        path: ':iframe',
        component:Iframe,
        name: 'IframeModel',
        meta: {
            title: 'iframe',
            icon: 'example'
        }
    }
]