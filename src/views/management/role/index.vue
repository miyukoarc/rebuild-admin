<template>
  <el-container class="app-container">
    <el-header height="auto" style="padding:0">
      <el-form :model="form" ref="form" label-width="80px" inline>
        <!-- <el-form-item >
          <el-input v-model="form.name" placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item >
          <el-select v-model="form.password" placeholder="条件">
            <el-option v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          
        </el-form-item> -->
        <el-form-item >
          <el-input v-model="form.name" placeholder="用户名" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button v-waves type="primary"  size="small" icon="el-icon-search">搜索</el-button>
          <dialog-button v-waves type="primary"  size="small" icon="el-icon-circle-plus-outline">添加</dialog-button>
          <el-button  v-waves type="primary"  icon="el-icon-refresh" size="small"  class="filter-item">刷新</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    
    <el-container>
      <cTable
      :columns="columns"
      :data="dataList"
      :showPagin="true"
      :page="page"
       border
    />
    </el-container>
  </el-container>
</template>

<script>
// import path from "path";
// import { deepClone } from "@/utils";
// import {
//   getRoutes,
//   getRoles,
//   addRole,
//   deleteRole,
//   updateRole
// } from "@/api/role";
// import i18n from "@/lang";
import cTable from "@/components/CommonTable";
import DialogButton from '@/components/DialogButton';
import Page from "@/utils/PageDefault";
const defaultRole = {
  key: "",
  name: "",
  description: "",
  routes: []
};

