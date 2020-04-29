import stateSettingList from './list'
import stateSettingTree from './tree'

export default [
    {
        path: 'list/:entity',
        name: 'StateSettingList',
        component: stateSettingList,
    },
    // {
    //     path: 'stateSetting/tree/:entity',
    //     name: 'StateSettingTree',
    //     component: stateSettingTree,
    // }
]