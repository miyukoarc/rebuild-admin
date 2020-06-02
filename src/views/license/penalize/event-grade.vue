<template>
  <el-form :model="form" ref="form" :rules="rules" label-width="100px">
    <el-form-item label="名称">
      <el-input v-model="form.name"></el-input>
    </el-form-item>

    <el-form-item label="证照类型">
      <el-select v-model="form.licenseType" placeholder="请选择">
        <el-option v-for="item in licenseTypes" :key="item" :label="item" :value="item"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="有效期">
      <el-input v-model="form.duration"></el-input>
      <el-select v-model="form.durationType" placeholder="请选择">
        <el-option v-for="item in durationTypes" :key="item" :label="item" :value="item"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="地区">
      <el-select v-model="form.country" placeholder="请选择">
        <el-option v-for="item in countries" :key="item" :label="item" :value="item"></el-option>
      </el-select>

      <el-select v-model="form.province" placeholder="请选择">
        <el-option v-for="item in provinces" :key="item" :label="item" :value="item"></el-option>
      </el-select>
      
      <el-select v-model="form.city" placeholder="请选择">
        <el-option v-for="item in cities" :key="item" :label="item" :value="item"></el-option>
      </el-select>
      
    </el-form-item>

    <el-form-item label="考试合格">
      <el-input v-model="form.examScore"></el-input>
    </el-form-item>

    <el-form-item label="初始积分">
      <el-input v-model="form.licenseScore"></el-input>
    </el-form-item>

    <el-form-item label="证件号">
      <el-input v-model="form.licenseNum"></el-input>
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
      hasParent: false,
      form: {
        city: '杭州市',
        country: '中华人民共和国',
        duration: 3,
        durationType: 'DAY',
        examScore: 90,
        licenseType: 'USER',
        licenseScore: 36,
        licenseNum: 'ZJHZ',
        name: '测试证照',
        province: '浙江省',
        org: 1,
        uuid: 0,
      },
      countries: ['中华人民共和国'],
      cities: ['杭州市'],
      provinces: ['浙江省'],
      durationTypes: ['DAY', 'MONTH', 'YEAR'],
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
    currDepartmentTemplate: {
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
      currOrgTemplate: state => state.orgTemplate.currOrgTemplate,
      currentLicense: state => state.licenseTemplate.currentLicense
    })
  },
  updated() {
    //   console.log('updated')
    //   this.initData()
  },
  mounted() {
     

  },
  methods: {
    initData() {
      //   const parent = this.currDepartmentTemplate.parent
      //   this.form.code = this.currDepartmentTemplate.code
      //   this.form.name = this.currDepartmentTemplate.name
      //   this.form.uuid = this.currDepartmentTemplate.uuid
      //   // this.form.parent = this.currDepartmentTemplate
      //   if (Object.keys(parent).length) {
      //     this.hasParent = true
      //     this.$set(this.form, 'parent', parent.uuid)
      //     //   this.form.parent = parent.uuid
      //   }
      //   this.form.org = this.currOrgTemplate.uuid

       console.log('123')
    for (let key in this.currentLicense) {
      console.log(key)
      for(let target in this.form){
          if(key===target){
              this.form[target] = this.currentLicense[target]
          }
      }
    }

    this.form['licenseNum'] = this.currentLicense['licenseNum'].slice(0,4)
    this.form['uuid'] = this.currentLicense['uuid']
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