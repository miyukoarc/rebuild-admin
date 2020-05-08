<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {getToken} from '@/utils/auth'
export default {
  name: 'App',
  data(){
    return {
      isRouterAlive: true
    }
  },
  computed: {
    ...mapGetters({
      hidden: 'im/setting/hidden'
    })
  },
  provide() {
    return {
      reload: this.reload,
    };
  },
  async mounted() {
    await this.initImListener()
    this.checkIMLogin()
    const check = this.checkIMLogin()
    const hasToken = this.getToken()
    console.log(hasToken,'<----------------------->检查<----------------------->')
    if ((check.userSig || check.userID)&&!!hasToken) {
      this.tim
        .login(this.checkIMLogin())
        .then(() => {
          this.$store.commit('im/setting/showMessage', {
            type: 'success',
            message: '欢迎回来'
          })
        })
        .catch(error => {})
    }

  },
  methods: {
    getToken (){
        return getToken()
    },
    reload() {
      this.isRouterAlive = false;
      window.location.reload()
    //   this.$nextTick(function() {
    //     this.isRouterAlive = true;
    //   });
    },
    checkIMLogin() {
      let userID = window.localStorage.getItem('userID')
      let userSig = window.localStorage.getItem('userSig')
      return {
        userSig,
        userID
      }
      // this.$store.commit('user/SAVE_IM_INFO',{userID:userID,userSig:userSig})
    },
    initImListener() {
      // 登录成功后会触发 SDK_READY 事件，该事件触发后，可正常使用 SDK 接口
      this.tim.on(this.TIM.EVENT.SDK_READY, this.onReadyStateUpdate, this)
      // SDK NOT READT
      this.tim.on(this.TIM.EVENT.SDK_NOT_READY, this.onReadyStateUpdate, this)
      // 被踢出
      this.tim.on(this.TIM.EVENT.KICKED_OUT, this.onKickOut)
      // SDK内部出错
      this.tim.on(this.TIM.EVENT.ERROR, this.onError)
      // 收到新消息
      this.tim.on(this.TIM.EVENT.MESSAGE_RECEIVED, this.onReceiveMessage)
      // 会话列表更新
      this.tim.on(
        this.TIM.EVENT.CONVERSATION_LIST_UPDATED,
        this.onUpdateConversationList
      )
      // 群组列表更新
      this.tim.on(this.TIM.EVENT.GROUP_LIST_UPDATED, this.onUpdateGroupList)
      // 收到新的群系统通知
      this.tim.on(
        this.TIM.EVENT.MESSAGE_RECEIVED,
        this.onReceiveGroupSystemNotice
      )
    },
    onReceiveMessage({ data: messageList }) {
      if (messageList[0].conversationID != undefined) {
        this.handleVideoMessage(messageList)
        this.handleAt(messageList)
        this.$store.commit('im/conversation/pushCurrentMessageList', messageList)
      }

      // console.info(messageList)
      // this.handleQuitGroupTip(messageList)
    },
    onError({ data }) {
      if (data.message !== 'Network Error') {
        this.$store.commit('im/setting/showMessage', {
          message: data.message,
          type: 'error'
        })
      }
    },
    onReadyStateUpdate({ name }) {
      const isSDKReady = name === this.TIM.EVENT.SDK_READY ? true : false
      this.$store.commit('im/user/toggleIsSDKReady', isSDKReady)

      if (isSDKReady) {
        this.tim
          .getMyProfile()
          .then(({ data }) => {
            this.$store.commit('im/user/updateCurrentUserProfile', data)
          })
          .catch(error => {
            this.$store.commit('im/setting/showMessage', {
              type: 'error',
              message: error.message
            })
          })
        this.tim
          .getFriendList()
          .then(({ data: friendList }) => {
            this.$store.commit('im/friend/upadteFriendList', friendList)
          })
          .catch(error => {
            this.$store.commit('im/setting/showMessage', {
              type: 'error',
              message: error.message
            })
          })
        //   .catch(error => {
        //     this.$store.commit('im/setting/showMessage', {
        //       type: 'error',
        //       message: error.message
        //     })
        //   })

        this.tim.getGroupList().then(({data:groupList})=>{
            const payload = groupList.groupList
            this.$store.commit('im/group/updateGroupList',payload)
        }).catch(error=>{
            this.$store.commit('im/setting/showMessage', {
              type: 'error',
              message: error.message
            })
        })
        this.$store.dispatch('im/blacklist/getBlacklist',{},{root:true})
      }
    },

    kickedOutReason(type) {
      switch (type) {
        case this.TIM.TYPES.KICKED_OUT_MULT_ACCOUNT:
          return '由于多实例登录'
        case this.TIM.TYPES.KICKED_OUT_MULT_DEVICE:
          return '由于多设备登录'
        case this.TIM.TYPES.KICKED_OUT_USERSIG_EXPIRED:
          return '由于 userSig 过期'
        default:
          return ''
      }
    },
    onKickOut(event) {
      this.$message({
        message: `${this.kickedOutReason(event.data.type)}被踢出，请重新登录。`,
        error: 'error'
      })
      
      this.$store.commit('im/user/toggleIsLogin', false)
      this.$store.commit('im/blacklist/reset')
      this.$store.commit('im/conversation/reset')
      this.$store.commit('im/friend/reset')
      this.$store.commit('im/group/reset')
      this.$store.commit('im/user/reset')
    },
    onUpdateConversationList(event) {
      this.$store.commit('im/conversation/updateConversationList', event.data)
    },
    onUpdateGroupList(event) {
      this.$store.commit('im/group/updateGroupList', event.data)
    },
    onReceiveGroupSystemNotice(event) {
      const isKickedout = event.data.type === 4
      const isCurrentConversation =
        `GROUP${event.data.message.payload.groupProfile.groupID}` ===
        this.currentConversation.conversationID
      // 在当前会话被踢，需reset当前会话
      if (isKickedout && isCurrentConversation) {
        this.$store.commit('im/conversation/resetCurrentConversation')
      }
      Notification({
        title: '新系统通知',
        message: translateGroupSystemNotice(event.data.message),
        duration: 3000,
        onClick: () => {
          const SystemConversationID = '@TIM#SYSTEM'
          this.$store.dispatch('im/conversation/checkoutConversation', SystemConversationID)
        }
      })
    },

    /**
     * 处理 @ 我的消息
     * @param {Message[]} messageList
     */
    handleAt(messageList) {
      // 筛选有 @ 符号的文本消息
      const atTextMessageList = messageList.filter(
        message =>
          message.type === this.TIM.TYPES.MSG_TEXT &&
          message.payload.text.includes('@')
      )
      for (let i = 0; i < atTextMessageList.length; i++) {
        const message = atTextMessageList[i]
        const matched = message.payload.text.match(/@\w+/g)
        if (!matched) {
          continue
        }
        // @ 我的
        if (matched.includes(`@${this.currentUserProfile.userID}`)) {
          // 当前页面不可见时，调用window.Notification接口，系统级别通知。
          if (this.$store.getters['im/setting/hidden']) {
            this.notifyMe(message)
          }
          Notification({
            title: `有人在群${message.conversationID.slice(5)}提到了你`,
            message: message.payload.text,
            duration: 3000
          })
          this.$bus.$emit('new-messsage-at-me', {
            data: { conversationID: message.conversationID }
          })
        }
      }
    },
    selectConversation(conversationID) {
      if (conversationID !== this.currentConversation.conversationID) {
        this.$store.dispatch('im/conversation/checkoutConversation', conversationID,{root:true})
      }
    },
    isJsonStr(str) {
      try {
        JSON.parse(str)
        return true
      } catch {
        return false
      }
    },
    handleVideoMessage(messageList) {
      const videoMessageList = messageList.filter(
        message =>
          message.type === this.TIM.TYPES.MSG_CUSTOM &&
          this.isJsonStr(message.payload.data)
      )
      if (videoMessageList.length === 0) return
      const videoPayload = JSON.parse(videoMessageList[0].payload.data)
      if (videoPayload.action === ACTION.VIDEO_CALL_ACTION_DIALING) {
        if (this.isBusy) {
          this.$bus.$emit('busy', videoPayload, videoMessageList[0])
          return
        }
        this.$store.commit('im/video/GENERATE_VIDEO_ROOM', videoPayload.room_id)
        this.selectConversation(videoMessageList[0].conversationID) // 切换当前会话页
        if (videoMessageList[0].from !== this.userID) {
          this.$bus.$emit('isCalled')
        }
      }
      if (videoPayload.action === ACTION.VIDEO_CALL_ACTION_SPONSOR_CANCEL) {
        this.$bus.$emit('missCall')
      }
      if (videoPayload.action === ACTION.VIDEO_CALL_ACTION_REJECT) {
        this.$bus.$emit('isRefused')
      }
      if (videoPayload.action === ACTION.VIDEO_CALL_ACTION_SPONSOR_TIMEOUT) {
        this.$bus.$emit('missCall')
      }
      if (videoPayload.action === ACTION.VIDEO_CALL_ACTION_ACCEPTED) {
        this.$bus.$emit('isAccept')
      }
      if (videoPayload.action === ACTION.VIDEO_CALL_ACTION_HANGUP) {
        this.$bus.$emit('isHungUp')
      }
      if (videoPayload.action === ACTION.VIDEO_CALL_ACTION_LINE_BUSY) {
        this.$bus.$emit('isRefused')
      }
      if (videoPayload.action === ACTION.VIDEO_CALL_ACTION_ERROR) {
        this.$bus.$emit('isRefused')
      }
    },
    /**
     * 使用 window.Notification 进行全局的系统通知
     * @param {Message} message
     */
    notifyMe(message) {
      // 需检测浏览器支持和用户授权
      if (!('Notification' in window)) {
        return
      } else if (window.Notification.permission === 'granted') {
        this.handleNotify(message)
      } else if (window.Notification.permission !== 'denied') {
        window.Notification.requestPermission().then(permission => {
          // 如果用户同意，就可以向他们发送通知
          if (permission === 'granted') {
            this.handleNotify(message)
          }
        })
      }
    },
    handleNotify(message) {
      const notification = new window.Notification('有人提到了你', {
        icon:
          'https://webim-1252463788.file.myqcloud.com/demo/img/logo.dc3be0d4.png',
        body: message.payload.text
      })
      notification.onclick = () => {
        window.focus()
        this.$store.dispatch('im/conversation/checkoutConversation', message.conversationID,{root:true})
        notification.close()
      }
    },
    handleLinkClick() {
      MTA.clickStat('link_two', { click: 'true' })
    },
    /**
     * 收到有群成员退群/被踢出的groupTip时，需要将相关群成员从当前会话的群成员列表中移除
     * @param {Message[]} messageList
     */
    handleQuitGroupTip(messageList) {
      // 筛选出当前会话的退群/被踢群的 groupTip
      const groupTips = messageList.filter(message => {
        return (
          this.currentConversation.conversationID === message.conversationID &&
          message.type === this.TIM.TYPES.MSG_GRP_TIP &&
          (message.payload.operationType === this.TIM.TYPES.GRP_TIP_MBR_QUIT ||
            message.payload.operationType ===
              this.TIM.TYPES.GRP_TIP_MBR_KICKED_OUT)
        )
      })
      // 清理当前会话的群成员列表
      if (groupTips.length > 0) {
        groupTips.forEach(groupTip => {
          if (
            Array.isArray(groupTip.payload.userIDList) ||
            groupTip.payload.userIDList.length > 0
          ) {
            this.$store.commit(
              'deleteGroupMemberList',
              groupTip.payload.userIDList
            )
          }
        })
      }
    }
  }
}
</script>
