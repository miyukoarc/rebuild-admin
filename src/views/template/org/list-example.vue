<template>
  <el-container class="app-container">
    <el-header height="auto" style="padding:0">
      <!-- <mHeadedr></mHeadedr> -->
      <list-header></list-header>
    </el-header>

    <el-container>
      <cTable
        :columns="columns"
        :data="orgTemplateList"
        :showPagin="true"
        :page="page"
        :showCheckBox="false"
        @sortChange="sortChange"
        @pageChange="pageChange"
        @rowClick="handleRowClick"
        border
      />
    </el-container>

    <right-panel>
      <!-- <div>123123</div> -->
      <user-detail />
    </right-panel>

    <form-dialog ref="formDialog">
    </form-dialog>


  </el-container>
</template>

<script>
// import mHeadedr from "./header";
import RightPanel from '@/components/RightPanel'
import UserDetail from './detail.vue'
import ListHeader from './header.vue'
import cTable from '@/components/CommonTable'
import FormDialog from './dialog'
import { mapState, mapMutations, mapActions } from 'vuex'
const NAME = 'management'
import isEmpty from '@/utils/normal'
import Page from '@/utils/PageDefault'
export default {
  components: {
    cTable,
    ListHeader,
    RightPanel,
    UserDetail,
    FormDialog
    // mHeadedr
  },
  data() {
    return {
      columns: [
        {
          visible: true,
          label: '名称',
          prop: 'name',
          align: 'center',
          render: (row, column, cell) => {
            return <div>{row.name}</div>
          }
        },
        {
          visible: true,
          label: 'Code',
          prop: 'code',
          align: 'center',
          render: (row, column, cell) => {
            return <div>{row.code}</div>
          }
        },
        {
            visible: true,
            label: '部门模板',
            prop: 'departmentTemplates',
            align: 'center',
            render: (row, column, cell) => {

                const list = row.departmentTemplates
                if(list.length){
                    return <div>{
                    row.departmentTemplates.map(item=>{
                        return (
                            <div>
                            <span key={item.uuid}>{item.name}</span>
                            </div>
                            
                        )
                    })
                }</div>
                }else {
                    return <span>无</span>
                }
                
            }
        },{
            visible: true,
            label: '角色模板',
            prop: 'roleTemplates',
            align: 'center',
            render: (row, column, cell) => {

                const list = row.roleTemplates
                if(list.length){
                    return <div>{
                    row.roleTemplates.map(item=>{
                        return (
                            <div>
                            <span key={item.uuid}>{item.name}</span>
                            </div>
                            
                        )
                    })
                }</div>
                }else {
                    return <span>无</span>
                }
                
            }
        },{
            visible: true,
            label: '菜单模板',
            prop: 'menuTemplates',
            align: 'center',
            render: (row, column, cell) => {
                const list = row.menuTemplates
                if(list.length){
                    return <div>{
                    row.menuTemplates.map(item=>{
                        return (
                            <div>
                            <span key={item.uuid}>{item.name}</span>
                            </div>
                            
                        )
                    })
                }</div>
                }else {
                    return <span>无</span>
                }
                
            }
        },
        {
          visible: true,
          label: '创建时间',
          prop: 'createdAt',
          align: 'center'
        },
        {
            visible: true,
            label: '操作',
            align: 'center',
            render: (row,column, cell) =>{

                return  <div>
                            <el-button type='primary' size='mini' onClick={(e)=>this.handleEdit(row,e)}>编辑</el-button>
                            <el-button type='danger' size='mini' onClick={(e)=>this.handleClick(row,e)}>删除</el-button>
                        </div>
                 
            }
        }
      ],
      options: [
        {
          value: ''
        }
      ],
    }
  },
  watch: {
      
  },
  computed: {
    // ...mapState(NAME, ["roleList", "rolePage", "columns"]),
    ...mapState({
      page: state => state.orgTemplate.page,
      orgTemplateList: state => state.orgTemplate.orgTemplateList,
      currOrgTemplate: state => state.orgTemplate.currOrgTemplate
      // columns: state => state.userManage.columns
    }),
    routesData() {
      return this.routes
    }
  },
  created() {
      console.log('1')
    this.initDataList()
  },
  mounted() {
    this.$bus.$on('showFormDialog',target=>{
        this.$refs['formDialog'].event = 'CreateTemplate'
        this.$refs['formDialog'].eventType = 'create'
        this.$refs['formDialog'].dialogVisible = true
    })
  },
  beforeDestroy(){
      this.$bus.$off('showFormDialog')
  },
  methods: {
      handleClick (val,e){
          
          e.stopPropagation()
          console.log(val)
          this.handleDelete(val.uuid)
          alert('点击')
      },
    isEmpty(obj) {
      return isEmpty(obj)
    },

    handleRowClick(value) {
        
        
    },
    sortChange(val) {
      this.initDataList()
    },
    pageChange() {
      this.initDataList()
    },
    handleDelete(str) {
        const payload = {uuid: str}
        this.$store.dispatch('orgTemplate/delOrgTemplate',payload).then(()=>{
            this.$message({
                type: 'success',
                message: '操作成功'
            })
            this.initDataList()
        })
        .catch(err => {
            this.$message({
                type: 'error',
                message: err
            })
        })
    },
    handleEdit(value){
        this.$store.commit('orgTemplate/SAVE_DETAIL',value)
        this.$refs['formDialog'].event = 'EditTemplate'
        this.$refs['formDialog'].eventType = 'edit'
        this.$refs['formDialog'].dialogVisible = true
    },
    initDataList() {
      this.$store
        .dispatch('orgTemplate/orgTemplateQueryList')
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

<style lang="scss">
.app-container {
  border-top: 1px solid #e9e9e9;
  background: white;
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
header .el-header button {
  margin-right: 5px;
}
</style>
