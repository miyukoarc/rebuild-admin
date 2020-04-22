import virturalData from '../virtural-data'

export default [
    {
        url: '/v1/list/departmentTree',
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
    },
    {
        url: '/v1/department/update',
        type: 'post',
        response: _=>{
            return {
                code: 200,
                data: {
                    title: '1123'
                }
            }
        }
    },
    {
        url: '/v1/list/user/'
    }
]