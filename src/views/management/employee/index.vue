<template>
  <el-container>
    <el-aside width="200px" class="p-3 border-sider">
      <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="small"></el-input>
      <m-tree :datalist="treeDataList" class="mt-2" @onNodeClick="onNodeClick" />
    </el-aside>
    <el-container class="p-3">
      <el-header height>
        <div class="py-2 employee-headedr-title">
          <h4>浙江天邮科技有限公司（50人）</h4>
          <!-- <div>
            <el-button type="text" size="mini">修改名称</el-button>
            <el-button type="text" size="mini" class="ml-1">添加子部门</el-button>
            <el-button type="text" size="mini" class="ml-1">设置上级</el-button>
          </div>-->
        </div>
        <div>
          <!-- <el-button type="primary" size="mini">添加成员</el-button> -->
          <DialogButton type="primary" size="mini" title="添加成员" width="400px">
            添加成员
            <template v-slot:dialog>
              <mForm />
            </template>
          </DialogButton>
          <el-button type="primary" size="mini" class="ml-2">设置部门</el-button>
          <el-button type="danger" v-waves size="mini" class="ml-2">删除</el-button>
        </div>
      </el-header>
      <el-main height>
        <mTable :columns="columns" :showPagin="false" border :data="employeeList" @selection-change="onSelectRow"/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import mTree from './tree'
import mTable from '@/components/CommonTable'
import DialogButton from '@/components/DialogButton';
import mForm from './form';

import { mapState, mapMutations, mapActions } from 'vuex'
const NAME = 'employee'
export default {
  components: {
    mTree,
    mTable,
    DialogButton,
    mForm,
  },
  data() {
    return {
      filterText: '',
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
          label: '手机号',
          prop: 'userinfo.mobile',
          uuid: 7,
          align: 'center',
          sort: false
        },
        {
          visible: true,
          label: '部门',
          prop: 'department.name',
          uuid: 5,
          align: 'center',
          sort: false
        },
        {
          visible: true,
          label: '职务',
          prop: 'position',
          uuid: 3,
          align: 'center',
          sort: false,
          formatter:function(row, column, cellValue, index){
            return cellValue=="MANAGER"?"主管":"";
          }
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
          label: '账号状态',
          prop: 'enabled',
          type: 'status',
          uuid: 6,
          align: 'center',
          sort: false
        }
        // {
        //   visible: true,
        //   label: '操作',
        //   prop: 'caozuo',
        //   align: 'center',
        //   sort: false,
        //   type: 'button',
        //   width: '240'
        // }
      ],
      tableData: [{}]
    }
  },
  computed: {
    ...mapState(NAME, ['employeeList', 'page']),
    ...mapState('department', ['department']),
    treeDataList() {
      let list = [
        {
          uuid: 10000,
          type:'org',
          name: '浙江天邮科技',
          children: []
        }
      ]
      list[0].children = this.department
      return list
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    ...mapActions(NAME, ['getEmployeeList', 'getEmpByDepartId']),
    ...mapActions('department', ['getDepartment']),
    initData() {
      this.getDepartment().catch(err => {
        this.$message({
          message: `出错了哦:${err}`,
          type: 'error'
        })
      })
      this.getEmployeeList().catch(err => {
        this.$message({
          message: `出错了哦:${err}`,
          type: 'error'
        })
      })
    },
    onNodeClick([data, node, tree]) {
      if(data.hasOwnProperty('type')&&'org' == data.type){
        this.initData();
      }else{
        this.getEmpByDepartId(data.uuid).catch(err => {
        this.$message({
          message: `出错了哦:${err}`,
          type: 'error'
        })
      })
      }
      
    },
    onSelectRow(selection, row){
      console.log(selection,row);
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
