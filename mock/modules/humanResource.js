import virturalData from '../virtural-data'

export default [
    {
        url: '/v1/list/department',
        type: 'get',
        response: _=>{
            return virturalData.department
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