import router from './router'
import store from './store'
import {
  Message
} from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {
  getToken
} from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import {
  resolvePlugin
} from '@babel/core'

import {isEmpty} from '@/utils/normal'

NProgress.configure({
  showSpinner: false
}) // NProgress Configuration

const whiteList = ['/d/login'] // no redirect whitelist

 router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in

//   if(!isEmpty(router.history.current.params)){
//     console.log(router)
//   }
  
  const hasToken = getToken()



  if (hasToken) {
    if (to.path === '/d/login') {
      // if is logged in, redirect to the home page
      
      next({
        path: '/s'
      })

      NProgress.done()
    } else {

      console.log(to.path)
      if(to.path.includes('management')){
        store.dispatch('stateSettings/getEventList')
      }

      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {

        // store.dispatch('user/getInfo')
        // store.dispatch('user/getMenu')
        next()
      } else {
        try {
          // get user info
          const userInfo = store.dispatch('user/getInfo')
          const userMenu = store.dispatch('user/getMenu')

          await Promise.all([userInfo, userMenu])
            .then(() => {

              store.dispatch('permission/generateRoutes')
              
              // resolve()
            })
            .catch(err => {
              Message({
                type: 'error',
                message: err||err.message
              })

              // reject()
            })

          

          const accessed = store.state.permission.filtedRouter

          // router.options.routes = accessed

          router.addRoutes([...accessed,{path:'*',redirect:'/d/404'}])

          

          next({
            ...to,
            replace: true
          })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/d/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/d/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
