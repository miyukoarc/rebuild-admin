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
        v-loading="loading"
        :data="licenseList"
        style="width: 100%"
        row-key="uuid"
        border
        @row-click="handleDetail"
      >
        <el-table-column label="序号" width="55" type="index" align="center"></el-table-column>
        <el-table-column prop="name" label="名称" align="center"></el-table-column>
        <!-- <el-table-column label="规则" align="center"></el-table-column>
        <el-table-column label="处罚措施" align="center"></el-table-column>
        <el-table-column label="等级" align="center"></el-table-column>-->
        <el-table-column prop="licenseType" label="证照类型" align="center"></el-table-column>
        <el-table-column prop="licenseNum" label="证号格式" align="center"></el-table-column>
        <el-table-column label="有效期" align="center">
          <template v-slot="scope">
            <div>
              <span>{{scope.row.duration}}</span>
              <span>{{scope.row.durationType}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="地区" align="center">
          <template v-slot="scope">
            <div>
              <span>{{scope.row.country}}</span>
              <span>{{scope.row.province}}</span>
              <span>{{scope.row.city}}</span>
            </div>
          </template>
        </el-table-column>
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
      departmentTemplates: state =>
        state.departmentTemplate.departmentTemplates,
      loading: state => state.licenseTemplate.loading,
      orgId: state => state.user?.userInfo?.org?.uuid,
      licenseList: state => state.licenseTemplate?.licenseList
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
        .dispatch('licenseTemplate/getLicenseList', this.orgId)
        .then(() => {})
        .catch(err => {
          console.log(err)
          //   this.$message({
          //     type: 'error',
          //     message: err
          //   })
        })

      // this.$store
      // .dispatch('orgTemplate/orgTemplateQueryList', this.currOrgTemplate.uuid)
      // .then(() => {})
      // .catch(err => {
      //   console.log(err)
      // })
    },
    handleEdit(val) {
      this.$store.commit('licenseTemplate/SAVE_DETAIL', val)
      this.$refs['formDialog'].event = 'EditTemplate'
      this.$refs['formDialog'].eventType = 'edit'
      this.$refs['formDialog'].dialogVisible = true
    },
    handleDelete(val) {
      console.log(val)
      const payload = val.uuid
      this.$confirm('是否删除当前模板', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$store
            .dispatch('licenseTemplate/deleteLicense', payload)
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
                message: err.message
              })
            })
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleDetail(val) {
      console.log(val)
      this.$store
        .dispatch('licenseTemplate/getLicenseByOne', val.uuid)
        .then(() => {
          this.$store.commit('component/TOGGLE_PANEL', true)
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: err
          })
        })

      this.$store
        .dispatch('licensePenalize/getPenalizeList', val.uuid)
        .then(() => {})
        .catch(err => {
          console.log(err)
        })

      this.$store
        .dispatch('licenseGrade/getGradeList', val.uuid)
        .then(() => {})
        .catch(err => {
          console.log(err)
        })

      this.$store
        .dispatch('licenseReason/getReasonList', val.uuid)
        .then(() => {})
        .catch(err => {
          console.log(err)
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
