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
      default-expand-all
      style="width:100%"
      highlight-current
      @node-click="onNodeClick"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <i
          class="el-icon-folder-opened"
          v-if="node.expanded && node.childNodes != 0"
        ></i>
        <i class="el-icon-folder" v-else></i>
        <el-tooltip placement="top" :content="data.name">
          <span class="tree-node-name" ref="nodeName"
            >{{ data.name }} ({{
              isEmptyObject(data.users) ? 0 : data.users.length
            }})</span
          >
        </el-tooltip>
      </span>
    </el-tree>
  </el-container>
</template>

<script>
import { isEmpty } from "@/utils/normal";
export default {
  name: "tree",
  props: {
    datalist: Array
  },
  data() {
    return {};
  },
  mounted() {
    this.$nextTick(() => {
      let nodeNames = document.getElementsByClassName("tree-node-name");
      let treeNodes = document.getElementsByClassName("custom-tree-node");
      // console.log(nodeNames.length);
      for (let i = 0; i < nodeNames.length; i++) {
        // console.log(i);
        const elName = nodeNames[i];
        if (elName.offsetWidth > treeNodes[i].offsetWidth) {
          // console.log(1234);
        }
      }
    });
  },
  methods: {
    onNodeClick(data, node, tree) {
      this.$emit("onNodeClick", [data, node, tree]);
    },
    isEmptyObject(obj) {
      return isEmpty(obj);
    }
  }
};
</script>

<style lang="scss">
.custom-tree-node {
  // display: inline-block;
  // width:100%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tree-node-name {
  vertical-align: middle;
}
</style>
