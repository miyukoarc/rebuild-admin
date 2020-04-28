<template>
  <el-container>
    <el-tree
      v-bind="$attrs"
      :show-checkbox="showCheckbox"
      @check="onNodeCheck"
      node-key="uuid"
      :props="defaultProps"
      class="fill"
      default-expand-all
      ref="menuTree"
    >
      <div
        class="custom-tree-node"
        slot-scope="{ node, data }"
        @mouseover="onMouseOver"
        @mouseleave="onMouseLeave"
      >
        <i
          class="el-icon-folder-opened"
          v-if="node.expanded && node.childNodes != 0"
        ></i>
        <i class="el-icon-folder" v-else></i>
        <span>
          <span class="tree-node-name" ref="nodeName">{{ data.name }}</span>
          <el-popover
            placement="top-start"
            title="角色"
            width="200"
            trigger="hover"
            class="ml-2"
            v-show="showRoleCount"
          >
            <span slot="reference"
              >({{
                isEmptyObj(data.roles) ? 0 : data.roles.length
              }}个角色)</span
            >
            <el-tag
              type="info"
              v-for="(item, index) in data.roles"
              :key="index"
              class="ml-2 mb-2"
            >
              {{ item.name }}
            </el-tag>
          </el-popover>
          <i
            class="el-icon-delete ml-2"
            @click.stop="onDeleteMenu(data.uuid)"
            v-show="data.showDeleteBtn"
          ></i>
          <el-link
            type="primary"
            class="tree-node-url"
            @click.stop="onClickURL(data.url)"
            >{{ data.url }}</el-link
          >
        </span>
      </div>
    </el-tree>
  </el-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { isEmpty } from "@/utils/normal";
const NAME = "menuManage";
export default {
  data() {
    return {
      defaultProps: {
        children: "children",
        name: "name"
      },
      roleId: "",
      // showCheckbox:false,
      showRoleCount: true,
      showDeleteBtn: false,
      keys: []
    };
  },
  computed: {
    ...mapState(NAME, ["roleMenus"]),
    showCheckbox() {
      return !!this.roleId;
    }
  },
  watch: {
    roleMenus(newValue, oldValue) {
      this.keys = [];
      let keys = this.getKeysForList(newValue);
      this.$refs["menuTree"].setCheckedKeys(keys);
    }
  },
  mounted() {
    this.$bus.$on("handleCurrentChange", val => {
      this.roleId = val;
      this.showRoleCount = false;
    });
  },
  methods: {
    ...mapActions(NAME, ["addMenuForRole"]),
    isEmptyObj(obj) {
      return isEmpty(obj);
    },
    onMouseOver() {},
    onMouseLeave() {},
    onClicks(node) {},
    getKeysForList(list) {
      for (const val of list) {
        if (val.hasOwnProperty("children")) {
          this.getKeysForList(val.children);
        } else {
          this.keys.push(val.uuid);
        }
      }
      return this.keys;
    },
    onNodeCheck(data, node) {
      let menuIds = node.checkedKeys.concat(node.halfCheckedKeys);
      let uuid = this.roleId;
      this.addMenuForRole({ menuIds, uuid }).then(res => {
        this.$bus.$emit("onRefleshMenuTree");
      });
    },
    onDeleteMenu() {},
    onClickURL(path) {
      this.$router.push(path);
    }
  }
};
</script>

<style lang="scss" scoped>
.custom-tree-node {
  position: relative;
  width: 100%;
}
.tree-node-url {
  position: absolute;
  right: 5px;
  top: 0;
  bottom: 0;
}
</style>
