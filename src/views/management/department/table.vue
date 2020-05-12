<template>
  <div style="height:calc(100% - 200px)">
    <el-header height="auto" style="padding:18px 0 0 0;">
      <mHeadedr></mHeadedr>
    </el-header>

    <div style="height: calc(100%);">
      <cTable
        :columns="columns"
        :data="departList"
        :showPagin="true"
        :page="page"
        :showCheckBox="false"
        @sortChange="sortChange"
        @pageChange="pageChange"
        border
        @btnFirst="handleEdit"
        @btnSecond="handleDelete"
        @rowClick="handleRow"
        ref="simpleTable"
      />
    </div>

    <right-panel>
      <div>
        <component :is="'DepartmentDetail'" />
      </div>
    </right-panel>

    <el-dialog  :visible.sync="showDialog" title="编辑" :close-on-click-modal="false">
      <EditForm @closeDialog="closeDialog"></EditForm>
    </el-dialog>
  </div>
</template>

<script>
import mHeadedr from './search-form'
import cTable from '@/components/CommonTable'
import { mapState, mapMutations, mapActions } from 'vuex'
import { getDepartmenList } from '@/api/department'
import EditForm from './form'
import Page from '@/utils/PageDefault'
import RightPanel from '@/components/RightPanel'
import DepartmentDetail from './detail'
const NAME = 'department'
export default {
  components: {
    cTable,
    mHeadedr,
    EditForm,
    RightPanel,
    DepartmentDetail
  },
  data() {
    return {
      showDialog: false,
      options: [
        {
          value: ''
        }
      ],
      columns: [
        {
          visible: true,
          label: '名称',
          prop: 'name',
          uuid: 2,
          align: 'center'
        },
        {
          visible: true,
          label: '主管',
          prop: 'manager',
          uuid: 3,
          align: 'center',
          sort: false,
          render: (row, column, cell) => {
              if(row.manager.nickname){
                  return (<span>{row.manager.nickname}</span>)
              }else{
                  return (<span>未指定</span>)
              }
            
          }
        },
        {
          visible: true,
          label: '上级部门',
          prop: 'parent',
          uuid: 5,
          align: 'center',
          sort: false,
          render: (row, column, cell) => {
            return row.name
          }
        },
        {
          visible: true,
          label: '人数',
          prop: 'users',
          uuid: 6,
          align: 'center',
          sort: false,
          render: (row, column, cell) => {
            return row.users.length||'0'
          }
        },
        {
          visible: true,
          label: '创建时间',
          prop: 'createdAt',
          uuid: 4,
          align: 'center'
        },
        {
          visible: true,
          label: 'Code',
          prop: 'code',
          uuid: 1,
          sort: false,
          align: 'center'
        },
        {
          visible: true,
          label: '操作',
          prop: 'caozuo',
          align: 'center',
          sort: false,
          type: 'button',
          width: '240'
        }
      ]
    }
  },
  computed: {
    ...mapState(NAME, ['departList', 'page']),
    routesData() {
      return this.routes
    }
  },
  created() {
    this.initDataList()
  },
  mounted(){
  },
  methods: {
    ...mapActions(NAME, ['getDepartmenList']),
    handleRow(val) {
      this.$store
        .dispatch('department/getDepartmentDetail', val.uuid)
        .then(_ => {
          this.$store.commit('component/TOGGLE_PANEL', true)
        })
    },
    closeDialog(val) {
      this.showDialog = false
    },
    handleEdit(val) {
      this.$store
        .dispatch('department/getDepartmentDetail', val.uuid)
        .then(_ => {
          this.showDialog = true
        })
    },
    handleDelete(val) {
      this.$confirm('是否删除当前部门', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$store
            .dispatch('department/deleteDepartment', {
              uuid: val.uuid
            })
            .then(_ => {
              this.$store.dispatch('department/getDepartmenList')

              this.$message({
                type: 'success',
                message: '删除成功'
              })
            })
            .catch(err => {
              this.$message({
                type: 'error',
                message: err
              })
            })
        })
        .catch(err => {
          // console.log(err)
        })
      // console.log(val)
    },
    sortChange(val) {
      this.initDataList()
    },
    pageChange() {
      this.initDataList()
    },
    initDataList() {
      this.getDepartmenList()
        .then(() => {})
        .catch(err => {
          // console.log(err)
          this.$message({
            message: `出错了哦:${err}`,
            type: 'error'
          })
        })
    },

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
