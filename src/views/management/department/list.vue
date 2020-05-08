<template>
  <div class="p-3 d-flex flex-column">
    <h3 style="margin: 0 0 20px 0">
      <span style="font-weight:normal">部门管理</span>
    </h3>

    <tips :msg="tipsMsg" />

    
    <tableContent class="flex-1"/>
    <!-- <tableTree  class="flex-1"/> -->
    <!-- <right-panel>
      <div>
        <change-form></change-form>
      </div>
    </right-panel> -->

  </div>
</template>

<script>
/* eslint-disable */
import { mapState, mapGetters, mapActions } from 'vuex'
import Tips from '@/components/Tips'
import RightPanel from '@/components/RightPanel'
// import RelationCard from  './card'
import ChangeForm from './form.vue'
import tableContent from './table';
import tableTree from './tableTree';
export default {
  components: {
    Tips,
    RightPanel,
    ChangeForm,
    tableContent,
    tableTree,
    // RelationCard
  },
  data() {
    return {
      tipsMsg: '请注意请注意',
      showDialog: false,
      // showDetail: false,
      formData: {
        name: '',
        code: '',
        org: ''
      }, //create
      changeFormData: {
        name: '',
        code: '',
        uuid: '',
        parent: '',
        org: ''
      }, //updata
      departmentUser: [],
      allNode: 0,
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入Code', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  watch:{
    $route: {
      handler(newVal,oldVal){
        // console.log(newVal)
      },
      immediate: true
    }
  },
  computed: {
    ...mapState({
      org: state => state.user.userInfo.org
    }),
    ...mapGetters(['department'])
  },
  async mounted() {
    //   console.log(this.org)
    // await this.getDepartment()

    const getDepartmentTree = this.$store.dispatch('department/getDepartment')
    const getgetEmployeeList = this.$store.dispatch('employee/getEmployeeList')
    const getDepartmentList = this.$store.dispatch(
      'department/getDepartmenList'
    )
    await Promise.all([
      'getDepartmentTree',
      'getgetEmployeeList',
      'getDepartmentList'
    ])
    this.getOrgUuid()
    this.treeNode(this.department)
  },
  methods: {
    handleChange(){

    },
    
    getOrgUuid() {
      this.formData.org = this.org.uuid
      this.changeFormData.org = this.org.uuid
    },
    handleDragLeave(draggingNode, dropNode, ev) {
      // console.log('tree drag leave: ', dropNode);
    },
    handleDragOver(draggingNode, dropNode, ev) {
      // console.log('tree drag over: ', dropNode);
    },
    handleRefresh() {
      this.$store.dispatch('department/getDepartment')
      // this.getDepartment()
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log('tree drag end: ', dropNode, dropType)
      if (dropType == 'before') {
        this.changeFormData.parent = null
      }
      if (dropType == 'inner') {
        this.changeFormData.parent = dropNode.data.uuid
      }
      // else
      this.$store
        .dispatch('department/updateDepartment', this.changeFormData)
        .then(() => {
          this.$store.dispatch('department/getDepartment')
        })
    },
    handleDragStart(node, ev) {
      // console.log('drag start',node,ev)
      this.changeFormData.name = node.data.name
      this.changeFormData.code = node.data.code
      this.changeFormData.uuid = node.data.uuid
    },
    handleDetail(node, data) {

      
    },
    treeNode(arr) {
      arr.forEach(item => {
        this.allNode++
        if (item.children != undefined) {
          this.treeNode(item.children)
        }
      })
    },
    handleForm() {
      this.$store
        .dispatch('department/createDepartment', this.formData)
        .then(async () => {
          this.$store.dispatch('department/getDepartment')
          this.showDialog = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>