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
      console.log(this.friend.userID)
      this.tim.getConversationProfile(`C2C${this.friend.userID}`).then(({data})=>{
        this.$store.commit('im/conversation/updateCurrentConversation', data)
        this.$router.puah({url: '/d/conversation/conversation/list'})
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

<style lang="scss" scoped>
</style>
