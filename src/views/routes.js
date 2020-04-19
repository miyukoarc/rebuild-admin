
const req = context => context.keys().map(context)
const requireAll = req(require.context('./',true,/\.routes\.js/))

// export const modules =  modulesFiles.keys().reduces
let modules =[]

requireAll.forEach(route => {
    modules.push(route.default)
})

