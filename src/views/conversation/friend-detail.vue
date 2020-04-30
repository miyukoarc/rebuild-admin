<template>
  <div>
    <h4>详情</h4>
    <br />
    <el-form label-width="100px" label-position="left">
      <el-form-item>
        <div>
          <img width="128" height="128" :src="currentContact.headimgurl" />
        </div>
      </el-form-item>
      <el-form-item label="昵称">
        <!-- <div>{{currentContact.nickname}}</div> -->
      </el-form-item>
      <el-form-item label="性别">
        <!-- <div>{{sex(currentContact.gender)}}</div> -->
      </el-form-item>
      <el-form-item label="状态">
        <!-- <div>
          <el-tag
            type="primary"
            size="mini"
          >{{isEmpty(currentContact.state)?'未指定':currentContact.state.name}}</el-tag>
        </div> -->
      </el-form-item>

      <el-form-item label="角色">
        <!-- <div>
          {{
          currentContact.role&&currentContact.role.name
          }}
        </div> -->
      </el-form-item>
      <el-form-item label="公司">
        <!-- {{
        currentContact.org&&currentContact.org.name
        }} -->
      </el-form-item>
      <el-form-item label="部门">
        <!-- {{
        isEmpty(currentContact.department)?'未指定':currentContact.department.name
        }} -->
      </el-form-item>

      <el-form-item label="可用">
        <!-- <div>
          <el-tag type="success" v-if="currentContact.enabled">可用</el-tag>
          <el-tag type="danger" v-else>不可用</el-tag>
        </div> -->
      </el-form-item>
      <el-form-item label="手机">
        <!-- <div>{{currentContact.userinfo&&currentContact.userinfo.mobile}}</div> -->
      </el-form-item>
      <el-form-item
        label="国家/地区"
      >
      <!-- {{isEmpty(currentContact.country)&&isEmpty(currentContact.city)&&isEmpty(currentContact.province)?'未设置':currentContact.country+currentContact.city+currentContact.province}} -->
      </el-form-item>
      <!-- <el-form-item label="操作" v-if="currentContact.events.length">
        <el-button
          v-for="item in currentContact.events"
          :key="item"
          @click="handleEvents(item)"
        >{{item}}</el-button>
      </el-form-item>-->
      <!-- <el-form-item>
        <el-button size="small" type="success" @click="handleClose">返回</el-button>
      </el-form-item>-->
    </el-form>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { isEmpty } from '@/utils/normal'
export default {
  components: {
  },
  data() {
    return {}
  },
  watch: {},
  computed: {
    ...mapState({
      eventsMap: state => state.stateSettings.eventsMap,
      currentContact: state => state.contacts.currentContact
    })
  },
  mounted() {},
  beforeUpdate() {},
  updated() {},
  methods: {
    sex(gender) {
      if (gender == 'Gender_Type_Unknown' || !gender) {
        return '未知'
      }
      if (gender == 'Gender_Type_Female') {
        return '女'
      }
      if (gender == 'Gender_Type_Male') {
        return '男'
      }
    },
    isEmpty(obj) {
      return isEmpty(obj)
    }
    /*
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
    }*/
  }
}
</script>

<style>
</style>