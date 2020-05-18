<template>
  <el-form :model="form" ref="form" :rules="rules" label-width="100px">
    <el-form-item label="名称" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <!-- <el-form-item label="Code" prop="code">
      <el-input v-model="form.code"></el-input>
    </el-form-item> -->
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
        name: '',
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
      currOrgTemplate:{
          handler(newVal,oldVal){
              if(newVal){
                //   console.log(newVal)
                  this.initData()
              }
          },
          immediate: true,
          
      }
  },
  computed: {
      ...mapState({
          currOrgTemplate: state => state.orgTemplate.currOrgTemplate
      })
  },
  updated(){
    //   console.log('updated')
    //   this.initData()
  },
  methods: {
    initData(){
        this.form.name = this.currOrgTemplate.name
        this.form.uuid = this.currOrgTemplate.uuid
    },
    handleConfirm() {
      const payload = this.form

      this.$refs['form'].validate(valid => {
        if (valid) {
            console.log(payload)
          this.$store
            .dispatch('orgTemplate/updateOrgTemplate', payload)
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
      this.$store.dispatch('orgTemplate/orgTemplateQueryList').catch(err => {
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