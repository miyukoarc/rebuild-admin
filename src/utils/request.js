import axios from 'axios'
import { MessageBox, Message,Loading } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import _ from 'lodash'
import qs from 'qs';





// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  baseURL: 'http://10.10.10.199:40001/',
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

//loading对象
let loading

//当前正在请求的数量
let needLoadingRequestCount = 0;


function showLoading(target) {

  if (needLoadingRequestCount === 0 && !loading) {
    loading = Loading.service({
      lock: true,
      text: "Loading...",
      background: 'rgba(255, 255, 255, 0.5)',
      target: target || "body"
    });
  }
  needLoadingRequestCount++;
}
  

function hideLoading() {
  needLoadingRequestCount--;
  needLoadingRequestCount = Math.max(needLoadingRequestCount, 0); 
  if (needLoadingRequestCount === 0) {

    toHideLoading();
  }
}

const toHideLoading = _.debounce(()=>{
  if(loading){
    loading.close();
    loading = null;
  }
  
}, 300);



// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

//     if(config.headers.showLoading !== false){
//           showLoading(config.headers.loadingTarget);
//     }

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = "Bearer "+ getToken();
    }
    // if (config.method=="post") {
      // config.data = qs.stringify(config.data)
      // config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    // }

    // console.log(config)

    return config
  },
  error => {
    // do something with request error
    // console.log(error) // for debug

//     if(config.headers.showLoading !== false){
//           showLoading(config.headers.loadingTarget);
//     }
   
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    // const res = response.data
    const res = response

//     if(response.config.headers.showLoading !== false){
//         hideLoading();
//       }

    // if the custom code is not 20000, it is judged as an error.
    if (res.status !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      //   // to re-login
      //   MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
      //     confirmButtonText: 'Re-Login',
      //     cancelButtonText: 'Cancel',
      //     type: 'warning'
      //   }).then(() => {
      //     store.dispatch('user/resetToken').then(() => {
      //       location.reload()
      //     })
      //   })
      // }

      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res.data
    }
  },
  error => {

    if(error.config.headers.showLoading !== false){
      hideLoading();
    }
    // console.log(error.message);
    let nErr = {};
    if(error.response?.data){
      // nErr.name = error.response.data.error;
      nErr.msg = error.response.data.message;
    }
    let errMsg = nErr?nErr.msg:error.message
    // Message({
    //   message:errMsg,
    //   type: 'error',
    //   duration: 2 * 1000
    // })
    console.log(error)
    return Promise.reject(errMsg);
  }
)

export default service
