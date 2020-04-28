<template>
<div>
                <div>
                    <p>{{currentFriendInfo.nick}}</p>
                    <p>{{currentFriendInfo.selfSignature?currentFriendInfo.selfSignature:'无'}}</p>
                </div>
                <el-button @click="handleMessage">发送消息</el-button>
            </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    name: 'FriendProfile',
    data (){
        return {}
    },
    computed: {
        ...mapState({
            currentFriendInfo: state=>state['im/friend'].currentFriendInfo
        })
    },
    methods: {
        handleMessage(){
            this.tim.getConversationProfile(`C2C${this.currentFriendInfo.userID}`).then(({data})=>{
        console.log(data,data.conversation.conversationID)
        const id = data.conversation.conversationID
        this.$store.commit('im/conversation/updateCurrentConversation', data)
        // this.$store.commit('im/friend/SAVE_CURRENTINFO',this.friend.profile)
        this.$store.dispatch(
          'im/conversation/checkoutConversation',
          id
        ).then(_=>{
          this.$router.push({path: '/d/conversation/conversation/list'})
        })
      })
      .catch(error => {
          this.$store.commit('im/setting/showMessage', {
            type: 'error',
            message: error.message
          })
      }) 
        }
    }
}
</script>