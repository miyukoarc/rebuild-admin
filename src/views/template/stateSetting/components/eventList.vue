<template>
  <div class="outer-container">
    <p class="text-align-right">{{eventTitle}}</p>
    <div class="container">
      <!-- <div class="action-item" v-for="(item, index) in unusedEvents" :key="index">{{item}}</div> -->
      <div>
        <el-button
          @click="handleEdit(item)"
          plain
          type="info"
          size="mini"
          v-for="(item, index) in dataList"
          :key="index"
        >{{item.name}}</el-button>
      </div>

      <!-- <PanelButton
        title="编辑事件"
        type="success"
        v-for="(item, index) in unusedEvents"
        :key="index"
        size="mini"
        :labelText="item.name"
        inline
        :formData="item"
        :mType="AddButtonFormType.ADDBUTTONEVENT"
        @submitStateData="editStateData"
      /> -->
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import EditEvent from './edit-detail'
import PanelButton from './CommonBtnAndPanel'
import { AddButtonFormType } from '@/utils/commonEnum'
export default {
  components: {
    EditEvent,
    PanelButton
  },
  props:{
    eventTitle:String,
    dataList:{
      type:Array,
      default:[]
    }
  },
  data() {
    return {
      AddButtonFormType,
      stringHtml: {},
      showEditState: false
    }
  },
  computed: {
    ...mapState({
      unusedEvents: state => state.stateSettings.unusedEvents
    })
  },
  methods: {
    handleEdit(item) {
      this.$parent.$refs['editDialog'].pendingEvent = item
      
      this.$parent.$refs['editDialog'].event = 'EditEvent'
      
      this.$parent.$refs['editDialog'].dialogVisible = true
    },
    editStateData([form, type]) {
      this.$emit('editStateData', [form, type])
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/base.scss';
.outer-container {
  margin: 0px 20px;
}

.container {
  text-align: right;
}

.action-item {
  padding: 10px;
  margin: 0px 5px 0px 0px;
  border-radius: 4px;
  border: 1px solid #409eff;
}
</style>
