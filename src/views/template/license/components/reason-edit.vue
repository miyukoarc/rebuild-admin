<template>
  <el-form :model="form" ref="form" :rules="rules" label-width="100px">
    <el-form-item label="名称">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <!-- 
    <el-form-item label="URL">
      <el-input v-model="form.url"></el-input>
    </el-form-item>-->

    <el-form-item label="关联处罚">
      <el-select v-model="form.licenseTemplatePenalize">
        <el-option
          v-for="item in penalizeList"
          :key="item.uuid"
          :label="item.name"
          :value="item.uuid"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="严重程度">
      <el-select v-model="form.reasonClassify">
        <el-option
          v-for="item in reasonClassifies"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="扣除分数">
      <el-input-number size="medium" v-model="form.licenseReasonScore" :min="0"></el-input-number>
    </el-form-item>

    <el-form-item label="是否启用">
      <el-checkbox v-model="form.enable"></el-checkbox>
    </el-form-item>

    <el-form-item label="规则内容">
      <el-input v-model="form.regulationContent"></el-input>
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
        reasonClassify: 'MILD', //['MILD','MODERATE','SEVERE']
        regulationContent: '',
        licenseReasonScore: 0, //扣除分数
        licenseTemplate: 0, //关联证照
        licenseTemplatePenalize: null, //关联处罚
        name: '', //名称
        org: 0, //企业
        enable: false, //是否启用
        uuid: 0
      },
      reasonClassifies: [
        { value: 'MILD', 
        label: '轻度' },
        { value: 'MODERATE', label: '中度' },
        { value: 'SEVERE', label: '重度' }
      ],

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
      departmentTemplates: state =>
        state.orgTemplate.currOrgTemplate.departmentTemplates,
      userInfo: state => state.user.userInfo,
      currentPenalize: state => state.licensePenalize.currentPenalize,
      penalizeList: state => state.licensePenalize.penalizeList,
      currentReason: state => state.licenseReason.currentReason
    })
  },
  watch: {},
  mounted() {
    this.form.org = this.userInfo.org.uuid
    this.form.licenseTemplate = this.currentLicenseTemplate.uuid
    this.form.uuid = this.currentReason.uuid
    this.$bus.$on('transferCurrentReason', target => {
      console.log(target)
      for (let key in this.form) {
        for (let aim in target) {
          if (key === aim) {
            this.form[aim] = target[aim]
          }
        }
      }

      this.form['licenseTemplatePenalize'] = null
        this.form['org'] = target['org'].uuid
    })

     
  },
  beforeDestroy() {
    this.$bus.$off('transferCurrentReason')
  },
  methods: {
    handleConfirm() {
      const payload = this.form

      this.$refs['form'].validate(valid => {
        if (valid) {
          console.log(payload)
          this.$store
            .dispatch('licenseReason/updateReason', payload)
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
        .dispatch('licenseReason/getReasonList', this.form.licenseTemplate)
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

