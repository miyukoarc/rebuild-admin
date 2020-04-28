<template>
  <el-container class="permiss-index">
    <el-header class="py-3">
        <el-button type="primary" v-waves>添加菜单</el-button>
    </el-header>
    <el-container>
      <el-aside width="450px" class="px-3">
        <PAside />
      </el-aside>
      <el-main height class="permiss-index-main px-3 py-0">
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
import { mapState ,mapActions} from "vuex";
const NAME='menuManage'
export default {
  components: {
    PAside,
    Tree
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
    menuTree() {
      return this.$store.state.menuManage.menuList;
    }
  },
  mounted () {
    this.getMenuList().catch(err=>{
      this.$message({
        type:'error',
        message:`出错了哦:${err}`
      })
    });
  },
  methods: {
    ...mapActions(NAME,['getMenuList','getMenuListByRole'])
  },
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
