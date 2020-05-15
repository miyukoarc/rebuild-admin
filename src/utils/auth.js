import Cookies from 'js-cookie'

const TokenKey = 'access_token'

// window.Cookies = Cookies;
export function getToken() {
  return Cookies.get('access_token')
//    return window.localStorage.getItem(TokenKey)
}

export function setToken(token) {
    // console.log(token)
  return Cookies.set('access_token', token)
    // window.localStorage.setItem(TokenKey,token)
}

export function removeToken() {
  return Cookies.remove('access_token')
    // window.localStorage.removeItem(TokenKey)
}
