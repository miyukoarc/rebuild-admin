<template>
  <el-container>
    <el-aside width="auto" class="p-3 border-sider">
      <!-- <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="small"></el-input> -->
      <m-tree
        :datalist="treeDataList"
        class="mt-2"
        @onNodeClick="onNodeClick"
      />
    </el-aside>
    <el-container class="p-3">
      <el-header height>
        <div class="py-2 employee-headedr-title">
          <h4>{{ userInfo.org.name + "(" + total + "人)" }}</h4>

          <!-- <div>
            <el-button type="text" size="mini">修改名称</el-button>
            <el-button type="text" size="mini" class="ml-1">添加子部门</el-button>
            <el-button type="text" size="mini" class="ml-1">设置上级</el-button>
          </div>-->
        </div>
        <div>
          <!-- <el-button type="primary" size="mini">添加成员</el-button> -->
          <DialogButton
            type="primary"
            size="mini"
            title="添加成员"
            ref="addEmployDialog"
          >
            添加成员
            <template v-slot:dialog>
              <mForm @onSubmitData="onAddEmployee" @onCancel="onCancel" />
            </template>
          </DialogButton>
          <el-button
            type="primary"
            size="mini"
            @click="onClickSetting"
            class="ml-2"
            >设置部门</el-button
          >
           <el-button
            type="primary"
            size="mini"
            @click="onClickRoleSetting"
            class="ml-2"
            >设置角色</el-button
          >
          <el-button
            type="danger"
            v-waves
            size="mini"
            class="ml-2"
            @click="deleteUser"
            >删除</el-button
          >
        </div>
      </el-header>
      <el-main height>
        <mTable
          :columns="columns"
          :page="page"
          border
          :data="employeeList"
          @selection-change="onSelectRow"
          @pageChange="pageChange"
          ref="employTable"
        />
      </el-main>
    </el-container>
    <el-dialog title="设置部门" :visible.sync="visibleDialog" width="400px" :close-on-click-modal="false">
      <setting
       type='depart'
        @onSubmitData="onDepartSetting"
        @onCancel="onCancel"
        :userList="selectList"
        @handleDelete="handleDelete"
      />
    </el-dialog>
    <el-dialog title="设置角色" :visible.sync="visibleDialogRole" width="400px" :close-on-click-modal="false">
      <setting
        @onSubmitData="onRoleSetting"
        @onCancel="onCancel"
        type='role'
        :userList="selectList"
        @handleDelete="handleDelete"
      />
    </el-dialog>
  </el-container>
</template>

<script>
import mTree from "./leftTree";
import mTable from "@/components/CommonTable";
import DialogButton from "@/components/DialogButton";
import mForm from "./addForm";
import setting from "./setting";
import axios from "axios";

