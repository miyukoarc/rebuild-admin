<template>
  <div>
    <!-- <el-dialog :model="formData" title="创建部门" ref="formData" width="30%" :visible.sync="showDialog"> -->
    <el-form
      label-position="left"
      size="mini"
      ref="formData"
      label-width="100px"
      :model="formData"
      :rules="rules"
    >
      <el-form-item label="名称" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>

      <el-form-item label="Code" prop="code">
        <el-input v-model="formData.code"></el-input>
      </el-form-item>

      <!-- <el-form-item label="终端" prop="terminal">
        <el-select v-model="formData.terminal" placeholder="请选择">
          <el-option v-for="item in options" :key="item.val" :label="item.name" :value="item.val"></el-option>
        </el-select>
      </el-form-item> -->

      <el-form-item label="上级">
        <el-checkbox v-model="hasParent">是否为子部门</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-select v-model="formData.parent" placeholder="请选择">
          <el-option
            :disabled="!hasParent"
            v-for="item in allDepartments"
            :key="item.code"
            :label="item.name"
            :value="item.uuid"
          ></el-option>
        </el-select>
      </el-form-item>

      <!-- <el-form-item label="上级">

        <el-select v-model="formData.parent" placeholder="请选择">
          <el-option
            v-for="item in departmentList"
            :key="item.code"
            :label="item.name"
            :value="item.uuid"
          ></el-option>
        </el-select>
      </el-form-item>-->

      <el-form-item label="主管">
        <el-select v-model="addManager.managerId">
          <el-option
            v-for="item in employeeList"
            :key="item.uuid"
            :label="item.nickname"
            :value="item.uuid"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="handleForm('formData')">确定</el-button>
        <el-button type="danger" size="small" @click="closeDialog">取消</el-button>
      </el-form-item>
    </el-form>
    <!-- </el-dialog> -->
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'AddDepartment',
  props: ['onCancle'],
  data() {
    return {
      // showDialog: false,
      hasParent: false,
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入Code', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ]
      },
      formData: {
        name: '',
        code: '',
        org: '',
        parent: '',
        // terminal: 'ORG'
      }, //create
      options: [
        { val: 'ORG', name: '企业' },
        { val: 'USER', name: '用户' }
      ],
      addManager: {
        departmentId: '',
        managerId: ''
      }
    }
  },
  watch: {
    hasParent: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.$set(this.formData, 'parent', this.departmentList[0].uuid)
        }
        if (!newVal) {
          this.$delete(this.formData, 'parent')
        }
      }
    }
  },
  computed: {
    ...mapState({
      org: state => state.user.userInfo.org,
      employeeList: state => state.employee.employeeList,
      allDepartments: state => state.department.allDepartments
    }),
    ...mapGetters(['department'])
  },
  mounted() {
    this.formData.org = this.org.uuid
  },
  beforeUpdate() {},
  methods: {
    closeDialog() {
      this.$emit('close', false)
    },
    handleForm(ref) {
      this.$refs[ref].validate(valid => {
        if (valid) {
          this.$store
            .dispatch('department/createDepartment', this.formData)
            .then(async _ => {
              if (this.addManager.managerId) {
                this.$store
                  .dispatch('department/setDepartmentManager', {
                    ...this.addManager,
                    departmentId: _.uuid
                  })
                  .then(async _ => {
                    const tree = this.$store.dispatch(
                      'department/getDepartmenList'
                    )
                    const list = this.$store.dispatch(
                      'department/getAllDepartments'
                    )

                    Promise.all(['tree', 'list']).then(_ => {
                      this.$message({
                        type: 'success',
                        message: '添加成功'
                      })
                      this.$emit('close', false)
                      Object.assign(this.$data, this.$options.data().formData)
                    })
                  })
              }

              const tree = this.$store.dispatch('department/getDepartmenList')
              const list = this.$store.dispatch('department/getAllDepartments')

              Promise.all(['tree', 'list']).then(_ => {
                this.$message({
                  type: 'success',
                  message: '添加成功'
                })
                this.$emit('close', false)
                Object.assign(this.$data, this.$options.data().formData)
              })
              // this.showDialog = false
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
    }
  }
}
</script>

<style>
</style>