<template>
  <!-- <el-scrollbar wrap-class="scrollbar-wrapper"> -->
  <el-menu
    :collapse="false"
    :background-color="variables.menuBg"
    :text-color="variables.menuText"
    :unique-opened="false"
    :default-openeds="openArr"
    :active-text-color="variables.menuActiveText"
    :collapse-transition="false"
    :default-active="$route.path"
    mode="vertical"
  >
    <!-- <component :is="itemComponent[menuModule]" /> -->
    <div v-if="menuModule=='management'||menuModule=='menu'">
      <sidebar-item v-for="(item,index) in currSecondMenu" :key="item.url||index" :item="item" />
    </div>

    <div v-if="menuModule=='friend'">
      <el-menu-item>联系人</el-menu-item>
      <friend-item v-for="friend in friendList" :key="friend.userID" :friend="friend"></friend-item>
      <el-menu-item>群组</el-menu-item>
      <group-item v-for="group in groupList" :key="group.groupID" :group="group"></group-item>
    </div>

    <div v-if="menuModule=='conversation'">
      <div class="header-bar">
        <button title="刷新列表" @click="handleRefresh">
          <i class="tim-icon-refresh"></i>
        </button>
        <button title="创建会话" @click="handleAddButtonClick">
          <i class="tim-icon-add"></i>
        </button>
      </div>

      <conversation-item
        :conversation="item"
        v-for="item in conversationList"
        :key="item.conversationID"
      ></conversation-item>

      <el-dialog title="快速发起会话" :visible.sync="showDialog" width="30%" append-to-body>
        <el-input placeholder="请输入用户ID" v-model="userID" @keydown.enter.native="handleConfirm" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="showDialog = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirm">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </el-menu>
  <!-- </el-scrollbar> -->
</template>
<script>
import variables from '@/styles/variables.scss'
//

import { getStateMachine } from '@/api/stateSetting'
import FriendItem from './components/friend-item'
import GroupItem from './components/group-item'
import ConversationItem from './components/conversation-item'
import SidebarItem from './components/item'
import { mapState } from 'vuex'

export default {
  components: {
    SidebarItem,
    FriendItem,
    GroupItem,
    ConversationItem
  },
  data() {
    return {
      showDialog: false,
      userID: '',
      menuList: [],
      itemComponent: {
        conversation: 'ConversationItem',
        friend: 'FriendItem',
        menu: 'SidebarItem',
        management: 'SidebarItem'
      }
    }
  },
  watch: {
    // menuList:{
    //   handler(newVal,oldVal){
    //     console.log(newVal)
    //   },
    //   deep:true,
    //   immediate:true
    // }
  },
  computed: {
    ...mapState({
      groupList: state => state['im/group'].groupList,
      menuType: state => state.secondMenu.menuType,
      menuMap: state => state.secondMenu.menuMap,
      menuModule: state => state.secondMenu.menuModule,
      currSecondMenu: state => state.secondMenu.currSecondMenu,
      openArr: state => state.secondMenu.openArr,
      conversationList: state => state['im/conversation'].conversationList,
      currentConversation: state =>
        state['im/conversation'].currentConversation,
      friendList: state => state['im/friend'].friendList
    }),
    variables() {
      return variables
    }
  },
  mounted() {},
  methods: {
    handleConfirm() {
      if (this.userID !== '@TIM#SYSTEM') {
        this.$store
          .dispatch('im/conversation/checkoutConversation', `C2C${this.userID}`)
          .then(() => {
            this.showDialog = false
          })
          .catch(() => {
            this.$store.commit('showMessage', {
              message: '没有找到该用户',
              type: 'warning'
            })
          })
      } else {
        this.$store.commit('showMessage', {
          message: '没有找到该用户',
          type: 'warning'
        })
      }
      this.userID = ''
    },
    handleAddButtonClick() {
      this.showDialog = true
    },
    handleRefresh() {
      this.refreshConversation()()
    },
    openArray() {}
  }
}
</script>

<style lang="scss" scoped>
.header-bar {
  height: 50px;
  padding: 10px 10px 10px 20px;
}
</style>