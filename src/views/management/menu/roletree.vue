<template>
  <el-container>
    <el-tree
      v-bind="$attrs"
      show-checkbox
      node-key="uuid"
      :props="defaultProps"
      class="fill"
      default-expand-all
    >
    <div class="custom-tree-node" slot-scope="{ node, data }">
          <i class="el-icon-folder-opened" v-if="node.expanded&&node.childNodes!=0"></i>
          <i class="el-icon-folder" v-else></i>
          <span >
            <span class="tree-node-name" ref="nodeName">{{data.name}}</span>
            <el-link type="primary" class="tree-node-url" @click.stop="onClickURL(data.url)">{{data.url}}</el-link>
          </span>
        </div>
    </el-tree>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      defaultProps: {
        children: "children",
        name: "name"
      },
    };
  },
  methods: {
    onClicks(node){
      console.log(node);
    },
    onClickURL(path){
      this.$router.push(path);
    }
    // renderContent() {
    //   return (
    //     <span class="custom-tree-node">
    //       <span>{node.label}</span>
    //       <span>
    //         <el-button
    //           size="mini"
    //           type="text"
    //           on-click={() => this.append(data)}
    //         >
    //           +
    //         </el-button>
    //         <el-button
    //           size="mini"
    //           type="text"
    //           on-click={() => this.remove(node, data)}
    //         >
    //           -
    //         </el-button>
    //       </span>
    //     </span>
    //   );
    // }
  }
};
</script>

<style lang="scss" scoped>
.custom-tree-node{
  position: relative;
  width:100%;
}
.tree-node-url{
  position: absolute;
  right: 5px;
  top:0;
  bottom: 0;
}
</style>
