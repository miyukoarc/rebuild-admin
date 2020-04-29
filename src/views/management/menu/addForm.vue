<template>
  <el-container>
    <el-form :model="form" ref="form" label-width="80px" class="fill">
      <el-form-item label="名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="CODE">
        <el-input v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-input v-model="form.iconUrl"></el-input>
      </el-form-item>
      <!-- <el-form-item label="公司">
        <el-select v-model="form.org" placeholder="请选择公司">
          <el-option
            v-for="item in orgList"
            :key="item.uuid"
            :label="item.name"
            :value="item.uuid"
          >
          </el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="父级">
        <!-- <el-input v-model="form.parent"></el-input> -->
        <el-select v-model="form.parent" placeholder="请选择父级菜单">
          <el-option
            v-for="item in pMenuList"
            :key="item.uuid"
            :label="item.name"
            :value="item.uuid"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="角色">
        <!-- <el-input v-model="form.roles"></el-input> -->
        <el-select v-model="form.roles" placeholder="请选择角色" multiple>
          <el-option
            v-for="item in roleList"
            :key="item.uuid"
            :label="item.name"
            :value="item.uuid"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="路径">
        <el-input v-model="form.url"></el-input>
      </el-form-item>
      <el-form-item label="排序">
        <!-- <el-input v-model="form.sort"></el-input> -->
        <el-input-number v-model="form.sort" :min="1" :max="100" ></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        code: "",
        iconUrl: "",
        org: 1, 
        parent: "",
        roles: [],
        url: "",
        sort:null
      },
      // orgList:[
      //     {name:'天邮',uuid:1}
      // ]
    };
  },
  inject:['reload'],
  computed: {
      roleList() {
          return this.$store.state.role.roleList; 
      },
      pMenuList(){
          return this.$store.state.menuManage.menuList
      }
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch("menuManage/addMenu", this.form)
        .then(result => {
          this.$message({
            type: "success",
            message: "添加成功"
          });
          this.$bus.$emit("closeDialog");
          this.reload();
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: "添加失败:" + err
          });
        });
    },
    onCancel() {
      this.$bus.$emit("closeDialog");
    }
  }
};
</script>

<style lang="scss" scoped></style>
