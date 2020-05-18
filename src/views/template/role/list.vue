<template>
  <el-container class="app-container">
    <el-header height>
      <mHeader />
    </el-header>
    <el-main height class="pt-0">
      <cTable :showPagin="false" :columns="columns" border :data="orgList" />
    </el-main>
  </el-container>
</template>

<script>
import mHeader from './header'
import cTable from '@/components/CommonTable'
import { mapState, mapMutations, mapActions } from 'vuex'
const NAME = 'roleTemplate'

export default {
  components: {
    mHeader,
    cTable
  },
  data() {
    return {
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
          label: '平台',
          prop: 'terminal',
          sort: false,
          align: 'center'
        },
        {
          visible: true,
          label: 'code',
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
          prop: 'name',
          sort: false,
          align: 'center',
          render: (row, column, cell) => {
            return (
              <div>
                <el-button
                  type="primary"
                  size="mini"
                  onClick={e => this.handleEdit(row.uuid)}
                >
                  编辑
                </el-button>
                <el-button
                  type="danger"
                  size="mini"
                  onClick={e => this.handleDelRole(row.uuid)}
                >
                  删除
                </el-button>
              </div>
            )
          }
        }
      ]
    }
  },
  computed: {
    ...mapState(NAME, ['orgList']),
    orgCode() {
      return this.$route.params.org
    }
  },
  created() {
    this.getRoleTemplateList(this.orgCode)
  },
  mounted() {
    // console.log(this.orgCode);
  },
  methods: {
    ...mapActions(NAME, ['getRoleTemplateList', 'delRoleTemplate']),
    handleEdit(uuid) {
      console.log(uuid)
    },
    handleDelRole(uuid) {
      this.delRoleTemplate({ org: this.orgCode, uuid: uuid })
        .then(result => {
          this.$message({
            type: 'success',
            message: '删除成功！'
          })
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: '删除失败！'
          })
        })
    }
  }
}
</script>

<style>
</style> 