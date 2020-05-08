import tim from '@/tim'
// import {Message} from 'ElementUI'
import {
    Message
  } from "element-ui";
const state ={
    currentUserProfile: {},
    isLogin: false,
    isSDKReady: false, // TIM SDK 是否 ready
    userID: 0,
    userSig: '',
    sdkAppID: 0,
}
const mutations = {
    updateCurrentUserProfile(state, userProfile) {
        state.currentUserProfile = userProfile
      },//更新当前用户资料
      toggleIsLogin(state, isLogin) {
        state.isLogin = typeof isLogin === 'undefined' ? !state.isLogin : isLogin
      },//切换登录状态
      toggleIsSDKReady(state, isSDKReady) {
        state.isSDKReady = typeof isSDKReady === 'undefined' ? !state.isSDKReady : isSDKReady
      },//切换sdk状态
      reset(state) {
        Object.assign(state, {
          currentUserProfile: {},
          isLogin: false,
          isSDKReady: false // TIM SDK 是否 ready
        })
      },//重置
      GET_USER_INFO(state, payload) {
        state.userID = payload.userID
        state.userSig = payload.userSig
        state.sdkAppID = payload.sdkAppID
      },//记录用户信息
}
const actions ={
    login({commit}, data) {
      // const localSig = window.genTestUserSig(userID).userSig
      const localSig= data.userSig
      commit('user/SAVE_USERSIG',localSig,{root:true})
      tim
        .login(
        //   {
        //   userID,
        //   userSig: localSig
        // }
        data
        )
        .then(() => {
          commit('toggleIsLogin', true)
          commit('im/setting/startComputeCurrent',{},{root:true})
          Message({ type: 'success', message: '登录成功' })
        })
        .catch(imError => {
          if (imError.code === 2000) {
            Message.error(imError.message + ', 请检查是否正确填写了 SDKAPPID')
          } else {
            Message.error(imError.message)
          }
        })
    },
    logout(context) {
        // 若有当前会话，在退出登录时已读上报
        if (context.rootState.conversation.currentConversation.conversationID) {
          tim.setMessageRead({ conversationID: context.rootState.conversation.currentConversation.conversationID })
        }
        tim.logout().then(() => {
          context.commit('toggleIsLogin')
          context.commit('im/setting/startComputeCurrent',{},{root:true})
          context.commit('reset')
        })
      }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}