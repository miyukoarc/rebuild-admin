<template>
  <el-form :model="form" ref="form" :rules="rules" label-width="100px">
    <el-form-item label="名称">
      <el-input v-model="form.name"></el-input>
    </el-form-item>

    <el-form-item label="颜色分类">
      <el-color-picker v-model="form.colour"></el-color-picker>
    </el-form-item>

    <el-form-item label="启用次数限制">
      <el-checkbox v-model="form.enableCount"></el-checkbox>
    </el-form-item>

    <el-form-item label="积分区间">
        <el-input-number size="medium" v-model="form.gradeBeginScore" :max="form.gradeEndScore" :min="0"></el-input-number>
        <el-input-number size="medium" v-model="form.gradeEndScore" :min="form.gradeBeginScore"></el-input-number>
    </el-form-item>

    <el-form-item label="等级说明">
        <el-input v-model="form.gradeExplanation"></el-input>
    </el-form-item>

    <el-form-item label="违章限制(重)">
        <el-input-number size="medium" v-model="form.severeCount" :min="0"></el-input-number>
    </el-form-item>

    <el-form-item label="违章限制(中)">
        <el-input-number size="medium" v-model="form.moderateCount" :min="0"></el-input-number>
    </el-form-item>

    <el-form-item label="违章限制(轻)">
        <el-input-number size="medium" v-model="form.mildCount" :min="0"></el-input-number>
    </el-form-item>

    <el-form-item label="默认启用">
      <el-checkbox v-model="form.useByDefault"></el-checkbox>
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
        colour: 'string',
        enableCount: true,//次数限制
        gradeBeginScore: 0,//区间
        gradeEndScore: 0,//区间
        gradeExplanation: 'string',//等级说明
        // isEnableCount: true,//
        licenseTemplate: 0,//关联侦照
        mildCount: 0,//轻度违章次数限制
        moderateCount: 0,//中度违章次数限制
        name: 'string',
        org: 0,
        severeCount: 0,//严重违章次数限制
        useByDefault: true//默认使用
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
        licenseTemplateList: state=>state.licenseTemplate.licenseList,
      currentLicenseTemplate: state => state.licenseTemplate.currentLicense,
      currOrgTemplate: state => state.orgTemplate.currOrgTemplate,
      departmentTemplates: state =>
        state.orgTemplate.currOrgTemplate.departmentTemplates,
      userInfo: state => state.user.userInfo
    })
  },
  mounted() {
    this.form.org = this.userInfo.org.uuid
    this.form.licenseTemplate = this.currentLicenseTemplate.uuid
  },
  methods: {
    handleConfirm() {
      const payload = this.form

      this.$refs['form'].validate(valid => {
        if (valid) {
          console.log(payload)
          this.$store
            .dispatch('licenseGrade/addGrade', payload)
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
        .dispatch('licenseGrade/getGradeList', this.form.licenseTemplate)
        .then(() => {
        //   this.reload()
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

