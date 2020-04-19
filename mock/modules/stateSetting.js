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
        url: '/v1/list/stateMachine',
        type: 'get',
        response: _=>{
            return virturalData.stateMachine
        }
    }
]