<template>
  <message-bubble :is-mine="isMine" :message="message">
    <div class="face-element-wrapper">
      <img :src="url">
    </div>
  </message-bubble>
</template>

<script>
import MessageBubble from '../message-bubble'
export default {
  name: 'FaceElement',
  components: {
    MessageBubble
  },
  props: {
    payload: {
      type: Object,
      required: true
    },
    message: {
      type: Object,
      required: true
    },
    isMine: {
      type: Boolean
    }
  },
  computed: {
    url() {
      let name = ''
      if (this.payload.data.indexOf('@2x') > 0) {
        name = this.payload.data
      } else {
        name = this.payload.data + '@2x'
      }
      return `https://imgcache.qq.com/open/qcloud/tim/assets/face-elem/${name}.png`
    }
  }
}
</script>

<style lang="scss" scoped>
.face-element-wrapper
  img{
    max-width:90px;
  }

</style>
