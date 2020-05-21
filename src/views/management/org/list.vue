<template>
  <el-container class="app-container">
    <el-header height="auto">
      <cHeader />
    </el-header>
    <el-main height class="pt-0">
      <cTable 
      :data="departmentList"
      :page="page"
      :showPagin="true"
      :showCheckBox="false"
      :columns="columns"
      :rowClick="handleRowClick"
       border />
    </el-main>

    <form-dialog ref ="formDialog"></form-dialog>


  </el-container>
</template>

<script>
import cTable from '@/components/CommonTable'
import cHeader from './header' 
import FormDialog from './dialog'
import {mapState} from 'vuex'

export default {
  components: {
    cTable,
    cHeader,
    FormDialog
  },
  data() {
    return {
      form: {
        name: ''
      },
      columns: [
        {
          visible: true,
          label: '名称',
          prop: 'name',
          sort: false,
          align: 'center'
        },
        {
          visible: true,
          label: 'Code',
          prop: 'code',
          sort: false,
          align: 'center'
        },
        {
          visible: true,
          label: '创建时间',
          prop: 'createdAt',
          sort: false,
          align: 'center'
        },
        {
            visible: true,
            label: '操作',
            sort: false,
            align: 'center',
            render: (row,col,cell)=>{
                return <div>
                    <el-button type="primary" size="mini" onClick={(e)=>{this.handleEdit(row,e)}}>编辑</el-button>   
                </div>
            }
        }
      ],
      evnets: {
          test: 'TestOrg',
          create: 'CreateOrg',
          edit: 'EditOrg'
      }
    }
  },
  computed: {
      ...mapState({
          departmentList: state => state.departmentManage.departmentList,
          page: state => state.departmentManage.page
      })
  },
  methods: {
    initData() {
      this.$store
        .dispatch('departmentManage/getDepartmentList')
        .then(() => {})
        .catch(err => {})
    },
    handleRowClick(){

    },
    handleEdit(val){
        console.log(val)
    }
  },
  created() {
    this.initData()
  },
  mounted() {
      this.$bus.$on('showFormDialog',target => {
          
          console.table(target,this.evnets[target.type])
        //   this.$refs['formDialog'].event = target.type
        //   this.$refs['formDialog'].eventType = this.events[target.type]
        //   this.$refs['formDialog'].dialogVisible = target.state
      })
  },
  beforeDestroy(){
      this.$bus.$off('showFormDialog')
  }
}
</script>

<style lang="scss" scoped>
</style>