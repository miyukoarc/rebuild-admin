<template>
  <div>
        <el-form label-width="100px" label-position="left">
          <el-form-item label="名称">
            <div>{{currentLicense.name}}</div>
          </el-form-item>
          <el-form-item label="证照类型">
            <div>{{currentLicense.licenseType}}</div>
          </el-form-item>
          <el-form-item label="所属机构">
            <div v-if="currentLicense.org">
                {{currentLicense.org.name}}
            </div>
          </el-form-item>

          <el-form-item label="考试">
            <div>
              {{
                  currentLicense.examScore
              }}
            </div>
          </el-form-item>
          <el-form-item label="初始积分">
            {{
            currentLicense.licenseScore
            }}
          </el-form-item>
          <el-form-item label="证号">
            {{
            currentLicense.licenseNum
            }}
          </el-form-item>

          <el-form-item label="有效期">
            {{
            currentLicense.duration+currentLicense.durationType
            }}
          </el-form-item>

          <el-form-item label="所属地区">
            <!-- {{
                Object.keys(currentLicense.city).length?currentLicense.country:""
            }}
            {{
                Object.keys(currentLicense.city).length?currentLicense.province:""
            }}
            {{
                Object.keys(currentLicense.city).length?currentLicense.city:""
            }} -->
          </el-form-item>


          <!-- <el-form-item>
            <el-button size="small" type="success" @click="handleClose">返回</el-button>
          </el-form-item>-->
        </el-form>


    <EventDialog ref="eventDialog" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import EventDialog from './dialog'
import { isEmpty } from '@/utils/normal'
export default {
  components: {
    EventDialog
  },
  data() {
    return {
      activeType: 'detail'
    }
  },
  watch: {},
  computed: {
    ...mapState({
      eventsMap: state => state.stateSettings.eventsMap,
      userDetail: state => state.userManage.userDetail,
      currentLicense: state => state.licenseTemplate.currentLicense
    })
  },
  mounted() {},
  beforeUpdate() {},
  updated() {},
  methods: {
    initHandleEvents() {},
    isEmpty(obj) {
      return isEmpty(obj)
    },
    handleClose() {
      this.$store.commit('component/TOGGLE_PANEL', false)
    },
    handleEvents(type) {
      console.log(this.$refs, type)
      const temp = type
      switch (type) {
        case 'enable':
          type = 'EventEnable'
          break
        case 'kick':
          type = 'EventKick'
          break
        case 'disable':
          type = 'EventDisable'
          break
        default:
          return false
      }
      this.$refs['eventDialog'].event = type
      this.$refs['eventDialog'].eventType = temp
      this.$refs['eventDialog'].dialogVisible = true
    },
    handleConfirm() {},
    initData() {}
  }
}
</script>

<style>
</style>