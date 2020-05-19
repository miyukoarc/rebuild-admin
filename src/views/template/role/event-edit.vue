<template>
  <el-form :model="form" ref="form" :rules="rules" label-width="100px">
    <el-form-item label="名称" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="Code" prop="code">
      <el-input v-model="form.code"></el-input>
    </el-form-item>

    <el-form-item label="终端">
        <el-select  v-model="form.terminal" placeholder="请选择">
            <el-option
                v-for="item in options"
                :key="item.val"
                :label="item.name"
                :value="item.val"
            ></el-option>
        </el-select>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" size="small" @click="handleConfirm">确定</el-button>
      <el-button type="danger" size="small" @click="handleCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapState } from 'vuex'
export default {
  inject: ['reload'],
  data() {
    return {
      form: {
        code: '',
        name: '',
        org: 0,
        // parent: 0,
        terminal: '',
        uuid: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    currRoleTemplate: {
      handler(newVal, oldVal) {
        if (newVal) {
          //   console.log(newVal)
          this.initData()
        }
      },
      immediate: true
    }
  },
  computed: {
    ...mapState({
      currDepartmentTemplate: state =>
        state.departmentTemplate.currDepartmentTemplate,
      currOrgTemplate: state => state.orgTemplate.currOrgTemplate,
      currRoleTemplate: state => state.roleTemplate.currRoleTemplate
    })
  },
  updated() {
    //   console.log('updated')
    //   this.initData()
  },
  methods: {
    initData() {
      this.form.code = this.currRoleTemplate.code
      this.form.name = this.currRoleTemplate.name
      this.form.uuid = this.currRoleTemplate.uuid
      this.form.terminal = this.currRoleTemplate.currRoleTemplate
      // this.form.parent = this.currDepartmentTemplate
      this.form.org = this.currOrgTemplate.uuid
    },
    handleConfirm() {
      const payload = this.form

      this.$refs['form'].validate(valid => {
        if (valid) {
          console.log(payload)
          this.$store
            .dispatch('departmentTemplate/updateTemplate', payload)
            .then(() => {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              this.handleCancel()
              this.refresh()
            })
            .catch(err => {
              console.log(err)
              this.$message({
                type: 'error',
                message: '操作失败'
              })
            })
        } else {
          this.$message({
            type: 'error',
            message: '请检查输入'
          })
        }
      })
    },
    handleCancel() {
      this.$parent.$parent.dialogVisible = false
    },
    refresh() {
      console.log('刷新')
      const payload = this.$route.params.org
      this.$store
        .dispatch('departmentTemplate/templateQueryList', payload)
        .then(() => {
          this.reload()
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: err
          })
        })
    }
  }
}
</script>

<style>
</style>