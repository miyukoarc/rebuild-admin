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
            :enterable='false'
            v-show="showRoleCount"
          >
            <span slot="reference"
              >({{
                data.roles.isEmptyObj() ? 0 : data.roles.length
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
            class="el-icon-edit ml-4 node-edit"
            @click.stop="onEditMenu(data)"
          ></i>
          <i
            class="el-icon-delete ml-2 node-delete"
            @click.stop="onDeleteMenu(data.uuid)"
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
    <el-dialog
      title="编辑"
      :visible.sync="showEditDialog"
      append-to-body
      :width="dialogWidth"
      :close-on-click-modal="false"
    >
      <editForm :formData="editFormData" />
    </el-dialog>
  </el-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import editForm from "./editForm";
const NAME = "menuManage";
export default {
  components: {
    editForm
  },
  data() {
    return {
      defaultProps: {
        children: "children",
        name: "name"
      },
      roleId: "",
      showEditDialog: false,
      // showCheckbox:false,
      showRoleCount: true,
      keys: [],
      editFormData: {}
    };
  },
  inject: ["reload"],
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
    this.$bus.$on("closeDialog", _ => {
      this.showEditDialog = false;
    });
  },
  updated() {
    this.$nextTick(() => {
      var editNodes = document.getElementsByClassName("node-edit");
      var delNodes = document.getElementsByClassName("node-delete");
      var treeNodes = document.getElementsByClassName("custom-tree-node");
      for (let i = 0; i < treeNodes.length; i++) {
        const element = treeNodes[i];
        element.onmouseover = () => {
          if (!this.roleId) {
            editNodes[i].style.filter = 'opacity(1)';
            delNodes[i].style.filter = 'opacity(1)';
             editNodes[i].style.opacity = 1;
            delNodes[i].style.opacity = 1;
          }
        };
        element.onmouseleave = () => {
          
          editNodes[i].style.filter = 'opacity(0)';
          delNodes[i].style.filter = 'opacity(0)';
          editNodes[i].style.opacity = 0;
          delNodes[i].style.opacity = 0;
        };
      }
    });
  },
  beforeDestroy () {
      this.$bus.$off('handleCurrentChange')
      this.$bus.$off('closeDialog')
  },
  methods: {
    ...mapActions(NAME, ["addMenuForRole", "delMenuById"]),
    getKeysForList(list) {
      for (const val of list) {
        let node = this.$refs['menuTree'].getNode(val.uuid);
        if (val.hasOwnProperty("children")) {
          this.getKeysForList(val.children);
        } else if(node.childNodes.length==0){
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
        // this.reload();
      });
    },
    onDeleteMenu(uuid) {
      this.delMenuById(uuid)
        .then(result => {
          this.$bus.$emit("onRefleshMenuTree");
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: "删除失败:必须先删除下级菜单和自己的角色的关联"
          });
        });
    },
    onEditMenu(data) {
      this.showEditDialog = true;
      this.editFormData = data;
    },
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
.node-edit {
  color: #409eff;
  filter: opacity(0);
  opacity: 0;
  transition: opacity .8s;
  // display: none;
}
.node-delete {
  color: #f56c6c;
  filter: opacity(0);
  opacity: 0;
  transition: opacity .8s;
  // display: none;
}
</style>
