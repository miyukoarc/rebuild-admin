<script>
import { mapState, mapGetters } from 'vuex'
import { EventDialog} from './dialog'
import { isEmpty } from '@/utils/normal'
export default {
  components: {
    EventDialog
  },
  data() {
    return {
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
      eventsMap: state => state.stateSettings.eventsMap,
      userDetail: state => state.userManage.userDetail
    }),
    ...mapGetters(['showRightPanel'])
  },
  mounted() {
  },
  beforeUpdate() {},
  updated() {},
  methods: {
    initHandleEvents(){

    },
    isEmpty(obj) {
      return isEmpty(obj)
    },
    handleClose() {
      this.$store.commit('component/TOGGLE_PANEL', false)
    },
    handleEvents(type){
      console.log(this.$ref,type)
      
      // switch(type){
      //   case 'disable':
      //     this.handleDisable()
      //     break;
      //   case 'kick':
      //     this.handleKick()
      //     break;
      //   case 'enable':
      //     this.handleEnable()
      //     break;
      //   default:
      //     this.$message({
      //       type: 'error',
      //       event: '没有事件处理'
      //     })
      //     return false;
      // }
    },
    handleConfirm() {},
    initData() {
    }
  },
  render() {
    // const { name, code, users, manager } = this.currentDetail
    const {nickname,events,state,enabled,headimgurl,country,province,city,gender,role,org,department} = this.userDetail
    const {handleClose,handleEvents} = this
    const {mobile}  = this.userDetail&&this.userDetail.userinfo



    const sex = (gender)=>{
      if(gender=='Gender_Type_Unknown'||!gender){
        return (
        <span>未知</span>
      )
      }
      if(gender=='Gender_Type_Female'){
        return (
        <span>女</span>
      )
      }
      if(gender=='Gender_Type_Male'){
        return (
        <span>男</span>
      )
      }
      
    }

    return (
      <div>
        <h4>详情</h4>
        <br />
        <el-form label-width="100px" label-position="left">
          <el-form-item>
            <div>
                <img width="128" height="128" src={headimgurl}/>
            </div>
          </el-form-item>
          <el-form-item label="昵称">
            <div>{nickname}</div>
          </el-form-item>
          <el-form-item label="性别">
            <div>{
              sex(gender)
            }</div>
          </el-form-item>
          <el-form-item label="状态">
            <div>{state.name?<el-tag type="primary" size="mini">{state.name}</el-tag>:'未指定'}</div>
          </el-form-item>

          <el-form-item label="角色">
            <div>
            {
              role.name
            }</div>
          </el-form-item>
          <el-form-item label="公司">
          {
            org.name
          }</el-form-item>
          <el-form-item label="部门">
          {
            department.name
          }</el-form-item>
          

          <el-form-item label="可用">
            <div>
                {
                    enabled?<el-tag type="success">可用</el-tag>:<el-tag type="danger">不可用</el-tag>
                }
            </div>
          </el-form-item>
          <el-form-item label="手机">
            <div>
            {
              mobile
            }
            </div>
          </el-form-item>
          <el-form-item label="国家/地区">
            {
              country||province||city?"未设置":country+province+city
            }
          </el-form-item>

          <el-form-item label="操作">
            {
                events.map(item=> {
                  return <el-button key={item} onClick={()=>handleEvents(item)}>{item}</el-button>
                })
            }
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="success" onClick={handleClose}>
              返回
            </el-button>
          </el-form-item>
        </el-form>
        
        <event-dialog ref="eventDialog"></event-dialog>
        
      </div>
    )
  }
}
</script>

<style>
</style>