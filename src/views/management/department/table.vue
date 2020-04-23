<template>
  <el-container class="app-container">
    <el-header height="auto" style="padding:0">
      <mHeadedr></mHeadedr>
    </el-header>

    <el-container>
      <cTable
        :columns="columns"
        :data="departList"
        :showPagin="true"
        :page="page"
        :showCheckBox="false"
        @sortChange="sortChange"
        @pageChange="pageChange"
        border
      />
    </el-container>
  </el-container>
</template>

<script>
import mHeadedr from "./search-form";
import cTable from "@/components/CommonTable";
import { mapState, mapMutations, mapActions } from "vuex";
const NAME = "department";
import Page from "@/utils/PageDefault";
export default {
  components: {
    cTable,
    mHeadedr
  },
  data() {
    return {
      options: [
        {
          value: ""
        }
      ]
    };
  },
  computed: {
    ...mapState(NAME, ["departList", "page", "columns"]),
    routesData() {
      return this.routes;
    }
  },
  created() {
    this.initDataList();
  },
  methods: {
    ...mapActions(NAME, ["getDepartmenList"]),
    sortChange(val) {
      this.initDataList();
    },
    pageChange() {
      this.initDataList();
    },
    initDataList() {
      this.getDepartmenList()
        .then(() => {})
        .catch(err => {
          console.log(err);
          this.$message({
            message: "出错了哦",
            type: "error"
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
