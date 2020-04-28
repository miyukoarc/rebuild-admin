<template>
  <el-container class="app-container">
    <el-header height="auto" style="padding:0">
      <!-- <mHeadedr></mHeadedr> -->
      <list-header></list-header>
    </el-header>

    <el-container>
      <cTable
        :columns="columns"
        :data="userList"
        :showPagin="true"
        :page="userPage"
        :showCheckBox="false"
        @sortChange="sortChange"
        @pageChange="pageChange"
        @rowClick="handleRowClick"
        border
      />
    </el-container>

    <right-panel>
      <div>123123</div>
    </right-panel>
  </el-container>
</template>

<script>
// import mHeadedr from "./header";
import RightPanel from "@/components/RightPanel";
import ListHeader from "./header.vue";
import cTable from "@/components/CommonTable";
import { mapState, mapMutations, mapActions } from "vuex";
const NAME = "management";
import isEmpty from '@/utils/normal'
import Page from "@/utils/PageDefault";
export default {
  components: {
    cTable,
    ListHeader,
    RightPanel
    // mHeadedr
  },
  data() {
    return {
      columns: [
        {
          visible: true,
          label: "昵称",
          prop: "nickname",
          uuid: 3,
          align: "center",
          render: (row, column, cell) => {
            return <div>{row.nickname}</div>;
          }
        },{
          visible: true,
          label: "头像",
          prop: "headimgurl",
          align: "center",
          render: (row,column,cell) => {
            return (
              <img width="36" height="36" src={row.headimgurl}/>
            )
          }
        },
        {
          visible: true,
          label: "性别",
          prop: "gender",
          uuid: 1,
          align: "center",
          render: (row, column, cell) => {
            let sex;
            if (row.gender == "Gender_Type_Unknown") {
              sex = <span>未设置</span>;
            } else if (row.gender == "Gender_Type_Female") {
              sex = <span>女</span>;
            } else {
              sex = <span>男</span>;
            }
            return <div>{sex}</div>;
          }
        },
        {
          visible: true,
          label: "企业",
          prop: "org",
          align: "center",
          render:(row,column,cell)=>{
            // const {isEmpty} = this 
            return (
              <div>{
                row.org&&row.org.name
              }
              </div>
            )
          }
        },
        {
          visible: true,
          label: "角色",
          prop: "role",
          align: "center",
          render: (r,c,cl)=>{
            return (
              <div>
                {
                  r.role&&r.role.name
                }
              </div>
            )
          }
        },
        {
          visible: true,
          label: "手机",
          prop: "userinfo",
          align: "center",
          render: (r,c,cl)=>{
            return (
              <div>
                {
                  r.userinfo&&r.userinfo.mobile
                }
              </div>
            )
          }
        },
        
        {
          visible: true,
          label: "状态",
          prop: "enabled",
          uuid: 2,
          align: "center",
          render: (row, column, cell) => {
            return (
              <el-tag type={row.enabled ? "primary" : "danger"} size="mini">
                {row.enabled ? "有效" : "无效"}
              </el-tag>
            );
          }
        },
        {
          visible: true,
          label: "创建时间",
          prop: "createdAt",
          align: "center"
        }/*
        {
          visible: true,
          label: "操作",
          align: "center",
          prop: "enabled",
          sort: false,
          width: "240",
          render: (row, column, cell) => {
            const { handleBan, handleEnable, handleKick } = this;
            const enabledBtn = (
              <el-button
                size="mini"
                type="success"
                onClick={() => handleEnable(row)}
              >
                启用
              </el-button>
            );

            const disabled = (
              <el-button
                size="mini"
                type="danger"
                onClick={() => handleBan(row)}
              >
                禁用
              </el-button>
            );

            const kickBtn = (
              <el-button
                size="mini"
                type="warning"
                onClick={() => handleKick(row)}
              >
                下线
              </el-button>
            );

            return (
              <div>
                {row.enabled ? disabled : enabledBtn}
                {kickBtn}
              </div>
            );
          }
        }*/
      ],
      options: [
        {
          value: ""
        }
      ],
      reason: "你写代码的样子真像蔡徐坤!" //提示
    };
  },
  computed: {
    // ...mapState(NAME, ["roleList", "rolePage", "columns"]),
    ...mapState({
      userList: state => state.userManage.userList,
      userPage: state => state.userManage.userPage
      // columns: state => state.userManage.columns
    }),
    routesData() {
      return this.routes;
    }
  },
  created() {
    this.initDataList();
  },
  mounted() {
    // console.warn(this.userList)
  },
  methods: {
    isEmpty(obj){
      return isEmpty(obj)
    },
    handleKick(val) {
      const data = { reason: "你写代码的样子真像蔡徐坤", uuid: val.uuid };
      this.$store
        .dispatch("userManage/kickUser", data)
        .then(()=>{
          this.$message({
            type: 'success',
            message: '操作成功'
          })
        })
        .catch(err => {
          console.log(err);
          this.$message({
            type: "error",
            message: "操作失败"
          });
        });
    },
    handleEnable(val) {
      const data = { reason: "你写代码的样子真像蔡徐坤", uuid: val.uuid };
      this.$store
        .dispatch("userManage/enableUser", data)
        .then(()=>{
          this.$message({
            type: 'success',
            message: '操作成功'
          })
        })
        .catch(err => {
          console.log(err);
          this.$message({
            type: "error",
            message: "操作失败"
          });
        });
    },
    handleBan(val) {
      const data = { reason: "你写代码的样子真像蔡徐坤", uuid: val.uuid };
      this.$store
        .dispatch("userManage/disableUser", data)
        .then(()=>{
          this.$message({
            type: 'success',
            message: '操作成功'
          })
        })
        .catch(err => {
          console.log(err);
          this.$message({
            type: "error",
            message: "操作失败"
          });
        });
    },
    handleRowClick(value) {
      console.log(value)
    },
    sortChange(val) {
      this.initDataList();
    },
    pageChange() {
      this.initDataList();
    },
    initDataList() {
      this.$store
        .dispatch("userManage/getNormalUser")
        .then()
        .catch(err => {
          this.$message({
            type: "error",
            message: err
          });
        });
    }
  }
};
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
