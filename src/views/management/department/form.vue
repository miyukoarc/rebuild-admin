<template>
  <div>
    <el-form
      label-width="100px"
      label-position="left"
      ref="updateForm"
      :model="updateForm"
      :rules="rules"
    >
      <el-form-item label="名称" prop="name">
        <el-input v-model="updateForm.name"></el-input>
      </el-form-item>
      <!-- <el-form-item label="Code" prop="code">
        <el-input v-model="updateForm.code"></el-input>
      </el-form-item>-->
      <el-form-item label="上级">
        <el-select v-model="updateForm.parent" placeholder="请选择">
          <el-option
            v-for="item in allDepartments"
            :key="item.code"
            :label="item.name"
            :value="item.uuid"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="主管">
        <el-select v-model="setManagerForm.managerId">
          <el-option
            v-for="item in employeeList"
            :key="item.uuid"
            :label="item.nickname"
            :value="item.uuid"
          ></el-option>
        </el-select>
      </el-form-item>

      <!-- <el-form-item label="关系">
        <relation-card></relation-card>
      </el-form-item>-->

      <!-- <el-form-item label="成员">
        <div v-if="!isEmpty(currentDetail.users)">
          <el-tag
            style="margin-right:3px;"
            v-for="user in currentDetail.users"
            :key="user.uuid"
            size="mini"
          >{{user.nickname}}</el-tag>
        </div>
      </el-form-item>-->
      <!-- <el-form-item label="删除">
        
      </el-form-item>-->
      <el-form-item>
        <el-button size="small" type="primary" @click.native="handleConfirm('updateForm')">确定</el-button>
        <el-button size="small" type="info" @click.native="handleClose">取消</el-button>
        <!-- <el-button type="danger" size="small" @click.native="handleDel">删除</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import RelationCard from './card'
import { isEmpty } from '@/utils/normal'
import { requestWarn } from '@/utils/normal';

export default {
  components: {
    RelationCard
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
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    currentDetail: {
      handler(newVal, oldVal) {
        this.initData()
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    ...mapState({
      org: state => state.user.userInfo.org,
      currentParent: state => state.department.currentParent,
      employeeList: state => state.employee.employeeList,
      allDepartments: state => state.department.allDepartments,
      currentDetail: state => state.department.currentDetail
    }),
    ...mapGetters(['showRightPanel'])
  },
  mounted() {
    this.initData()
  },
  inject: ['reload'],
  beforeUpdate() {},
  updated() {},
  methods: {
    isEmpty(obj) {
      return isEmpty(obj)
    },
    handleClose() {
      // this.$store.commit('component/TOGGLE_PANEL', false)
      this.$emit('closeDialog', false)
    },
    handleConfirm(ref) {
      this.$refs[ref].validate(valid => {
        if (valid) {
          this.$store
            .dispatch('department/updateDepartment', this.updateForm)
            .then(async _ => {
              this.reload()
              if (this.setManagerForm.managerId) {
                this.$store
                  .dispatch('department/setDepartmentManager', {
                    ...this.setManagerForm
                  })
                  .catch(err => {
                    this.$message({
                      type: 'error',
                      message: err
                    })
                  })
              }

              this.$store.dispatch('department/getAllDepartments').then(_ => {
                this.$message({
                  type: 'success',
                  message: '操作成功'
                })
                this.$emit('closeDialog', false)
              })
              //   this.showDialog = false
              this.handleClose()
            })
            .catch(err => {
              this.$message({
                type: 'error',
                message: err
              })
            })
        } else {
          return false
        }
      })
    },
    handleDel() {
      this.$confirm('是否删除当前部门', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$store
            .dispatch('department/deleteDepartment', {
              uuid: this.currentDetail.uuid
            })
            .then(_ => {
              this.$store.dispatch('department/getDepartment')
              this.$store.dispatch('department/getAllDepartments')

              // this.$router.replace(this.$route.path)
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.$emit('closeDialog', false)
            })
            .catch(err => {
              this.$message({
                type: 'error',
                message: err.error
              })
            })
        })
        .catch(err => {
          requestWarn(err)
        })
    },
    initData() {
      this.$store.dispatch('department/getAllDepartments')
      const currentManager = this.currentDetail.manager
      this.setManagerForm.departmentId = this.currentDetail.uuid
      this.updateForm.org = this.org.uuid
      this.updateForm.uuid = this.currentDetail.uuid
      this.updateForm.name = this.currentDetail.name
      this.updateForm.code = this.currentDetail.code
      if (this.currentParent.uuid) {
        this.updateForm.parent = this.currentParent.uuid
      }
      if (!this.isEmpty(currentManager)) {
        this.setManagerForm.managerId = currentManager.uuid
      }
    }
  }
}
</script>

<style>
</style>