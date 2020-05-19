<template>
  <el-form :model="form" ref="form" :rules="rules" label-width="100px">

    <el-form-item label="名称" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>

    <el-form-item label="Code" prop="code">
      <el-input v-model="form.code"></el-input>
    </el-form-item>

    <el-form-item label="图标" prop="code">
      <el-input v-model="form.iconUrl"></el-input>
    </el-form-item>

    <el-form-item label="地址" prop="url">
      <el-input v-model="form.url"></el-input>
    </el-form-item>


    <el-form-item label="角色" prop="roles">
        <el-select
            v-model="form.roles"
            multiple
            collapse-tags
            placeholder="请选择">
            <el-option
            v-for="item in roleTemplates"
            :key="item.uuid"
            :label="item.name"
            :value="item.uuid">
            </el-option>
        </el-select>
    </el-form-item>



    <el-form-item label="上级">
        <el-checkbox v-model="hasParent">是否为子菜单</el-checkbox>
    </el-form-item>

    <el-form-item>
        <el-select  v-model="form.parent" placeholder="请选择">
            <el-option
                :disabled="!hasParent"
                v-for="item in menuTemplates"
                :key="item.uuid"
                :label="item.name"
                :value="item.uuid"
            ></el-option>
        </el-select>
    </el-form-item>


    <el-form-item label="排序" prop="sort">
        <el-input-number v-model="form.sort" :step="2">
        </el-input-number>
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
        code: '',
        name: '',
        org: 0,
        iconUrl: '',
        url: '',
        // parent: 0,
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
    currMenuTemplate: {
      handler(newVal, oldVal) {
        if (newVal) {
            console.log(newVal)
          this.initData()
        }
      },
      immediate: true
    }
  },
  computed: {
    ...mapState({
    roleTemplates: state => state.orgTemplate.currOrgTemplate.roleTemplates,
    departmentTemplates: state => state.orgTemplate.currOrgTemplate.departmentTemplates,
    menuTemplates: state => state.orgTemplate.currOrgTemplate.menuTemplates,
      currOrgTemplate: state => state.orgTemplate.currOrgTemplate,
      currMenuTemplate: state => state.menuTemplate.currMenuTemplate
    })
  },
  updated() {
    //   console.log('updated')
    //   this.initData()
  },
  methods: {
    initData() {
    const roles = this.currMenuTemplate.roleTemplates
      this.form.code = this.currMenuTemplate.code
      this.form.name = this.currMenuTemplate.name
      this.form.uuid = this.currMenuTemplate.uuid
      this.form.iconUrl = this.currMenuTemplate.iconUrl
      if(this.currMenuTemplate.parent.uuid){
          this.form.parent = this.currMenuTemplate.parent.uuid
          this.hasParent = true
      }
      
      if(roles.length){
          console.log('yes')
          let temp = []
          roles.forEach(item=>{
              
              temp.push(item.uuid)
              
          })
          this.$set(this.form,'roles',temp)
          
      }
      this.form.sort = this.currMenuTemplate.sort
      this.form.url = this.currMenuTemplate.url
      
      // this.form.parent = this.currDepartmentTemplate
      this.form.org = this.currOrgTemplate.uuid
    },
    handleConfirm() {
      const payload = this.form

      this.$refs['form'].validate(valid => {
        if (valid) {
          console.log(payload)
          this.$store
            .dispatch('menuTemplate/updateTemplate', payload)
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
        .dispatch('menuTemplate/templateQueryList', payload)
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