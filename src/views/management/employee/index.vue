<template>
  <el-container>
    <el-aside width="200px" class="p-3 border-sider">
      <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="small"></el-input>
      <m-tree :datalist="datalist" class="mt-2" />
    </el-aside>
    <el-container class="p-3">
      <el-header height>
        <div class="py-2 employee-headedr-title">
          <h4>浙江天邮科技有限公司（50人）</h4>
          <div>
            <el-button type="text" size="mini">修改名称</el-button>
            <el-button type="text" size="mini" class="ml-1">添加子部门</el-button>
            <el-button type="text" size="mini" class="ml-1">设置上级</el-button>
          </div>
        </div>
        <div>
          <el-button type="primary" size="mini">添加成员</el-button>
          <el-button type="primary" size="mini">设置部门</el-button>
          <el-button type="danger" v-waves size="mini">批量删除</el-button>
        </div>
      </el-header>
      <el-main height>
        <mTable :columns="columns" :showPagin="false" border :data="employeeList" @page='page'/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import mTree from './tree'
import mTable from '@/components/CommonTable'
import { mapState, mapMutations, mapActions } from 'vuex'
const NAME = 'employee'
export default {
  components: {
    mTree,
    mTable
  },
  data() {
    return {
      filterText: '',
      datalist: [
        {
          label: '天邮平台中心',
          id:1,
          children: [
            {
              label: '运营部'
            },
            {
              label: '技术部'
            },
            {
              label: '运维部'
            }
          ]
        }
      ],
      columns: [
        {
          visible: true,
          label: '昵称',
          prop: 'nickname',
          uuid: 1,
          align: 'center',
          sort: false
        },
        {
          visible: true,
          label: '头像',
          prop: 'headimgurl',
          type: 'image',
          uuid: 2,
          align: 'center',
          sort: false
        },
        {
          visible: true,
          label: '职务',
          prop: 'name',
          uuid: 3,
          align: 'center',
          sort: false
        },
        {
          visible: true,
          label: '角色',
          prop: 'role.name',
          uuid: 4,
          align: 'center',
          sort: false
        },
        {
          visible: true,
          label: '部门',
          prop: 'department',
          uuid: 5,
          align: 'center',
          sort: false
        },
        {
          visible: true,
          label: '账号状态',
          prop: 'enabled',
          type: 'switch',
          uuid: 6,
          align: 'center',
          sort: false
        },
        {
          visible: true,
          label: '手机号',
          prop: 'phone',
          uuid: 7,
          align: 'center',
          sort: false
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
      ],
      tableData: [{}]
    }
  },
  computed: {
    ...mapState(NAME, ['employeeList','page'])
  },
  mounted() {
    this.initData()
  },
  methods: {
    ...mapActions(NAME, ['getEmployeeList']),
    initData() {
      this.getEmployeeList()
        .then(res => {
          console.log(this.employeeList)
        })
        .catch(err => {
          this.$message({
            message: `出错了哦${err.response.msg}`,
            type: 'error'
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.employee-headedr-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.border-sider {
  border-right: 1px solid #eee;
}
</style>
