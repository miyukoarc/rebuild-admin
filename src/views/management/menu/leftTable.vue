<template>
  <el-container class="permiss-asider">
    <CTable
      ref="singleTable"
      :columns="columns"
      :showPagin="false"
      :data="roleList"
      highlight-current-row
      @current-change="handleCurrentChange"
      :showIndex="true"
      :showCheckBox="false"
      :current-row-key="$route.query.detail"
      border
    />
  </el-container>
</template>

<script>
import CTable from "@/components/CommonTable/index";
import Page from "@/utils/PageDefault";
import { mapState, mapActions } from "vuex";
const NAME = "menuManage";
export default {
  components: {
    CTable
  },
  data() {
    return {
      page: new Page(),
      currentRow: null,
      currentRowID: null,
      columns: [
        {
          visible: true,
          label: "名称",
          prop: "name",
          uuid: 1,
          sort: false,
          align: "center"
        },
        {
          visible: true,
          label: "Code",
          prop: "code",
          sort: false,
          uuid: 3,
          align: "center"
        },

        {
          visible: true,
          label: "终端",
          prop: "terminal",
          uuid: 2,
          align: "center",
          sort: false,
          render: function(row, column, cellValue, index) {
            if (cellValue == "ORG") {
              return "企业端";
            } else if (cellValue == "USER") {
              return "用户端";
            }
            return "其它";
          }
        }
      ]
    };
  },
    watch:{
      $route: {
          handler(newVal, oldVal){
            //   const uuid = newVal.query.detail
            //   if(uuid){
            //       console.log("监听到了",uuid)


            //       this.handleCurrentChange({uuid:uuid})

            //       const item = this.roleList.find(i=>{return i.uuid==uuid})
            //         // console.log(item,this.roleList)
            //       this.setCurrentRow(item)
            //   }
          },
          deep: true,
          immediate: true
      }
  },
  computed: {
    ...mapState("role", ["roleList"])
  },
  mounted() {
    if (this.roleList.length == 0 || this.roleList) {
      this.getRoleList().then(() => {
        // this.$refs["singleTable"].$refs["table"].setCurrentRow(this.roleList[0]);
      });
    }
    this.$bus.$on("onRefleshMenuTree", _ => {
      if (!this.currentRowID) {
        return;
      } else {
        this.getMenuListByRole(this.currentRowID).catch(err => {
          this.$message({
            type: "error",
            message: err
          });
        });
      }
    });
  },
  updated(){
      this.initMenu()
  },
  beforeDestroy () {
      this.$bus.$off('onRefleshMenuTree')
  },
  methods: {
    ...mapActions("role", ["getRoleList"]),
    ...mapActions(NAME, ["getMenuList", "getMenuListByRole"]),
    initMenu(){
        const uuid = this.$route.query.detail
              if(uuid){
                  console.log("监听到了",uuid)


                  this.handleCurrentChange({uuid:uuid})

                  const item = this.roleList.find(i=>{return i.uuid==uuid})
                    // console.log(item,this.roleList)
                  this.setCurrentRow(item)
              }
    },
    cancelSelect(){
      this.$refs["singleTable"].$refs["table"].setCurrentRow();
    },rowKey(row){
        console.log(row.uuid)
    },
    handleCurrentChange(val) {
      let aParam = val?val.uuid:val
      this.currentRowID = aParam;
      this.$bus.$emit("handleCurrentChange", aParam);
    //   this.$router.push({url})
      aParam&&this.getMenuListByRole(aParam).catch(err => {
        this.$message({
          type: "error",
          message: err
        });
      });
    },
    setCurrentRow(item){
        // console.log(this.$refs['singleTable'])
        this.$refs['singleTable'].$refs["table"].setCurrentRow(item)
    }
  }
};
</script>

<style lang="scss">
.permiss-asider .el-table--enable-row-hover .el-table__body tr:hover {
  background-color: #f5f7fa;
}
</style>
