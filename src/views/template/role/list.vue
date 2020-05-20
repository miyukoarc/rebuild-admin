<template>
  <el-container class="app-container">
    <el-header height="auto" style="padding:0">
      <!-- <mHeadedr></mHeadedr> -->
      <list-header></list-header>
    </el-header>

    <el-container>
      <!-- <cTable
        :columns="columns"
        :data="orgTemplateList"
        :showPagin="false"
        :page="page"
        :showCheckBox="false"
        @sortChange="sortChange"
        @pageChange="pageChange"
        @rowClick="handleRowClick"
        border
      />-->
      <el-table
        :data="roleTemplates"
        style="width: 100%"
        row-key="uuid"
        border
        lazy
        stripe
        default-expand-all
        class="fill"
        @row-click="handleDetail"
        :tree-props="{ children: 'children' }"
       >
        <el-table-column prop="name" label="名称" align="center"></el-table-column>
        <el-table-column prop="code" label="Code" align="center"></el-table-column>
        <el-table-column prop="createdAt" label="创建时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="240">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click.stop="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click.stop="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-container>

    <right-panel>
      <!-- <div>123123</div> -->
      <user-detail />
    </right-panel>

    <form-dialog ref="formDialog"></form-dialog>
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
import Mixin from '../mixins/index'

export default {
  components: {
    cTable,
    ListHeader,
    RightPanel,
    UserDetail,
    FormDialog
    // mHeadedr
  },
  mixins: [Mixin],
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
            if (list.length) {
              return (
                <div>
                  {row.departmentTemplates.map(item => {
                    return (
                      <div>
                        <span key={item.uuid}>{item.name}</span>
                      </div>
                    )
                  })}
                </div>
              )
            } else {
              return <span>无</span>
            }
          }
        },
        {
          visible: true,
          label: '角色模板',
          prop: 'roleTemplates',
          align: 'center',
          render: (row, column, cell) => {
            const list = row.roleTemplates
            if (list.length) {
              return (
                <div>
                  {row.roleTemplates.map(item => {
                    return (
                      <div>
                        <span key={item.uuid}>{item.name}</span>
                      </div>
                    )
                  })}
                </div>
              )
            } else {
              return <span>无</span>
            }
          }
        },
        {
          visible: true,
          label: '菜单模板',
          prop: 'menuTemplates',
          align: 'center',
          render: (row, column, cell) => {
            const list = row.menuTemplates
            if (list.length) {
              return (
                <div>
                  {row.menuTemplates.map(item => {
                    return (
                      <div>
                        <span key={item.uuid}>{item.name}</span>
                      </div>
                    )
                  })}
                </div>
              )
            } else {
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
          render: (row, column, cell) => {
            return (
              <el-button
                type="danger"
                size="mini"
                onClick={e => this.handleClick(row, e)}
              >
                删除
              </el-button>
            )
          }
        }
      ],
      options: [
        {
          value: ''
        }
      ]
    }
  },
  watch: {},
  computed: {
    // ...mapState(NAME, ["roleList", "rolePage", "columns"]),
    ...mapState({
      page: state => state.orgTemplate.page,
      orgTemplateList: state => state.orgTemplate.orgTemplateList,
      departmentTemplates: state => state.departmentTemplate.departmentTemplates,
      roleTemplates: state => state.roleTemplate.roleTemplates
      // columns: state => state.userManage.columns
    }),
    routesData() {
      return this.routes
    }
  },
  created() {
    this.initDataList()
  },
  mounted() {
    // console.log(this.$route.params)
    this.$bus.$on('showFormDialog', target => {
      this.$refs['formDialog'].event = 'CreateTemplate'
      this.$refs['formDialog'].eventType = 'create'
      this.$refs['formDialog'].dialogVisible = true
      // console.log(this.$refs['formDialog'])
      // console.log(target)
    })
    // console.warn(this.userList)
  },
  beforeDestroy() {
    this.$bus.$off('showFormDialog')
  },
  methods: {
    handleClick(val, e) {
      e.stopPropagation()
      this.handleDelete(val.uuid)
      alert('点击')
    },
    isEmpty(obj) {
      return isEmpty(obj)
    },

    handleRowClick(value) {
      this.$store.commit('orgTemplate/SAVE_DETAIL', value)
      this.$refs['formDialog'].event = 'EditTemplate'
      this.$refs['formDialog'].eventType = 'edit'
      this.$refs['formDialog'].dialogVisible = true
    },
    sortChange(val) {
      this.initDataList()
    },
    pageChange() {
      this.initDataList()
    },
    initDataList() {
      this.$store
        .dispatch(
          'roleTemplate/templateQueryByCode',
          this.$route.params.org
        )
        .catch(err => {
          this.$message({
            type: 'error',
            message: err
          })
        })

      // this.$store
      // .dispatch('orgTemplate/orgTemplateQueryList', this.currOrgTemplate.uuid)
      // .then(() => {})
      // .catch(err => {
      //   console.log(err)
      // })
    },
    handleEdit(val) {
      this.$store.commit('roleTemplate/SAVE_DETAIL', val)
      this.$refs['formDialog'].event = 'EditTemplate'
      this.$refs['formDialog'].eventType = 'edit'
      this.$refs['formDialog'].dialogVisible = true
    },
    handleDelete(val) {
      console.log(val)
      const payload = { uuid: val.uuid }
      this.$confirm('是否删除当前角色', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$store
            .dispatch('roleTemplate/delTemplate', payload)
            .then(() => {
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
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleDetail() {}
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

