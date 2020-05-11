<template>
    <div class="p-3">
        <div class="h5">角色</div>
        <el-form label-position="left" label-width="100px">
            <el-form-item label="名称">
                <div>{{currentRoleDetail.name}}</div>
            </el-form-item>
            <el-form-item label="名称">
                <div>{{currentRoleDetail.code}}</div>
            </el-form-item>
            <el-form-item label="菜单权限">
                <app-link :to="`/d/management/menu/list?detail=${currentRoleDetail.uuid}`">
                <el-button type="text">转到</el-button>
                </app-link>
            </el-form-item>
            <el-form-item label="创建时间">
                <div>{{currentRoleDetail.createdAt}}</div>
            </el-form-item>
            <el-form-item label="更新时间">
                <div>{{currentRoleDetail.updatedAt}}</div>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import { isEmpty } from '@/utils/normal'
import AppLink from '@/components/AppLink'
export default {
  components: {
      AppLink
  },
  data() {
    return {
      updateForm: {
        name: '',
        code: '',
        org: '',
        parent: '',
        uuid: ''
      },
      setManagerForm: {
        managerId: '',
        departmentId: ''
      },
    }
  },
  watch: {
    currentRoleDetail: {
      handler(newVal, oldVal) {
        console.log(newVal)
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    ...mapState({
        currentRoleDetail: state => state.role.currentRoleDetail
    }),
    ...mapGetters(['showRightPanel'])
  },
  mounted() {
  },
  beforeUpdate() {},
  updated() {},
  methods: {
    isEmpty(obj) {
      return isEmpty(obj)
    },
    handleClose() {
      this.$store.commit('component/TOGGLE_PANEL', false)
    },
    handleConfirm() {},
    // initData() {
    //   const currentManager = this.currentDetail.manager
    //   this.setManagerForm.departmentId = this.currentDetail.uuid
    //   this.updateForm.org = this.org.uuid
    //   this.updateForm.uuid = this.currentDetail.uuid
    //   this.updateForm.name = this.currentDetail.name
    //   this.updateForm.code = this.currentDetail.code
    //   if (this.currentParent.uuid) {
    //     this.updateForm.parent = this.currentParent.uuid
    //   }
    //   if (!this.isEmpty(currentManager)) {
    //     this.setManagerForm.managerId = currentManager.uuid
    //   }
    // }
  }
}
</script>

<style>
</style>