<template>
  <el-form :model="form" ref="form" :rules="rules" label-width="100px">
    <el-form-item label="证照模板">
      <el-select v-model="form.licenseTemplate" placeholder="请选择">
        <el-option
          v-for="item in licenseList"
          :key="item.uuid"
          :label="item.name"
          :value="item.uuid"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="证照类型">
      <el-select v-model="form.licenseType" placeholder="请选择">
        <el-option v-for="item in licenseTypes" :key="item" :label="item" :value="item"></el-option>
      </el-select>
    </el-form-item>


    <el-form-item label="证照周期">
      <el-input v-model.number="form.replyRegularly"></el-input>
      <el-select v-model="form.replyRegularlyType" placeholder="请选择">
        <el-option v-for="item in replyRegularlyTypes" :key="item" :label="item" :value="item"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="生效日期">
      <el-date-picker
        v-model="form.beginTime"
        type="date"
        placeholder="选择日期"
        value-format="yyyy-MM-dd"
      ></el-date-picker>
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
        beginTime: '',
        licenseTemplate: 1,
        licenseType: 'ORG',
        org: 0,
        replyRegularly: 0,
        replyRegularlyType: 'DAY',
        user: 0
      },

      replyRegularlyTypes: ['DAY', 'MONTH', 'YEAR'],
      licenseTypes: ['ORG', 'USER'],
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
  watch: {
  },
  computed: {
    ...mapState({
      licenseList: state => state.licenseTemplate.licenseList, //licenseTemplate
      currOrgTemplate: state => state.orgTemplate.currOrgTemplate,
      orgId: state => state.user?.userInfo?.org?.uuid,
      userInfo: state => state.user?.userInfo,
    })
  },
  mounted() {
    this.form.org = this.userInfo.org.uuid
    this.form.user = this.userInfo.uuid
  },
  methods: {
    handleConfirm() {
      const payload = this.form

      this.$refs['form'].validate(valid => {
        if (valid) {
          console.log(payload)
          this.$store
            .dispatch('licenseUser/publishLicense', payload)
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
        .dispatch('licenseUser/getLicenseList', this.userInfo.org.uuid)
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