<template>
  <div class="conversation-profile-wrapper">
      
    <!-- <user-profile
      v-if="currentConversation.type === TIM.TYPES.CONV_C2C"
      :user-profile="currentConversation.userProfile"
    />-->

    <friend-detail v-if="currentConversation.type === TIM.TYPES.CONV_C2C" />

    <!-- <group-profile
      v-if="currentConversation.type === TIM.TYPES.CONV_GROUP"
      :group-profile="currentConversation.groupProfile"
    />-->

    <component class="p-3" v-else v-bind:is="profileType" />

  </div>
</template>

<script>
import { mapState } from 'vuex'
import GroupProfile from './group-detail.vue'
import FriendDetail from './friend-detail.vue'
import DepartmentProfile from '@/views/management/department/detail'

export default {
  name: 'ConversationProfile',
  props: {
    profileType: {
      type: String
    }
  },
  components: {
    GroupProfile,
    FriendDetail,

    /**
     * profile
     */
    DepartmentProfile
  },
  data() {
    return {}
  },
  watch: {
    currentConversation: {
      handler(newVal, oldVal) {
        // console.log(newVal.type)
        if (newVal.type == '@TIM#SYSTEM') {
          this.$store.commit('component/TOGGLE_CONVERSATIONPROFILE', false)
        }
      },
      deep: true,
      immediate: true
    }
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
  min-width: 600px;
  background-color: $white;
  height: 100%;
  overflow-y: scroll;
}

/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}
</style>