<template>
  <message-bubble :is-mine="isMine" :message="message">
    <video
      :src="payload.videoUrl"
      :poster="payload.thumbUrl"
      controls
      class="video"
      @error="videoError"
    />
  </message-bubble>
</template>

<script>
import MessageBubble from '../message-bubble'
export default {
  name: 'VideoElement',
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
  methods: {
    videoError(e) {
      this.$message.error('视频出错，错误原因：' + e.target.error.message)
    }
  }
}
</script>

<style lang="scss" scoped>
.video{
    width: 100%;
    max-height: 300px;
}

</style>
