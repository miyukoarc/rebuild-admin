<template>
  <div @click="handleGroupClick">
    <el-row class="group-item-container">
      <el-col :span="6">
        <avatar :src="group.avatar" />
      </el-col>
      <el-col :span="18">
        <div class="group-name">{{group.name}}</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  props: {
    group: {
      type: Object,
      required: true
    }
  },
  methods:{
    handleGroupClick() {
      console.log(this.group)
      this.tim.getConversationProfile(`C2C${this.group.groupID}`).then(({data})=>{
        console.log(data,data.conversation.conversationID)
        const id = data.conversation.conversationID
        // this.$store.commit('im/conversation/updateCurrentConversation', data)
        // this.$store.commit('im/friend/SAVE_CURRENTINFO',this.group.profile)
        // this.$store.dispatch(
        //   'im/conversation/checkoutConversation',
        //   id
        // ).then(_=>{
        //   this.$router.push({path: '/d/conversation/conversation/list'})
        // })
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
.group-item-container{
  padding: 15px 20px;
}
</style>
