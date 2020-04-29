<template>
  <div class="conversation-profile-wrapper">
    <!-- <user-profile
      v-if="currentConversation.type === TIM.TYPES.CONV_C2C"
      :user-profile="currentConversation.userProfile"
    /> -->
    <!-- <group-profile
      v-else-if="currentConversation.type === TIM.TYPES.CONV_GROUP"
      :group-profile="currentConversation.groupProfile"
    /> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import GroupProfile from '@/components/ConversationProfile/group-profile.vue'
import UserProfile from '@/components/ConversationProfile/user-profile.vue'
export default {
  name: 'ConversationProfile',
  components: {
    GroupProfile,
    UserProfile
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      currentConversation: state => state['im/conversation'].currentConversation
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/base.scss';

.conversation-profile-wrapper {
  background-color:$white;
  height: 100%;
  overflow-y: scroll;
}

/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}
</style>
