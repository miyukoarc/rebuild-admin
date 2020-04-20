<template>
  <div style="padding:30px;">
    <h3 style="margin: 0 0 20px 0">
      <span style="font-weight:normal">部门管理</span>
    </h3>

    <tips :msg="tipsMsg" />

    <!-- <br> -->
    <!-- <hr> -->

    <div style="margin:20px 0 20px 0;">
      <el-button type="success" @click.native="showDialog = !showDialog" plain size="mini">
        <i class="el-icon-circle-plus-outline"></i>
        创建部门
      </el-button>

      <el-button type="info" size="mini" @click.native="handleRefresh" plain>
        <i class="el-icon-refresh" ></i>
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
           <span>{{data.name}}</span>
           <span>
             <el-button type="text" size="mini" @click="()=>handleDetail(node,data)">查看详情</el-button>
           </span>
      </span>
    </el-tree>

    <el-dialog title="创建部门" width="30%" :visible.sync="showDialog">
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
      </el-form>

      <template slot="footer">
        <el-button type="primary" size="mini" @click="handleForm">确定</el-button>
        <el-button type="danger" size="mini" @click="showDialog = !showDialog">取消</el-button>
      </template>
    </el-dialog>

    <el-drawer
      :visable.sync="showDetail"
      size="50%"
      :append-to-body="true"
    >
      
    </el-drawer>


  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import Tips from '@/components/Tips'
export default {
  components: {
    Tips
  },
  data() {
    return {
      tipsMsg: '请注意请注意',
      showDialog: false,
      showDetail: false,
      formData: {
        name: '',
        code: '',
        org: ''
      },//create
      changeFormData:{
        name: '',
        code: '',
        uuid: '',
        parent: '',
        org: ''
      },//
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
      // department: state => state.humanResource.department
      org: state => state.user.info.org
    }),
    ...mapGetters(['department']),
    // ...mapActions('humanResource',['getDepartment','updateDepartment','getDepartmentUser','createDepartment'])
  },
  async mounted() {
    // await this.getDepartment()
    await this.$store.dispatch('humanResource/getDepartment')
    this.getOrgUuid()
    this.treeNode(this.department)
    console.log(this.department)
  },
  methods: {
    getOrgUuid(){
      this.formData.org = this.org.uuid
      this.changeFormData.org = this.org.uuid
    },
    handleDragLeave(draggingNode, dropNode, ev) {
        console.log('tree drag leave: ', dropNode);
    },
    handleDragOver(draggingNode, dropNode, ev) {
      console.log('tree drag over: ', dropNode);
    },
    handleRefresh(){
      this.$store.dispatch('humanResource/getDepartment')
      // this.getDepartment()
    },
     handleDragEnd(draggingNode, dropNode, dropType, ev) {
        // console.log('tree drag end: ', dropNode, dropType);
        if(dropType=='before'){
          this.changeFormData.parent = null
        }else this.changeFormData.parent = dropNode.data.uuid
        this.$store.dispatch('humanResource/updateDepartment',this.changeFormData).then(()=>{
          this.$store.dispatch('humanResource/getDepartment')
        })

        // this.updateDepartment(this.changeFormData).then(()=>{
        //   this.getDepartment()
        // })
    },
    handleDragStart(node,ev){
      // console.log('drag start',node,ev)
      this.changeFormData.name = node.data.name
      this.changeFormData.code = node.data.code
      this.changeFormData.uuid = node.data.uuid
    },
    async handleDetail(node,data){
      console.log(node,data)
      // this.getDepartmentUser()
      await this.$store.dispatch('humanResource/getDepartmentUser',node.data.uuid)
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
      this.$store.dispatch('humanResource/createDepartment',this.formData).then(async()=>{
        this.$store.dispatch('humanResource/getDepartment')
        this.showDialog = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-tree-node{
   flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>