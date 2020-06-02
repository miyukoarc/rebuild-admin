
import Examination from './examination/index.vue'
import Publish from './publish/list.vue'
import Reason from './reason/list.vue'
import Grade from './grade/list.vue'
import Penalize from './penalize/list.vue'

export default [
    {
        path: 'examination/list',
        name: 'Examination',
        component: Examination,
    },
    {
        path: 'publish/list',
        name: 'Publish',
        component: Publish
    },
    {
        path: 'reason/list',
        name: 'Reason',
        component: Reason
    },
    {
        path: 'grade/list',
        name: 'Grade',
        component: Grade
    },
    {
        path: 'penalize/list',
        name: 'Penalize',
        component: Penalize
    },
]