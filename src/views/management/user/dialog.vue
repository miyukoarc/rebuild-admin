<template>
  <el-dialog title="提示" :visible.sync="dialogVisible">
    <div>
        <component :is="event" />
    </div>
  </el-dialog>
</template>

<script>
import EventDisable from './event-disable.vue'
import EventEnable from './event-enable.vue'
import EventKick from './event-kick.vue'

export default {
    components:{
        EventDisable,
        EventKick,
        EventEnable
    },
  data() {
    return {
      dialogVisible: false,
      event: 'EventDisable'
    };
  },
  computed:{
  }
};
</script>

<style>
</style>