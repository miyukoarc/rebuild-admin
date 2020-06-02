<template>
  <el-form :model="form" ref="form" :rules="rules" label-width="100px">
    <el-form-item label="名称">
      <el-input v-model="form.name"></el-input>
    </el-form-item>

    <el-form-item label="URL">
      <el-input v-model="form.url"></el-input>
    </el-form-item>

    <el-form-item label="惩罚">
      <el-input v-model="form.penalize"></el-input>
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
        licenseTemplate: 0,
        name: '',
        org: 0,
        penalize: '',
        url: '',
        uuid: 0
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      currentLicenseTemplate: state => state.licenseTemplate.currentLicense,
      currOrgTemplate: state => state.orgTemplate.currOrgTemplate,
      departmentTemplates: state => state.orgTemplate.currOrgTemplate.departmentTemplates,
      userInfo: state => state.user.userInfo,
      currentPenalize: state => state.licensePenalize.currentPenalize
    })
  },
  watch: {

  },
  mounted() {
    this.form.org = this.userInfo.org.uuid
    this.form.licenseTemplate = this.currentLicenseTemplate.uuid
    this.form.uuid = this.currentPenalize.uuid
    this.$bus.$on('transferCurrentPenalize',target=>{
        console.log(target)
        for(let key in this.form){
            for(let aim in target){
                if(key===aim){
                    this.form[aim] = target[aim]
                }
            }
        }
    })
  },
  beforeDestroy(){
      this.$bus.$off('transferCurrentPenalize')
  },
  methods: {
    handleConfirm() {

      const payload = this.form

      this.$refs['form'].validate(valid => {
        if (valid) {
          console.log(payload)
          this.$store
            .dispatch('licensePenalize/addPenalize', payload)
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
      this.$store
        .dispatch('licensePenalize/getPenalizeList', this.form.licenseTemplate)
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

