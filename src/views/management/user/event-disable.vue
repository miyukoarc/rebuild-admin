<template>
  <el-form :model="form" ref="form" :rules="rules" label-width="100px">
    <el-form-item label="原因" prop="reason">
      <el-input v-model="form.reason"></el-input>
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
  data() {
    return {
      form: {
        reason: '',
        uuid: ''
      },
      rules: {
        reason: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 5, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      userDetail: state => state.userManage.userDetail
    })
  },
  methods: {
    handleConfirm() {
      const payload = { reason: this.form.reason, uuid: this.userDetail.uuid }
      this.$refs['form'].validate(valid => {
        this.$store
          .dispatch('userManage/disableUser', payload)
          .then(() => {
            this.$message({
              type: 'success',
              message: '操作成功'
            })
          })
          .catch(err => {
            console.log(err)
            this.$message({
              type: 'error',
              message: '操作失败'
            })
          })
      })
    },
    handleCancel() {
        console.log(this.$parent)
      this.$parent.$parent.dialogVisible = false
    }
  }
}
</script>

<style>
</style>