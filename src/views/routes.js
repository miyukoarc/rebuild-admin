import Layout from './index.vue'

// const req = context => context.keys().map(context)
// const requireAll = req(require.context('./',true,/routes.js$/))

// const routes = requireAll.keys().map(key => (routes(key).default || routes(key)))

const routerList = []

function importAll (r) {
  r.keys().map(value => {
    r(value).default.map(item => {
        console.log(item)
      routerList.push(item)
    })
  })
}

importAll(require.context('./', true, /\.router\.js/))



// let modules =[]

// requireAll.forEach(route => {
//     console.log(route)
//     modules.push(route.default)
// })


console.log(routerList)








export default [
    {
        path: '/:module',
        component:Layout,
        children: routerList
    }
]

