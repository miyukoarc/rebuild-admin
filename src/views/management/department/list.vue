<template>
  <div style="padding:30px;">
    <h3 style="margin: 0 0 20px 0">
      <span style="font-weight:normal">部门管理</span>
    </h3>

    <tips :msg="tipsMsg" />

    
    <tableContent/>
    
    <right-panel>
      <div>
        <change-form></change-form>
        <!-- <relation-card></relation-card> -->
      </div>
      
    </right-panel>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import Tips from '@/components/Tips'
import RightPanel from '@/components/RightPanel'
// import RelationCard from  './card'
import ChangeForm from './form.vue'
import tableContent from './table';
export default {
  components: {
    Tips,
    RightPanel,
    ChangeForm,
    tableContent,
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
  computed: {
    ...mapState({
      org: state => state.user.info.org
    }),
    ...mapGetters(['department'])
  },
  async mounted() {
    // await this.getDepartment()
    await this.$store.dispatch('department/getDepartment')
    this.getOrgUuid()
    this.treeNode(this.department)
    console.log(this.department)
  },
  methods: {
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
      console.log(node, data)

      this.$store
        .dispatch('department/getDepartmentDetail', data.uuid)
        .then(_ => {
          this.$store.commit('component/TOGGLE_PANEL', true)
        })
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