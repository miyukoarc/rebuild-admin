import virturalData from '../virtural-data'

export default [
    {
        url: '/v1/list/role',
        type: 'get',
        response: _=>{
            return 
        }
    },
    {
        url: '/v1/stateMachine/list',
        type: 'get',
        response: _=>{
            return virturalData.stateMachine
        }
    },
    {
        url: '/v1/stateMachine/list\.*',
        type: 'get',
        response: config=> {
            const  role = config.query

            return role
        }
    }
]