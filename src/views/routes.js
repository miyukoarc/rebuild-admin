import Layout from './layout.vue'

const files = require.context('../views', true ,/\.js$/)

// console.log(files.keys())

let dynamicRoutes = []

files.keys().forEach(key=>{


    if(key!=='./routes.js'){
      dynamicRoutes = dynamicRoutes.concat(files(key).default)
    }
    

})



export default [
  {
    path: '/d/:modules',
    component:Layout,
    name: 'AccessedRouter',
    children: dynamicRoutes
  }
]