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
import Mixin from '../mixins/index'
export default {
  components: {
    mHeader,
    cTable
  },
  mixins: [Mixin],
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
               {/*
                 <el-button
                  type="danger"
                  size="mini"
                  onClick={e => this.handleDelRole(row.uuid)}
                >
                  删除
                </el-button>
               */}
              </div>
            );
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
    this.initDataList();
  },
  mounted() {},
  methods: {
    ...mapActions(NAME, ['getRoleTemplateList', 'delRoleTemplate']),
    handleEdit(uuid) {
      console.log(uuid)
    },
    initDataList() {
      this.getRoleTemplateList(this.orgCode).catch(err => {
        this.$message({
          type: 'error',
          message: err.message
        })
      })
    },
    // handleDelRole(uuid) {
    //   this.delRoleTemplate({ uuid: uuid })
    //     .then(result => {
    //       this.$message({
    //         type: 'success',
    //         message: '删除成功！'
    //       })
    //     })
    //     .catch(err => {
    //       this.$message({
    //         type: 'error',
    //         message: err.message
    //       })
    //     })
    // }
  }
}
</script>

<style>
</style> 