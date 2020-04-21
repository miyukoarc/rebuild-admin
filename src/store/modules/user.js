import { login, logout, getInfo, getMenu } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import qs from 'qs'
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    userInfo: {},
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SAVE_USERINFO: (state, info) =>{
    state.info = info
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login(
        // { username: username.trim(), password: password }
        qs.stringify({ username: username.trim(), 
          password: password,
          grant_type: 'password',
          type: 'sms'
        })
        
        ).then(async res => {
        const { access_token } = res.data
        await commit('SET_TOKEN', access_token)
        await setToken(access_token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(res => {
        // const { data } = res
        const { nickname, headimgurl } = res

        if (!res) {
          reject('Verification failed, please Login again.')
        }
        commit('SAVE_USERINFO',res)
        commit('SET_NAME', nickname)
        commit('SET_AVATAR', headimgurl)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },

  getMenu ({commit}){
    return new Promise(resolve=>{
      getMenu().then((res)=>{
        
        let temp = {}
        res.items.forEach(item=>{
          if(!item.url.includes('http')){
            temp[item.url.split('/')[1]] = item
          }else{
            temp['store'] = item
          }
          
        })
        commit('secondMenu/SET_MENUMAP',temp,{root:true})
        commit('secondMenu/SAVE_MENU',res.items,{root:true})
        
        resolve()
      }).catch(err=>{

      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

