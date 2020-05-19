<template>
  <el-container>
    <el-table
      :data="department"
      style="width: 100%"
      row-key="uuid"
      border
      lazy
      height
      stripe
      default-expand-all
      class="fill"
      @row-click="handleDetail"
      :tree-props="{ children: 'children' }"
      >
      <el-table-column
        prop="name"
        label="名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="manager"
        label="主管"
        align="center"
        :formatter="formatterRow"
      ></el-table-column>
      <el-table-column
        prop="parent"
        label="上级"
        align="center"
        :formatter="formatterRow"
      ></el-table-column>
      <el-table-column
        prop="users"
        label="人数"
        align="center"
        :formatter="formatterRow"
      ></el-table-column>
      <el-table-column
        prop="code"
        label="CODE"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="createdAt"
        label="创建时间"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" align="center" width="240">
        <div slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click.stop="() => handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            size="mini"
            @click.stop="() => handleDelete(scope.row)"
            >删除</el-button
          >
        </div>
      </el-table-column>
    </el-table>
    <right-panel>
      <div>
        <component :is="'DepartmentDetail'" />
      </div>
    </right-panel>
    <el-dialog
      width="400px"
      append-to-body
      :visible.sync="showDialog"
      :title="panelModel == 'AddDepartment' ? '添加' : '编辑'"
      :close-on-click-modal="false"
    >
      <component
        :is="panelModel"
        @close="closeDialog"
        @closeDialog="closeDialog"
      ></component>
    </el-dialog>
  </el-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { isEmpty } from "@/utils/normal";
import EditForm from "./form.vue";
import DepartmentDetail from "./detail";
import RightPanel from "@/components/RightPanel";

export default {
  components: {
    EditForm,
    DepartmentDetail,
    RightPanel
  },
  data() {
    return {
      panelModel: "DepartmentDetail",
      showDialog: false
    };
  },
  computed: {
    ...mapState("department", ["department"])
    // ...mapGetters(["department"])
  },
  mounted() {
    this.getDepartment();
    // log(12456)
  },
  methods: {
    ...mapActions("department", ["getDepartment"]),
    isEmpty(obj) {
      return isEmpty(obj);
    },
    closeDialog(val) {
      this.showDialog = false;
    },
    handleEdit(row) {
      this.panelModel = "EditForm";
      const nextUrl = `${this.$route.path}?edit=${row.uuid}`;
      this.$store
        .dispatch("department/getDepartmentDetail", row.uuid)
        .then(_ => {
             this.getDepartment();
             this.showDialog = true;
        });
      this.$router.push({ path: nextUrl });
    },
    handleDelete(val) {
      this.$confirm("是否删除当前部门", "Warning", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$store
            .dispatch("department/deleteDepartment", {
              uuid: val.uuid
            })
            .then(_ => {
                this.getDepartment();
              this.$message({
                type: "success",
                message: "删除成功"
              });
            })
            .catch(err => {
              this.$message({
                type: "error",
                message: err
              });
            });
        })
        .catch(err => {
          // console.log(err)
        });
      // console.log(val)
    },
    handleDetail(row) {
      this.panelModel = "DepartmentDetail";
      const nextUrl = `${this.$route.path}?detail=${row.uuid}`;
      this.$store
        .dispatch("department/getDepartmentDetail", row.uuid)
        .then(_ => {
          this.$store.commit("component/TOGGLE_PANEL", true);
          this.$route.query.detail = row.uuid;
        });
      this.$router.push({ path: nextUrl });
    },
    formatterRow(row, column, cellValue, index) {
      // cellValue = Array.prototype.slice.call(cellValue)
      // if(cellValue instanceof Array){
      //   console.log(Object.getPrototypeOf(cellValue)===Array.prototype);
      //   console.log(typeof cellValue);
      // }
      if (Array.isArray(cellValue)) {
        return cellValue.length;
      } else {
        // if (!cellValue.isEmptyObj()) {
        //   return cellValue.name||cellValue.nickname;
        // }
        return "无";
      }

      return "无";
    }
  }
};
</script>

<style lang="scss" scoped></style>
