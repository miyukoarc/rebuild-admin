<template>
  <div>
      <!-- 联系人 -->
      <!-- <friend-profile v-if="!isEmpty(currentFriendInfo)"></friend-profile> -->
      <img src="https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3" alt="">
  </div>
</template>

<script>
import {mapState} from 'vuex'
import FriendProfile from './friend-profile'
import {isEmpty} from '@/utils/normal'
export default {
  components: {
    FriendProfile
  },
  computed:{
    ...mapState({
      currentFriendInfo: state => state['im/friend'].currentFriendInfo
    }),
    hasFriendProfile(){

    }
  },
  methods: {
    isEmpty(obj){
      return isEmpty(obj)
    }
  }
}
</script>

<style>

</style>