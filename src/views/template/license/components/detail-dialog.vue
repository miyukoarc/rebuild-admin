<template>
  <div>
    <el-dialog
      :title="genTitle()"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      append-to-body
      width="600px"
      :close-on-click-modal="false"
    >
      <div>
        <component :is="event" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import EventDisable from './event-disable.vue'
// import EventEnable from './event-enable.vue'
// import EventKick from './event-kick.vue'
// import CreateTemplate from './event-create.vue'
// import EditTemplate from './event-edit.vue'

import GradeCreate from './grade-create'
import GradeEdit from './grade-edit'
import PenalizeCreate from './penalize-create'
import PenalizeEdit from './penalize-edit'
import ReasonCreate from './reason-create'
import ReasonEdit from './reason-edit'

import { mapState } from 'vuex'
export default {
  components: {
    GradeCreate,
    GradeEdit,
    PenalizeCreate,
    PenalizeEdit,
    ReasonCreate,
    ReasonEdit
  },
  data() {
    return {
      dialogVisible: false,
      event: 'GradeCreate',
      eventType: ''
    }
  },
  watch: {
    eventType: {
      handler(newVal, oldVal) {
        //   console.log(newVal)
        if (newVal) {
          this.genTitle()
          //   this.toggleComponent(newVal)
        }
      },
      immediate: true
    }
  },
  computed: {
    ...mapState({})
  },
  mounted() {},
  updated() {
    //   console.warn(this.genTitle())
  },
  methods: {
    genTitle() {
      if (this.eventType.includes('create')) {
        return '创建'
      }

      if (this.eventType.includes('edit')) {
        return '编辑'
      }
    }
  }
}
</script>

<style>
</style>