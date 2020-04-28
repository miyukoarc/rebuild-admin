<script>
import { mapState, mapGetters } from 'vuex'

import { isEmpty } from '@/utils/normal'
export default {
  components: {

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
        console.log(newVal)
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
      currentDetail: state => state.department.currentDetail,
      /**
       * 
       */

      userDetail: state => state.userManage.userDetail
    }),
    ...mapGetters(['showRightPanel'])
  },
  mounted() {
    // this.initData()
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
    handleKick() {
      const data = { reason: "你写代码的样子真像蔡徐坤", uuid: this.userDetail.uuid };
      this.$store
        .dispatch("userManage/kickUser", data)
        .then(()=>{
          this.$message({
            type: 'success',
            message: '操作成功'
          })
        })
        .catch(err => {
          console.log(err);
          this.$message({
            type: "error",
            message: "操作失败"
          });
        });
    },
    handleEnable() {
      const data = { reason: "你写代码的样子真像蔡徐坤", uuid: this.userDetail.uuid };
      this.$store
        .dispatch("userManage/enableUser", data)
        .then(()=>{
          this.$message({
            type: 'success',
            message: '操作成功'
          })
        })
        .catch(err => {
          console.log(err);
          this.$message({
            type: "error",
            message: "操作失败"
          });
        });
    },
    handleBan() {
      const data = { reason: "你写代码的样子真像蔡徐坤", uuid: this.userDetail.uuid };
      this.$store
        .dispatch("userManage/disableUser", data)
        .then(()=>{
          this.$message({
            type: 'success',
            message: '操作成功'
          })
        })
        .catch(err => {
          console.log(err);
          this.$message({
            type: "error",
            message: "操作失败"
          });
        });
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
    }
  },
  render() {
    // const { name, code, users, manager } = this.currentDetail
    const {nickname,events,state,enabled} = this.userDetail
    const {handleClose,handleKick,handleBan} = this
    console.log(events)
    return (
      <div>
        <h4>详情</h4>
        <br />
        <el-form label-width="100px" label-position="left">
          <el-form-item>
            <div>
                <img />
            </div>
          </el-form-item>
          <el-form-item label="名称">
            <div>{nickname}</div>
          </el-form-item>

          <el-form-item label="状态">
            <div>{state&&state.name}</div>
          </el-form-item>

          <el-form-item label="可用">
            <div>
                {
                    enabled?<el-tag type="success">可用</el-tag>:<el-tag type="danger">不可用</el-tag>
                }
            </div>
          </el-form-item>
          <el-form-item label="">
            
          </el-form-item>
          <el-form-item label="组织关系">

          </el-form-item>

          <el-form-item label="操作">
            {
                []||events.map(item=>{
                    <el-button key={item}>{
                        item
                    }</el-button>
                })
            }
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="success" onClick={handleClose}>
              返回
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    )
  }
}
</script>

<style>
</style>