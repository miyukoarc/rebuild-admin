<template>
  <div style="padding:30px;" class="px-3">
    <h3 style="margin: 0 0 20px 0">
      <span style="font-weight:normal">部门管理</span>
    </h3>

    <tips :msg="tipsMsg" />

    <!-- <component v-bind:is="AddDepartment" ref="addDialog"></component> -->

    <add-department ref="addDialog" />

    <!-- <br> -->
    <!-- <hr> -->

    <div style="margin:20px 0 20px 0;">
      <el-button type="success" @click.native="showAddDialog" plain size="mini">
        <i class="el-icon-circle-plus-outline"></i>
        创建部门
      </el-button>

      <el-button type="info" size="mini" @click.native="handleRefresh" plain>
        <i class="el-icon-refresh"></i>
        刷新数据
      </el-button>
    </div>

    <el-tree
      :data="department"
      :props="{
        label: 'name',
      }"
      @node-drag-start="handleDragStart"
      @node-drag-end="handleDragEnd"
      @node-drag-leave="handleDragLeave"
      @node-drag-over="handleDragOver"
      draggable
      node-key="uuid"
      default-expand-all
      :expand-on-click-node="false"
    >
      <span class="custom-tree-node" slot-scope="{node, data}">
        <span>
          <span>
            <i class="el-icon-connection"></i>
            {{data.name}}
          </span>
          <span>
            <el-button type="text" size="mini" @click="()=>handleEdit(node,data)">编辑</el-button>
            <el-button type="text" size="mini" @click="()=>handleDetail(node,data)">详情</el-button>
          </span>
        </span>
      </span>
    </el-tree>

    <right-panel>
      <div>
        <!-- <change-form></change-form> -->
        <component :is="panelModel" />
        <!-- <relation-card></relation-card> -->
      </div>
    </right-panel>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import Tips from '@/components/Tips'
import RightPanel from '@/components/RightPanel'
import AddDepartment from './add.vue'
// import RelationCard from  './card'
import ChangeForm from './form.vue'
import DepartmentDetail from './detail.vue'
import { isEmpty } from '@/utils/normal'
export default {
  components: {
    Tips,
    RightPanel,
    ChangeForm,
    AddDepartment,
    DepartmentDetail
    // RelationCard
  },
  data() {
    return {
      panelModel: 'ChangeForm', //detail/edit
      tipsMsg: '请注意请注意',
      showDialog: false,
      // showEdit: false,

      changeFormData: {
        name: '',
        code: '',
        uuid: '',
        parent: '',
        org: ''
      }, //updata
      departmentUser: [],
      allNode: 0
    }
  },
  watch: {
    panelModel: {
      handler(newVal, oldVal) {
        console.log(newVal, oldVal)
      },
      immediate: true
    },
    $route: {
      handler(newVal, oldVal) {
        if (newVal.query.edit) {
          this.showEdit(newVal.query.edit)
        }
      },
      immediate: true
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
    const getDepartmentTree = this.$store.dispatch('department/getDepartment')
    const getgetEmployeeList = this.$store.dispatch('employee/getEmployeeList')
    const getDepartmentList = this.$store.dispatch(
      'department/getAllDepartments'
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
    showAddDialog() {
      // console.log(this.$refs.addDialog.showDialog)
      this.$refs.addDialog.showDialog = true
    },
    getChild() {
      alert('!')
    },
    getOrgUuid() {
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
    showEdit(id) {
      this.$store
        .dispatch('department/getDepartmentDetail', id)
        .then(_ => {
          this.$store.commit('component/TOGGLE_PANEL', true)
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: err
          })
        })
    },
    handleDetail(node, data) {},
    handleEdit(node, data) {
      // console.log(node, data)
      this.panelModel = 'DepartmentDetail'
      const nextUrl = `${this.$route.path}?edit=${data.uuid}`

      if (nextUrl == this.$route.fullPath) {
        console.log(nextUrl)

        this.$store
          .dispatch('department/getDepartmentDetail', data.uuid)
          .then(_ => {
            this.$store.commit('component/TOGGLE_PANEL', true)
            this.$route.query.detail = data.uuid
          })
      }

      this.$router.push({ path: nextUrl })
    },
    handleDetail(node, data) {
      // console.log(node, data)
      this.panelModel = 'ChangeForm'
      const nextUrl = `${this.$route.path}?detail=${data.uuid}`

      if (nextUrl == this.$route.fullPath) {
        console.log(nextUrl)

        this.$store
          .dispatch('department/getDepartmentDetail', data.uuid)
          .then(_ => {
            this.$store.commit('component/TOGGLE_PANEL', true)
            this.$route.query.detail = data.uuid
          })
      }

      this.$router.push({ path: nextUrl })
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