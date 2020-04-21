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

NProgress.configure({
  showSpinner: false
}) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()


  if (hasToken) {

    await store.dispatch('user/getMenu').then(()=>{
      store.dispatch('permission/generateRoutes')
    })

    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      
      next({
        path: '/'
      })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {

       

        const filtedRoutes = JSON.parse(window.localStorage.getItem('filtedRoutes'))

        // console.log(hasGetUserInfo,filtedRoutes,'hasGetUserInfo')


        
        next()
      } else {
        try {
          // get user info
          // const userInfo = 
          store.dispatch('user/getInfo')

          const accessed = store.state.permission.filtedRouter

          // router.options.routes = accessed
          console.log(accessed,'过滤后的权限路由')

          router.addRoutes([...accessed,{ path: '*', redirect: '/404', hidden: true }])


          



          next({
            ...to,
            replace: true
          })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
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
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
