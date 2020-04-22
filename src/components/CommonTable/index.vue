<template>
  <el-container
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.3)"
    class="fill common-table"
  >
    <el-main class="fill" style="padding:0">
      <el-table
        ref="table"
        v-bind="$attrs"
        v-on="$listeners"
        :row-style="rowStyle"
        @sort-change="sortChange"
        @row-click="rowClick"
        :empty-text="emptyText"
        style="width: 100%"
      >
        <el-table-column
          v-if="showCheckBox"
          type="selection"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column
          v-if="showIndex"
          type="index"
          width="35"
          align="center"
        ></el-table-column>
        <el-table-column
          v-if="showPagin"
          label="序号"
          width="55"
          type="index"
          :index="indexMethod"
        >
        </el-table-column>
        <template v-for="col in columns">
          <template v-if="col.visible">
            <el-table-column
              v-if="!col.showCaozuo"
              :prop="col.prop"
              :label="col.label"
              :sortable="col.sort === undefined ? 'custom' : col.sort"
              :sort-by="col.sortBy ? col.sortBy : col.prop"
              :width="col.width ? col.width : ''"
              :fixed="col.fixed ? col.fixed : false"
              :formatter="col.formatter"
              show-overflow-tooltip
              :key="col.uuid"
              :align="col.align ? col.align : 'left'"
            >
            </el-table-column>
            <el-table-column
              v-else
              prop="col.prop"
              :label="col.label"
              :sortable="col.sort === undefined ? 'custom' : col.sort"
              :sort-by="col.sortBy ? col.sortBy : col.prop"
              :width="col.width ? col.width : ''"
              :fixed="col.fixed ? col.fixed : false"
              :formatter="col.formatter"
              show-overflow-tooltip
              :key="col.uuid"
              :align="col.align ? col.align : 'left'"
            >
              <template slot-scope="scope">
                <el-button type="primary" size="mini" v-waves>编辑</el-button>
                <el-button type="danger" size="mini" v-waves>删除</el-button>
              </template>
            </el-table-column>
          </template>
        </template>
      </el-table>
      <!--  -->
    </el-main>
    <el-footer height="auto" >
      <el-pagination
        v-if="showPagin"
        v-bind="$attrs"
        style="text-align: right"
        class="pagination-container is-backgrounds"
        :current-page="page.page"
        :page-sizes="page.pageSizes"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="page.rows"
        :total="page.total"
        layout=" total,sizes, prev, pager, next, jumper"
      >
      </el-pagination>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  props: {
    columns: Array,
    page: Object,
    loading: {
      type: Boolean,
      default: false
    },
    showCheckBox: {
      type: Boolean,
      default: true
    },
    showIndex: {
      type: Boolean,
      default: false
    },
    showPagin: {
      type: Boolean,
      default: true
    },
    hasUserNumber: {
      type: Boolean,
      default: false
    },
    rowStyle: {
      type: Function
    }
  },
  data() {
    return {
      height: "100%",
      currentPage: 1,
      pageSizes: [50, 100, 200, 500],
      pageSize: 50,
      total: 0,
      data: [],
      param: {}
      //handleChange: true
    };
  },
  computed: {
    // a computed getter
    emptyText: function() {
      return this.loading ? " " : "暂无数据";
    }
  },
  watch: {
    columns() {
      this.$refs["table"].doLayout();
    }
  },
  methods: {
    rowClick(row, column, cell, event) {},
    handleSizeChange(val) {
      this.page.rows = val;
      this.$emit("pageChange");
    },
    handleCurrentChange(val) {
      this.page.page = val;
      this.$emit("pageChange");
    },
    sortChange(val) {
      // console.log('pagenation table sort change ', val)
      if (val.hasOwnProperty("column") && val.column !== null) {
        this.page.sort = val.column.sortBy;
        this.page.order = val.order;
        this.$emit("sortChange", val);
      }
    },
    indexMethod(index) {
      return this.page.rows * (this.page.page - 1) + index + 1;
    },
    onResize: function(val) {
      if (val) {
        this.height = val.clientHeight - 32;
      }
    },
    userNumberClick(deviceId) {
      if (deviceId) {
        this.$router.push({
          name: "clickAnalysis",
          params: {
            deviceId: deviceId
          }
        });
      }
    }
  },
  mounted() {
    // this.height = this.$el.clientHeight - 32;
  },
  inheritAttrs: false
};
</script>

<style lang="css">
.el-table th {
  text-align: center;
}
.common-table .el-table--enable-row-hover .el-table__body tr:hover {
  background-color: #f5f7fa;
}
.pagination-container{
  background: #fff;
    padding: 32px 16px;
}

.pagination-container .btn-next,.pagination-container .btn-prev, .pagination-container .el-pager li {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    min-width: 30px;
    border-radius: 2px;
}
.pagination-container  .el-pager li:not(.disabled).active {
    background-color: #1890ff;
    color: #fff;
}
.el-pager li .active {
    color: #1890ff;
    cursor: default;
}
.pagination-container .btn-next:disabled, .pagination-container .btn-prev:disabled {
    color: #c0c4cc;
    background-color: #f4f4f5;
}
</style>
