<template>
  <el-container style="width:100%" id="emp-tree">
    <!-- <ul>
      <li v-for="(item, index) in datalist" :key="index">
          +<span>{{item.name}}</span>
          <tree v-if="item.children" :datalist='item.children'></tree>
      </li>
    </ul> -->
    <el-tree
      :data="datalist"
      node-key="id"
      :expand-on-click-node="false"
      block
      default-expanded-keys='1'
      style="width:100%"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <i class="el-icon-folder-opened"  v-if="node.expanded"></i>
         <i class="el-icon-folder"  v-if="!node.expanded"></i>
        <span style="vertical-align: middle">{{node.label}}</span>
        <!-- <span>{{data}}</span> -->
      </span>
    </el-tree>
  </el-container>
</template>

<script>
export default {
  name: "tree",
  props: {
    datalist: Array
  },
  data() {
    return {
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
    };
  },
  methods: {
      onClick(node){
          console.log(node);
      }
    // renderContent(h, { node, data, store }) {
    //   return (
    //     <span class="custom-tree-node">
    //       <span>{node.label}</span>
    //     </span>
    //   );
    // }
  }
};
</script>

<style lang="scss">
    #emp-tree div[role=treeitem]:focus{
        // background: blue;
        // color:white;
    }
</style>
