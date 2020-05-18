import stateSettingList from './list'
import stateSettingTree from './tree'

export default [
    {
        path: 'list/:entity',
        name: 'StateSettingTemplate',
        component: stateSettingList,
    },
    // {
    //     path: 'stateSetting/tree/:entity',
    //     name: 'StateSettingTree',
    //     component: stateSettingTree,
    // }
]