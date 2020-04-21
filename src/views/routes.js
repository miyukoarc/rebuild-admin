import Layout from './index.vue'

const files = require.context('../views', true ,/\.js$/)

// console.log(files.keys())
let accessedRoutes = []
files.keys().forEach(key=>{


    if(key!=='./routes.js'){
      accessedRoutes = accessedRoutes.concat(files(key).default)
    }
    

})



export default [
  {
    path: '/accessed/:modules',
    component:Layout,
    name: 'AccessedRouter',
    children: accessedRoutes
  }
]