<template>
  <div class="current-conversation-wrapper">
    <div v-if="showCurrentConversation" class="current-conversation" @scroll="onScroll">
      <div class="header">
        <div class="name">{{ name }}</div>

        <div
          class="profile-btn"
          :class="showCurrentProfile ? '':'left-arrow'"
          title="查看详细信息"
          @click="showProfile"
        />
      </div>
      <div class="content">
        <div ref="message-list" class="message-list" @scroll="this.onScroll">
          <div v-if="!isCompleted" class="more">
            <el-button
              type="text"
              @click="$store.dispatch('getMessageList', currentConversation.conversationID)"
            >查看更多</el-button>
          </div>
          <div v-else class="no-more">没有更多了</div>
          <message-item v-for="message in currentMessageList" :key="message.ID" :message="message" />
        </div>
        <div
          v-show="isShowScrollButtomTips"
          class="newMessageTips"
          @click="scrollMessageListToButtom"
        >回到最新位置</div>
      </div>
      <div v-if="showMessageSendBox" class="footer">
        <message-send-box />
      </div>
    </div>

    <div v-else class="header-fade" />
    <!-- <conversation-panel v-show="showCurrentProfile" /> -->
    <conversation-profile v-show="showCurrentProfile" style="height:100%" />

    <el-drawer title="我是标题" :visible.sync="showDetail" size="600px" :with-header="false">
      <div class="detail-container">
        <component :is="currentDetail" />
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import MessageItem from '@/components/Message/message-item'
import MessageSendBox from '@/components/Message/message-send-box'
import ConversationProfile from './conversation-profile.vue'
import ConversationCurrentProfile from './conversation-current-profile'
import MemberProfileCard from '@/components/MemberProfileCard'
// import ConversationPanel from './conversation-panel'
import UserDetail from '@/views/management/user/detail.vue'
import DepartmentDetail from '@/views/management/department/detail'
export default {
  name: 'CurrentConversation',
  components: {
    MessageSendBox,
    MessageItem,
    ConversationProfile,
    MemberProfileCard,
    ConversationCurrentProfile,
    UserDetail,
    DepartmentDetail
    // ConversationPanel
  },
  data() {
    return {
      currentDetail: '',
      isShowScrollButtomTips: false,
      preScrollHeight: 0,
      showConversationProfile: true,
      showCurrentProfile: true,
      showDetail: false,
      timeout: ''
    }
  },
  computed: {
    ...mapState({
      currentConversation: state =>
        state['im/conversation'].currentConversation,
      currentUnreadCount: state =>
        state['im/conversation'].currentConversation.unreadCount,
      currentMessageList: state => state['im/conversation'].currentMessageList,
      isCompleted: state => state['im/conversation'].isCompleted,
      conversationID: state =>
        state['im/conversation'].currentConversation.conversationID
    }),
    ...mapGetters({
      hidden: 'im/setting/hidden',
      toAccount: 'im/conversation/toAccount'
    }),
    // 是否显示当前会话组件
    showCurrentConversation() {
      return !!this.currentConversation.conversationID
    },
    name() {
      if (this.currentConversation.type === 'C2C') {
        return this.currentConversation.userProfile.nick || this.toAccount
      } else if (this.currentConversation.type === 'GROUP') {
        return this.currentConversation.groupProfile.name || this.toAccount
      } else if (this.currentConversation.conversationID === '@TIM#SYSTEM') {
        return '系统通知'
      }
      return this.toAccount
    },
    showMessageSendBox() {
      return this.currentConversation.type !== this.TIM.TYPES.CONV_SYSTEM
    }
  },
  watch: {
    currentUnreadCount(next) {
      if (!this.hidden && next > 0) {
        this.tim.setMessageRead({
          conversationID: this.currentConversation.conversationID
        })
      }
    },
    hidden(next) {
      if (!next && this.currentUnreadCount > 0) {
        this.tim.setMessageRead({
          conversationID: this.currentConversation.conversationID
        })
      }
    },
    currentConversation: {
      handler(newVal, oldVal) {
        console.log(newVal)
        this.showCurrentProfile = true
        if (newVal.isEmptyObj()) {
          this.showCurrentProfile = false
        }
        if (newVal.conversationID == '@TIM#SYSTEM') {
          this.showCurrentProfile = false
        }
        if (newVal.conversationID == 'C2Cadministrator') {
          this.showCurrentProfile = false
        }
        this.initDetail()
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    this.$bus.$on('image-loaded', this.onImageLoaded)
    this.$bus.$on('scroll-bottom', this.scrollMessageListToButtom)
    this.$bus.$on('showConversationDetailPanel', target => {
      console.log('showConversationDetailPanel', target)
      this.genComponent(target)
      
    })
    // this.initDetail()
    if (this.currentConversation.conversationID === '@TIM#SYSTEM') {
      return false
    }
  },
  beforeDestroy() {
    this.$bus.$off('image-loaded')
    this.$bus.$off('scroll-bottom')
    this.$bus.$off('showConversationDetailPanel')
  },
  updated() {
    this.keepMessageListOnButtom()
    // 1. 系统会话隐藏右侧资料组件
    // 2. 没有当前会话时，隐藏右侧资料组件。
    //    背景：退出群组/删除会话时，会出现一处空白区域
    if (
      this.currentConversation.conversationID === '@TIM#SYSTEM' ||
      typeof this.currentConversation.conversationID === 'undefined'
    ) {
      this.showConversationProfile = false
    }
  },
  methods: {
    genComponent(info) {
      const payload = info
      const type = info.split('/')[0]
      const uuid = info.split('/')[1]
      switch (type) {
        case 'user':
          this.$store
            .dispatch('userManage/getNormalUserDetail', uuid)
            .then(() => {
              this.currentDetail = 'UserDetail'
              this.showDetail = true
            })
            .catch(err => {
              this.$message({
                type: 'error',
                message: err
              })
            })

          break;

        case 'department':
          this.$store
            .dispatch('department/getDepartmentDetail', uuid)
            .then(() => {
              this.currentDetail = 'DepartmentDetail'
              this.showDetail = true
            })
            .catch(err => {
              this.$message({
                type: 'error',
                message: err
              })
            })

            break;
      }
    },
    initDetail() {
      const payload = this.currentConversation?.userProfile?.userID
      this.$store.dispatch('contacts/getUserProfileByUserId', payload)
    },
    onScroll({ target: { scrollTop } }) {
      const messageListNode = this.$refs['message-list']
      if (!messageListNode) {
        return
      }
      if (
        this.preScrollHeight - messageListNode.clientHeight - scrollTop <
        20
      ) {
        this.isShowScrollButtomTips = false
      }
    },
    // 如果滚到底部就保持在底部，否则提示是否要滚到底部
    keepMessageListOnButtom() {
      const messageListNode = this.$refs['message-list']
      if (!messageListNode) {
        return
      }
      // 距离底部20px内强制滚到底部,否则提示有新消息
      if (
        this.preScrollHeight -
          messageListNode.clientHeight -
          messageListNode.scrollTop <
        20
      ) {
        this.$nextTick(() => {
          messageListNode.scrollTop = messageListNode.scrollHeight
        })
        this.isShowScrollButtomTips = false
      } else {
        this.isShowScrollButtomTips = true
      }
      this.preScrollHeight = messageListNode.scrollHeight
    },
    // 直接滚到底部
    scrollMessageListToButtom() {
      this.$nextTick(() => {
        const messageListNode = this.$refs['message-list']
        if (!messageListNode) {
          return
        }
        messageListNode.scrollTop = messageListNode.scrollHeight
        this.preScrollHeight = messageListNode.scrollHeight
        this.isShowScrollButtomTips = false
      })
    },
    showMore() {
      this.showConversationProfile = !this.showConversationProfile
    },
    showProfile() {
      // alert(this.showCurrentProfile)
      this.showCurrentProfile = !this.showCurrentProfile
      console.log(this.showCurrentProfile)
      this.$store.commit(
        'component/TOGGLE_CONVERSATIONPROFILE',
        this.showCurrentProfile
      )
      // this.$store.commit('im/conversation/TOGGLE_PROFILE', this.showCurrentProfile)
    },
    onImageLoaded() {
      this.keepMessageListOnButtom()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/base.scss';

/* 当前会话的骨架屏 */

.header-fade {
  height: 36px;
  width: 100%;
  border-top: 1px solid #e7e7e7;
  border-bottom: 1px solid #e7e7e7;
}
.current-conversation-wrapper {
  background-color: $background-light;
  color: $base;
  display: flex;
  flex: 1px;
  .current-conversation {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .profile {
    height: $height;
    overflow-y: scroll;
    width: 220px;
    border-left: 1px solid $border-base;
    flex-shrink: 0;
  }
  .more {
    display: flex;
    justify-content: center;
    font-size: 12px;
  }
  .no-more {
    display: flex;
    justify-content: center;
    color: $secondary;
    font-size: 12px;
    padding: 10px 10px;
  }
}
.header {
  border-bottom: 1px solid #e7e7e7;
  border-top: 1px solid #e7e7e7;
  height: 36px;
  position: relative;
  .name {
    padding: 0 20px;
    color: #1c2438;
    font-size: 18px;
    font-weight: bold;
    line-height: 36px;
  }
  .profile-btn {
    position: absolute;
    top: 90px;
    right: -15px;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    cursor: pointer;
    z-index: 1001;
    &::before {
      position: absolute;
      right: 0;
      z-index: 0;
      content: '';
      width: 15px;
      height: 30px;
      border: 1px solid $border-base;
      border-radius: 0 100% 100% 0/50%;
      border-left: none;
      background-color: $background-light;
    }
    &::after {
      content: '';
      width: 8px;
      height: 8px;
      transition: transform 0.8s;
      border-top: 2px solid $secondary;
      border-right: 2px solid $secondary;
      float: right;
      position: relative;
      top: 11px;
      right: 8px;
      transform: rotate(45deg);
    }
    &:hover {
      &::after {
        border-color: $light-primary;
      }
    }
  }
  .btn-more-info {
    position: absolute;
    top: 60px;
    right: -15px;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    cursor: pointer;
    z-index: 1001;
    &::before {
      position: absolute;
      right: 0;
      z-index: 0;
      content: '';
      width: 15px;
      height: 30px;
      border: 1px solid $border-base;
      border-radius: 0 100% 100% 0/50%;
      border-left: none;
      background-color: $background-light;
    }
    &::after {
      content: '';
      width: 8px;
      height: 8px;
      transition: transform 0.8s;
      border-top: 2px solid $secondary;
      border-right: 2px solid $secondary;
      float: right;
      position: relative;
      top: 11px;
      right: 8px;
      transform: rotate(45deg);
    }
    &:hover {
      &::after {
        border-color: $light-primary;
      }
    }
  }
  .btn-more-info.left-arrow {
    transform: rotate(180deg);
    &::before {
      background-color: $white;
    }
  }
  .profile-btn.left-arrow {
    transform: rotate(180deg);
    &::before {
      background-color: $white;
    }
  }
}
.content {
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  position: relative;
  .message-list {
    width: 100%;
    box-sizing: border-box;
    overflow-y: scroll;
    padding: 0 20px;
  }
  .newMessageTips {
    position: absolute;
    cursor: pointer;
    padding: 5px;
    width: 120px;
    margin: auto;
    left: 0;
    right: 0;
    bottom: 5px;
    font-size: 12px;
    text-align: center;
    border-radius: 10px;
    border: $border-light 1px solid;
    background-color: $white;
    color: $primary;
  }
}
.show-more {
  text-align: right;
  padding: 10px 20px 0 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.detail-container {
  padding: 30px;
}

::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}
</style>