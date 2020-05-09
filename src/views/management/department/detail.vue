<script>
import { mapState, mapGetters } from 'vuex'
import RelationCard from './relation'
import { isEmpty } from '@/utils/normal'
export default {
  components: {
    RelationCard
  },
  data() {
    return {
      updateForm: {
        name: '',
        code: '',
        org: '',
        parent: '',
        uuid: ''
      },
      setManagerForm: {
        managerId: '',
        departmentId: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    currentDetail: {
      handler(newVal, oldVal) {
        this.initData()
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    ...mapState({
      org: state => state.user.userInfo.org,
      currentParent: state => state.department.currentParent,
      employeeList: state => state.employee.employeeList,
      allDepartments: state => state.department.allDepartments,
      currentDetail: state => state.department.currentDetail
    }),
    ...mapGetters(['showRightPanel'])
  },
  mounted() {
    this.initData()
  },
  beforeUpdate() {},
  updated() {},
  methods: {
    isEmpty(obj) {
      return isEmpty(obj)
    },
    handleClose() {
      this.$store.commit('component/TOGGLE_PANEL', false)
    },
    handleConfirm() {},
    handleDel() {
      this.$confirm('是否删除当前部门', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$store
            .dispatch('department/deleteDepartment', {
              uuid: this.currentDetail.uuid
            })
            .then(_ => {
              this.$store.dispatch('department/getDepartment')

              this.$router.replace(this.$route.path)
              this.$message({
                type: 'success',
                message: '删除成功'
              })
            })
            .catch(err => {
              this.$message({
                type: 'error',
                message: err.error
              })
            })
        })
        .catch(err => {
          console.log(err)
        })
    },
    initData() {
      const currentManager = this.currentDetail.manager
      this.setManagerForm.departmentId = this.currentDetail.uuid
      this.updateForm.org = this.org.uuid
      this.updateForm.uuid = this.currentDetail.uuid
      this.updateForm.name = this.currentDetail.name
      this.updateForm.code = this.currentDetail.code
      if (this.currentParent.uuid) {
        this.updateForm.parent = this.currentParent.uuid
      }
      if (!this.isEmpty(currentManager)) {
        this.setManagerForm.managerId = currentManager.uuid
      }
    }
  },
  render() {
    const { name, code, users, manager } = this.currentDetail
    const { isEmpty, handleClose, currentParent } = this
    return (
      <div>
        <h4>部门</h4>
        <br />
        <el-form label-width="100px" label-position="left">
          <el-form-item label="名称">
            <div>{name}</div>
          </el-form-item>

          <el-form-item label="Code">
            <div>{code}</div>
          </el-form-item>

          <el-form-item label="上级">
            {isEmpty(currentParent) ? '未指定' : currentParent.name}
          </el-form-item>
          <el-form-item label="主管">
            {isEmpty(manager) ? (
              '未指定'
            ) : (
              <div>
                <img
                  class="mr-2"
                  width="36"
                  height="36"
                  src={manager?.headimgurl}
                />
                <span>{manager?.nickname}</span>
              </div>
            )}
          </el-form-item>

          <el-form-item label="组织关系">
            <relation-card></relation-card>
          </el-form-item>

          <el-form-item label="员工">
            {isEmpty(users) ? (
              <div>未指定</div>
            ) : (
              <div>
                {users.map(user => {
                  return (
                    <div key={user.uuid}>
                      <img
                        class="mr-2"
                        width="36"
                        height="36"
                        src={user.headimgurl}
                      />
                      <span>{user.nickname}</span>
                    </div>
                  )
                })}
              </div>
            )}
          </el-form-item>
          {/*
            <el-form-item>
            <el-button size="small" type="success" onClick={handleClose}>
              返回
            </el-button>
          </el-form-item>
          */}
        </el-form>
      </div>
    )
  }
}
</script>

<style>
</style>