export default {
  components: {
    cTable,
    DialogButton,
  },
  data() {
    return {
      role: Object.assign({}, defaultRole),
      routes: [],
      rolesList: [],
      dialogVisible: false,
      dialogType: "new",
      checkStrictly: false,
      page: new Page(),
      form:{
        name:null
      },
      defaultProps: {
        children: "children",
        label: "title"
      },
      options:[{
        value:""
      }],
      dataList: [
        {
          code: "2016-05-02",
          name: "王小虎",
          platform: "ORG",
           createtime: "2016-05-01",
        },
        {
          code: "2016-05-04",
          name: "王小虎",
          platform: "ORG",
          createtime: "2016-05-01",
        },
        {
          code: "2016-05-01",
          name: "王小虎",
          platform: "ORG",
          createtime: "2016-05-01",
        },
        {
          code: "2016-05-03",
          name: "王小虎",
          platform: "ORG",
          createtime: "2016-05-01",
        }
      ],
      columns: [
        {
          visible: true,
          label: "Code",
          prop: "code",
          uuid: 3,
          align: "center"
        },
        {
          visible: true,
          label: "名称",
          prop: "name",
          uuid: 1,
          align: "center"
        },
        {
          visible: true,
          label: "平台",
          prop: "platform",
          uuid: 2,
          align: "center",
        },
        {
          visible: true,
          label: "创建时间",
          prop: "createtime",
          align: "center",
        },
        {
          visible: true,
          label: "操作",
          prop: "caozuo",
          align: "center",
          sort: false,
          showCaozuo:true
        }
      ]
    };
  },
  computed: {
    routesData() {
      return this.routes;
    }
  },
  created() {
    // Mock: get all routes and roles list from server
    // this.getRoutes()
    // this.getRoles()
  },
  methods: {
    async getRoutes() {
      const res = await getRoutes();
      this.serviceRoutes = res.data;
      const routes = this.generateRoutes(res.data);
      this.routes = this.i18n(routes);
    },
    async getRoles() {
      const res = await getRoles();
      this.rolesList = res.data;
    },
    i18n(routes) {
      const app = routes.map(route => {
        route.title = i18n.t(`route.${route.title}`);
        if (route.children) {
          route.children = this.i18n(route.children);
        }
        return route;
      });
      return app;
    },
    // Reshape the routes structure so that it looks the same as the sidebar
    generateRoutes(routes, basePath = "/") {
      const res = [];

      for (let route of routes) {
        // skip some route
        if (route.hidden) {
          continue;
        }

        const onlyOneShowingChild = this.onlyOneShowingChild(
          route.children,
          route
        );

        if (route.children && onlyOneShowingChild && !route.alwaysShow) {
          route = onlyOneShowingChild;
        }

        const data = {
          path: path.resolve(basePath, route.path),
          title: route.meta && route.meta.title
        };

        // recursive child routes
        if (route.children) {
          data.children = this.generateRoutes(route.children, data.path);
        }
        res.push(data);
      }
      return res;
    },
    generateArr(routes) {
      let data = [];
      routes.forEach(route => {
        data.push(route);
        if (route.children) {
          const temp = this.generateArr(route.children);
          if (temp.length > 0) {
            data = [...data, ...temp];
          }
        }
      });
      return data;
    },
    handleAddRole() {
      this.role = Object.assign({}, defaultRole);
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([]);
      }
      this.dialogType = "new";
      this.dialogVisible = true;
    },
    handleEdit(scope) {
      this.dialogType = "edit";
      this.dialogVisible = true;
      this.checkStrictly = true;
      this.role = deepClone(scope.row);
      this.$nextTick(() => {
        const routes = this.generateRoutes(this.role.routes);
        this.$refs.tree.setCheckedNodes(this.generateArr(routes));
        // set checked state of a node not affects its father and child nodes
        this.checkStrictly = false;
      });
    },
    handleDelete({ $index, row }) {
      this.$confirm("Confirm to remove the role?", "Warning", {
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        type: "warning"
      })
        .then(async () => {
          await deleteRole(row.key);
          this.rolesList.splice($index, 1);
          this.$message({
            type: "success",
            message: "Delete succed!"
          });
        })
        .catch(err => {
          console.error(err);
        });
    },
    generateTree(routes, basePath = "/", checkedKeys) {
      const res = [];

      for (const route of routes) {
        const routePath = path.resolve(basePath, route.path);

        // recursive child routes
        if (route.children) {
          route.children = this.generateTree(
            route.children,
            routePath,
            checkedKeys
          );
        }

        if (
          checkedKeys.includes(routePath) ||
          (route.children && route.children.length >= 1)
        ) {
          res.push(route);
        }
      }
      return res;
    },
    async confirmRole() {
      const isEdit = this.dialogType === "edit";

      const checkedKeys = this.$refs.tree.getCheckedKeys();
      this.role.routes = this.generateTree(
        deepClone(this.serviceRoutes),
        "/",
        checkedKeys
      );

      if (isEdit) {
        await updateRole(this.role.key, this.role);
        for (let index = 0; index < this.rolesList.length; index++) {
          if (this.rolesList[index].key === this.role.key) {
            this.rolesList.splice(index, 1, Object.assign({}, this.role));
            break;
          }
        }
      } else {
        const { data } = await addRole(this.role);
        this.role.key = data.key;
        this.rolesList.push(this.role);
      }

      const { description, key, name } = this.role;
      this.dialogVisible = false;
      this.$notify({
        title: "Success",
        dangerouslyUseHTMLString: true,
        message: `
            <div>Role Key: ${key}</div>
            <div>Role Name: ${name}</div>
            <div>Description: ${description}</div>
          `,
        type: "success"
      });
    },
    // reference: src/view/layout/components/Sidebar/SidebarItem.vue
    onlyOneShowingChild(children = [], parent) {
      let onlyOneChild = null;
      const showingChildren = children.filter(item => !item.hidden);

      // When there is only one child route, the child route is displayed by default
      if (showingChildren.length === 1) {
        onlyOneChild = showingChildren[0];
        onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path);
        return onlyOneChild;
      }

      // Show parent if there are no child route to display
      if (showingChildren.length === 0) {
        onlyOneChild = { ...parent, path: "", noShowingChildren: true };
        return onlyOneChild;
      }

      return false;
    }
  }
};
</script>

<style lang="scss">
.app-container {
  border-top: 1px solid #e9e9e9;
  background: white;
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
header .el-header button{
  margin-right: 5px;
}
</style>
