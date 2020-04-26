<template>
  <div ref="panel" class="profile-container" :class="{show:showConversationProfile&&!isEmpty(currentConversation)}">
    <div class="profile-panel">
      <slot />
    </div>
  </div>
</template>

<script> 
import { mapGetters, mapState } from 'vuex'
import { isEmpty } from '@/utils/normal'
export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters(['showConversationProfile']),
    ...mapState({
      currentConversation: state => state['im/conversation'].currentConversation
    })
    
  },
  mounted() {
    // this.init()
  },
  beforeDestroy() {
    const elx = this.$refs.panel
    elx.remove()
  },
  methods: {
    isEmpty(obj){
      return isEmpty(obj)
    },
    init() {
      const elx = this.$refs.panel
      const body = document.querySelector('.board-container')
      body.insertBefore(elx, body.lastChild)
    }

  }
}
</script>

<style lang="scss" scoped>
.profile-container{
    height: 100%;
    width: 300px;
    display: none;
    &.show {
        display: block;
        transition: all 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
        .profile-panel{
            transform:translate(0)
        }
    }
}

.profile-panel{
    // width: 100%;
    max-width: 300px;
    height: 100%;
    // position: fixed;
    // top: 0;
    // right: 0;
    -webkit-box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.05);
    box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.05);
    -webkit-transition: all 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
    transition: all 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
    -webkit-transform: translate(100%);
    transform: translate(100%);
    background: #e7e7e7;
    z-index: 40000;
}
</style>
