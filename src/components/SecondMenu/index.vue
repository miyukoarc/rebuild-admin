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
          <sidebar-item v-for="(item,index) in currSecondMenu" :key="item.url||index" :item="item"/>
        </div>

        <div v-if="menuModule=='friend'">
          <friend-item v-for="friend in friendList" :key="friend.userID" :friend="friend"></friend-item>
        </div>

        <div v-if="menuModule=='conversation'">
          <conversation-item :conversation="item"
        v-for="item in conversationList"
        :key="item.conversationID"></conversation-item>
        </div>
        
     </el-menu>
    <!-- </el-scrollbar> -->
</template>
<script>
import variables from '@/styles/variables.scss';
//

import {getStateMachine} from '@/api/stateSetting'
import FriendItem from './components/friend-item'
import ConversationItem from './components/conversation-item'
import SidebarItem from './components/item'
import {mapState} from 'vuex'

export default {
    components:{
      SidebarItem,
      FriendItem,
      ConversationItem
    },
    data (){
        return {
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
    computed:{
      ...mapState({
        menuType: state=>state.secondMenu.menuType,
        menuMap: state=>state.secondMenu.menuMap,
        menuModule: state=>state.secondMenu.menuModule,
        currSecondMenu: state => state.secondMenu.currSecondMenu,
        openArr: state=>state.secondMenu.openArr,
        conversationList: state => state['im/conversation'].conversationList,
        currentConversation: state=> state['im/conversation'].currentConversation,
        friendList: state => state['im/friend'].friendList
      }),
      variables() {
        return variables
      },
    },
    mounted(){
    },
    methods:{
      openArray(){

      }

    }
}
</script>

<style lang="scss" scoped>

</style>