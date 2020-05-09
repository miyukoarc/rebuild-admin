<template>
  <el-container class="app-container">
    <el-header height="auto" style="padding:0">
      <mHeadedr></mHeadedr>
    </el-header>

    <el-container>
      <cTable
        :columns="columns"
        :data="roleList"
        :showPagin="true"
        :page="rolePage"
        :showCheckBox="false"
        @sortChange="sortChange"
        @pageChange="pageChange"
        @btnFirst='handleEdit'
        @btnSecond='handleDelete'
        border
      />
    </el-container>
    <el-dialog
      title="编辑"
      destroy-on-close
      append-to-body
      :visible.sync="showDialog"
      :width="dialogWidth"
      :close-on-click-modal="false"
      >
      <cForm :formData='editFormData' @onSubmit='onSubmit' @onCancle='onCancle'/>
    </el-dialog>  
    
  </el-container>
</template>

<script>
import mHeadedr from "./header";
import cTable from "@/components/CommonTable";
import RightPanel from '@/components/RightPanel';
import cForm from './form';
import { mapState, mapMutations, mapActions } from "vuex";
const NAME = "management";
import Page from "@/utils/PageDefault";
export default {
  components: {
    cTable,
    mHeadedr,
    RightPanel,
    cForm,
  },
  data() {
    return {
      showDialog:false,
      editFormData:false,
      options: [
        {
          value: ""
        }
      ]
    };
  },
  computed: {
    ...mapState(NAME, ["roleList", "rolePage", "columns"]),
    routesData() {
      return this.routes;
    }
  },
  created() {
    this.initDataList();
  },
  methods: {
    ...mapActions(NAME, ['getRoleList']),
    ...mapActions('role', ['editRole','deleteRole']),
    sortChange(val) {
      this.initDataList();
    },
    pageChange() {
      this.initDataList();
    },
    handleEdit(row){
      this.showDialog = true;
      this.editFormData = row;
    },
    handleDelete(row){
      // this.$confirm()
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then((result) => {
          this.deleteRoleFunc(row);
        }).catch((err) => {
          this.$message({
               type:'warning',
               message:'取消删除！'
          })
        });
      
    },
    deleteRoleFunc(row){
      let org = this.$store.state.user.userInfo.org.uuid;
      let form = {
        uuid:row.uuid,
        org:org
      }
      this.deleteRole(form).then((result) => {
        this.$message({
            type:'success',
            message:'删除成功！'
        });
        this.initDataList();
      }).catch((err) => {
        this.$message({
             type:'error',
             message:'出错了：'+err
        })
      });
    },
    initDataList() {
      this.getRoleList()
        .then(() => {})
        .catch(err => {
          this.$message({
            message: err,
            type: "error"
          });
        });
    },
    onSubmit(form){
      this.editRole(form).then((result) => {
        this.initDataList();
        this.showDialog = false;
        this.$message({
          type:'success',
          message:'修改成功！'
        })
      }).catch((err) => {
        this.$message({
          type:'error',
          message:'出错了哦：'+err
        })
      });;
    },
    onCancle(){
      this.showDialog = false;
    },
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