import { mapState, mapMutations, mapActions } from "vuex";
const NAME = "employee";
export default {
  components: {
    mTree,
    mTable,
    DialogButton,
    mForm,
    setting
  },
  data() {
    return {
      total: "",
      visibleDialog: false,
      visibleDialogRole:false,
      filterText: "",
      columns: [
        {
          visible: true,
          label: "昵称",
          prop: "nickname",
          uuid: 1,
          align: "center",
          sort: false
        },
        {
          visible: true,
          label: "头像",
          prop: "headimgurl",
          type: "image",
          uuid: 2,
          align: "center",
          sort: false
        },
        {
          visible: true,
          label: "手机号",
          prop: "userinfo.mobile",
          uuid: 7,
          align: "center",
          sort: false
        },
        {
          visible: true,
          label: "部门",
          prop: "department.name",
          uuid: 5,
          align: "center",
          sort: false,
          render: function(row,col,cell){
              return cell+''
          }
        },
        {
          visible: true,
          label: "职务",
          prop: "position",
          uuid: 3,
          align: "center",
          sort: false,
          render: function(row, column, cellValue, index) {
            return cellValue == "MANAGER" ? "主管" : "未指定";
          }
        },
        {
          visible: true,
          label: "角色",
          prop: "role.name",
          uuid: 4,
          align: "center",
          sort: false
        },
        {
          visible: true,
          label: "账号状态",
          prop: "enabled",
          type: "status",
          uuid: 6,
          align: "center",
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
      tableData: [{}],
      selectList: []
    };
  },
  computed: {
    ...mapState(NAME, ["employeeList", "page"]),
    ...mapState("department", ["department"]),
    ...mapState("user", ["userInfo"]),
    treeDataList() {
      let list = [
        {
          uuid: this.userInfo.unionId,
          type: "org",
          name: this.userInfo.org.name,
          children: []
        }
      ];
      list[0].children = this.department;
      return this.department;
    }
  },
  mounted() {
    this.initData();
  },
  methods: {
    ...mapActions(NAME, [
      "getEmployeeList",
      "getEmpByDepartId",
      "getUserByPhone",
      "addEmployForUser",
      "deleteUserByUnionId",
      "departSetting",
      'locateUserRole'
    ]),
    ...mapActions("department", ["getDepartment", "getDepartmenList"]),
    ...mapActions('role',['getRoleList']),
    initData() {
      this.getDepartment().catch(err => {
        this.$message({
          message: `出错了哦:${err}`,
          type: "error"
        });
      });
      this.getDepartmenList().catch(err => {
        this.$message({
          message: `出错了哦:${err}`,
          type: "error"
        });
      });
      this.getRoleList().catch(err => {
        this.$message({
          message: `出错了哦:${err}`,
          type: "error"
        });
      });
      this.getEmployeeList()
        .then(res => {
          this.total = res;
        })
        .catch(err => {
          this.$message({
            message: `出错了哦:${err}`,
            type: "error"
          });
        });
    },
    pageChange() {
      this.initData();
    },
    onNodeClick([data, node, tree]) {
      
        this.getEmpByDepartId(data.uuid).catch(err => {
          this.$message({
            message: `出错了哦:${err}`,
            type: "error"
          });
        });
    },
    onSelectRow(selection, row) {
      this.selectList = selection;
    },
    onAddEmployee(form) {
      this.addEmployForUser(form)
        .then(result => {
          this.$message({
            type: "success",
            message: "添加成功"
          });
          this.$refs["addEmployDialog"].show = false;
          this.initData();
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: `添加失败:${err}`
          });
        });
    },
    onClickSetting() {
      if (this.selectList.length > 0) {
        this.visibleDialog = true;
      } else {
        this.$message({
          type: "warning",
          message: `未选择用户！`
        });
      }
    },
    onClickRoleSetting(){
      if (this.selectList.length > 0) {
        this.visibleDialogRole = true;
      } else {
        this.$message({
          type: "warning",
          message: `未选择用户！`
        });
      }
    },
    onRoleSetting([form,list]){
      axios
        .all(
          list.map(e => {
            let nForm = {
              uuid: e.uuid,
              roleId: form.roleId
            };
            return this.locateUserRole(nForm);
          })
        )
        .then(_ => {
          this.visibleDialogRole = false;
          this.initData();
        });
    },
    onDepartSetting([form, list]) {
      axios
        .all(
          list.map(e => {
            let nForm = {
              uuid: e.uuid,
              departmentId: form.departmentId
            };
            return this.departSetting(nForm);
          })
        )
        .then(_ => {
          this.visibleDialog = false;
          this.initData();
        });
    },
    deleteUser() {
      if (this.selectList.length > 0) {
        let list = this.selectList;
        axios
          .all(
            list.map(e => {
              let nForm = {
                unionId: e.unionId
              };
              return this.deleteUserByUnionId(nForm);
            })
          )
          .then(_ => {
            //  this.visibleDialog = false;
            this.initData();
          })
          .catch(err => {
            this.$message({
              type: "error",
              message: `出错了:${err}`
            });
          });
      } else {
        this.$message({
          type: "error",
          message: `未选择用户！`
        });
      }
    },
    onCancel() {
      this.$refs["addEmployDialog"].show = false;
      this.visibleDialog = false;
      this.visibleDialogRole = false;
    },
    handleDelete([tag,type]) {
      this.$refs["employTable"].$refs["table"].toggleRowSelection(tag);
    }
  }
};
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
