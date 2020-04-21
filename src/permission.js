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

const whiteList = ['/s/login'] // no redirect whitelist

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
    if (to.path === '/s/login') {
      // if is logged in, redirect to the home page
      
      next({
        path: '/s'
      })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {

        console.log(hasGetUserInfo,'hasGetUserInfo')

        console.log(router)

        const secondMenuState = window.localStorage.getItem('hasSecondMenu')

        
        if(isEmpty(router.history.current.params)){
          
          store.commit('secondMenu/TOGGLE_STATE', secondMenuState)
        }
        

        

        // const filtedRoutes = JSON.parse(window.localStorage.getItem('filtedRoutes'))

        // router.addRoutes(filtedRoutes)
        next()
      } else {
        try {
          // get user info
          const userInfo = store.dispatch('user/getInfo')
          const userMenu = store.dispatch('user/getMenu')

          await Promise.all([userInfo, userMenu])
            .then(() => {

              store.dispatch('permission/generateRoutes')
              
              resolve()
            })
            .catch(err => {})

          const accessed = store.state.permission.filtedRouter

          // router.options.routes = accessed

          router.addRoutes(accessed)

          next({
            ...to,
            replace: true
          })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/s/login?redirect=${to.path}`)
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
      next(`/s/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
