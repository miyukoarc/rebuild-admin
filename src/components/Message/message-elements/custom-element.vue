<template>
  <message-bubble :is-mine="isMine" :message="message">
    <div class="custom-element-wrapper">
      <!-- <div v-if="this.payload.data === 'survey'" class="survey">
        <div class="title">对IM DEMO的评分和建议</div>
        <el-rate
          v-model="rate"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value}"
        />
        <div class="suggestion">{{ this.payload.extension }}</div>
      </div>-->
      <card-board>
        <component :is="activeComponent" :payload="payload" />
      </card-board>
      <!-- <span class="text" title="您可以自行解析自定义消息">{{ text }}</span> -->
    </div>
  </message-bubble>
</template>

<script>
import MessageBubble from '../message-bubble'
import CardBoard from '@/components/CardBoard'
import { Rate } from 'element-ui'
import { ACTION } from '@/utils/trtcCustomMessageMap'
import { formatDuration } from '@/utils/formatDuration'
import UserCard from '@/views/management/user/card'
import DepartmentCard from '@/views/management/department/card'

export default {
  name: 'CustomElement',
  data() {
    return {
      activeComponent: 'UserCard'
    }
  },
  components: {
    UserCard,
    MessageBubble,
    CardBoard,
    DepartmentCard,
    ElRate: Rate
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
    // customData (){
    //     return JSON.parse(this.payload.data)
    // },
    // customDescription(){
    //     return this.payload.description
    // },
    // customExtension (){
    //     return this.payload.extension
    // },
    text() {
      return this.translateCustomMessage(this.payload)
    },
    rate() {
      return parseInt(this.payload.description)
    }
  },
  mounted() {
    this.genComponent()
  },
  methods: {
    genComponent() {
      const str = this.payload.extension
      const type = str.split('/')[0]
      switch (type) {
        case 'user':
          this.activeComponent = 'UserCard'
          break
        case 'department':
          this.activeComponent = 'DepartmentCard'
          break
      }

      console.log(type)
    },
    translateCustomMessage(payload) {
      let videoPayload = {}
      try {
        videoPayload = JSON.parse(payload.data)
      } catch (e) {
        videoPayload = {}
      }
      if (payload.data === 'group_create') {
        return `${payload.extension}`
      }
      switch (videoPayload.action) {
        case ACTION.VIDEO_CALL_ACTION_DIALING:
          return '[请求通话]'
        case ACTION.VIDEO_CALL_ACTION_SPONSOR_CANCEL:
          return '[取消通话]'
        case ACTION.VIDEO_CALL_ACTION_REJECT:
          return '[拒绝通话]'
        case ACTION.VIDEO_CALL_ACTION_SPONSOR_TIMEOUT:
          return '[无应答]'
        case ACTION.VIDEO_CALL_ACTION_ACCEPTED:
          return '[开始通话]'
        case ACTION.VIDEO_CALL_ACTION_HANGUP:
          return `[结束通话，通话时长：${formatDuration(
            videoPayload.duration
          )}]`
        case ACTION.VIDEO_CALL_ACTION_LINE_BUSY:
          return '[正在通话中]'
        case ACTION.VIDEO_CALL_ACTION_ERROR:
          return '[设备异常]'
        default:
          return '[自定义消息]'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.text {
  font-weight: bold;
}
.title {
  font-size: 16px;
  font-weight: 600;
  padding-bottom: 10px;
}
.survey {
  background-color: #fff;
  color: #000;
  padding: 20px;
  display: flex;
  flex-direction: column;
}
.suggestion {
  padding-top: 10px;
  font-size: 14px;
}

.custom-element-wrapper {
  display: flex;
}
</style>
