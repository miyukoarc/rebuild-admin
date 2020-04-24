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
      node-key="uuid"
      :expand-on-click-node="false"
      block
      :default-expanded-keys='[10000]'
      style="width:100%"
      highlight-current
      @node-click="onNodeClick"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
          <i class="el-icon-folder-opened"  v-if="node.expanded"></i>
          <i class="el-icon-folder"  v-if="!node.expanded"></i>
          <span style="vertical-align: middle">{{data.name}}</span>
      </span>
    </el-tree>
  </el-container>
</template>

<script>
export default {
  name: "tree",
  props: {
    datalist: Array,
  },
  data() {
    return {
      showMoreNode:false,
    };
  },
  methods: {
    onNodeClick(data,node,tree){
      // console.log(data,node,tree);
      this.$emit('onNodeClick',[data,node,tree])
    }
  }
};
</script>

<style lang="scss">
</style>
