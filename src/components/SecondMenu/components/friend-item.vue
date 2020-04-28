<template>
  <div @click="handleFriendClick">
    <el-row class="friend-item-container">
      <el-col :span="6">
        <avatar :src="friend.profile.avatar" />
      </el-col>
      <el-col :span="18">
        <div class="friend-name">{{friend.profile.nick||friend.userID}}</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    friend: {
      type: Object,
      required: true
    }
  },
  methods:{
    handleFriendClick() {
      console.log(this.friend)
      // this.tim.getConversationProfile(`C2C${this.friend.userID}`).then(({data})=>{
        // console.log(data,data.conversation.conversationID)
        // const id = data.conversation.conversationID
        // this.$store.commit('im/conversation/updateCurrentConversation', data)
        this.$store.commit('im/friend/SAVE_CURRENTINFO',this.friend.profile)
        // this.$store.dispatch(
        //   'im/conversation/checkoutConversation',
        //   id
        // ).then(_=>{
        //   this.$router.push({path: '/d/conversation/conversation/list'})
        // })
      // })
      // .catch(error => {
      //     this.$store.commit('im/setting/showMessage', {
      //       type: 'error',
      //       message: error.message
      //     })
      // }) 
    }
  }  
}
</script>

<style lang="scss" scoped>
.friend-item-container{
  padding: 15px 20px;
}
</style>
