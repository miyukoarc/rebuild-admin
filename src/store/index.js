import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

// import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})


const imFiles = require.context('./im',true,/\.js$/)

const imModules = imFiles.keys().reduce((imModules,imModulesPath) => {

  
  const moduleName = imModulesPath.replace(/^\.\//, 'im/').replace(/\.js$/,'')
  const value = imFiles(imModulesPath)
  imModules[moduleName] = value.default
  return imModules
},{})



const store = new Vuex.Store({
  modules:{
    ...modules,
    ...imModules
  },
  mutations:{
    //   ...mutations,
      resetAllState(state,payload){
        console.warn()
      }
  },
  getters,
  // plugins: [createPersistedState()],
})



// window.localStorage.setItem('originState',store.state)


export default store