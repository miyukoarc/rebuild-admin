<template>
  <el-container class="permiss-index">
    <el-header class="py-3">
      <!-- <el-button type="primary" v-waves>添加菜单</el-button> -->
      <DialogButton type="primary" title="添加菜单">
        添加菜单
        <div slot="dialog">
          <addForm />
        </div>
      </DialogButton>
      <el-button type="primary" @click="cancelSelect" class="ml-2">取消单选</el-button>
      
    </el-header>
    <el-container>
      <el-aside width="450px" class="px-3">
        <PAside ref="leftTable"/>
      </el-aside>
      <el-main height class="permiss-index-main px-3 py-0 ml-3">
        <el-row>
          <el-col :span="24">
            <Tree :data="menuTree" class="fill" />
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import PAside from "./leftTable";
import Tree from "./roletree";
import DialogButton from "@/components/DialogButton";
import addForm from "./addForm";
import { mapState, mapActions } from "vuex";
const NAME = "menuManage";
export default {
  components: {
    PAside,
    Tree,
    DialogButton,
    addForm
  },
  data() {
    return {
      treeData: [
        {
          id: 1,
          label: "添加"
        },
        {
          id: 2,
          label: "删除"
        },
        {
          id: 3,
          label: "修改"
        },
        {
          id: 4,
          label: "查看状态"
        },
        {
          id: 5,
          label: "查看事件"
        }
      ]
    };
  },
  computed: {
    ...mapState(NAME, ["roleMenus"]),
    menuTree() {
      return this.$store.state.menuManage.menuList;
    }
  },

  created() {
    this.initDataList();
    this.$bus.$on('onRefleshMenuTree',_=>{
      this.initDataList();
    });
  },
  methods: {
    ...mapActions(NAME, ["getMenuList", "getMenuListByRole"]),
    cancelSelect(){
      this.$refs['leftTable'].cancelSelect();
      this.initDataList();
    },
    initDataList() {
      this.getMenuList().catch(err => {
        this.$message({
          type: "error",
          message: `出错了哦:${err}`
        });
      });
    }
  }
};
</script>

<style lang="scss">
.permiss-header {
  line-height: 60px;
}
.permiss-index aside {
  background: unset;
}
.permiss-index-main {
  // margin-top: 8px;
  box-sizing: content-box;
  background: white;
  // margin-right:20px;
  //   height: 83vh;
}
</style>
