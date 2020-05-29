<template>
  <el-container>
    <el-form :model="formData" ref="form" label-width="80px" class="fill">
      <el-form-item label="名称">
        <el-input v-model.trim="form.name"></el-input>
      </el-form-item>
      <el-form-item label="CODE">
        <el-input v-model.trim="form.code"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-input v-model.trim="form.iconUrl"></el-input>
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
      </el-form-item>-->
      <el-form-item label="父级">
        <!-- <el-input v-model="form.parent"></el-input> -->
        <!-- <el-select v-model.trim="form.parent" clearable  placeholder="请选择父级菜单">
          <el-option
            v-for="(item,index) in pMenuList"
            :key="index"
            :label="item.name"
            :value="item.uuid"
          >
          <span v-html="item.name">
          </span>
          </el-option>
        </el-select>-->
        <el-cascader
          v-model.trim="form.parent"
          clearable
          placeholder="请选择父级菜单"
          :options="pMenuList"
          :props="{value:'uuid',label:'name',checkStrictly:true}"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="角色">
        <!-- <el-input v-model="form.roles"></el-input> -->
        <el-select v-model.trim="form.roles" clearable placeholder="请选择角色" multiple>
          <el-option
            v-for="(item,index) in roleList"
            :key="index"
            :label="item.name"
            :value="item.uuid"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="路径">
        <el-input v-model.trim="form.url"></el-input>
      </el-form-item>
      <el-form-item label="排序">
        <!-- <el-input v-model="form.sort"></el-input> -->
        <el-input-number v-model="form.sort" :min="1"></el-input-number>
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
  props: {
    formData: Object
  },
  data() {
    return {
      formDefault: {
        name: '',
        code: '',
        iconUrl: '',
        org: 1,
        parent: '',
        roles: [],
        url: '',
        sort: null
      },
      tabCount: 2,
      menuListTemp: []
    }
  },
  computed: {
    roleList() {
      return Array.from(this.$store.state.role.roleList)
    },
    pMenuList() {
      let menuList = []
      menuList = Array.from(this.$store.state.menuManage.menuList)
      // console.log(this.getMenu(menuList));
      return menuList;
    },
    form: {
      get() {
        let nForm = this.getNewData()
        this.formDefault = { ...nForm }
        return this.formDefault
      },
      set(val) {
        this.formDefault = val
      }
    }
  },
  mounted() {},
  methods: {
    /**
     * 让点击传入的数据符合element表单的格式
     * 最多只支持三级菜单
     */
    getNewData() {
      let obj = this.formData;
      let menuList = Array.from(this.$store.state.menuManage.menuList);
      if (Array.isArray(obj.roles)) {
        let arr = obj.roles.map(e => {
          return e.uuid
        })
        obj.roles = arr
      } else {
        obj.roles = []
      }
      if (Object.keys(obj.parent).length) {
        let ids = [],parentObj = obj.parent;
        ids.unshift(parentObj.uuid);
        menuList.forEach(e=>{
          if(e.hasOwnProperty("children")){
            e.children.forEach(m=>{
              if(m.uuid === parentObj.uuid){
                ids.unshift(e.uuid);
              }
            })
          }
        });
        obj.parent = ids;
      } else {
        obj.parent = []
      }
      obj.org = 1
      return obj
    },
    onSubmit() {
      let subData = JSON.parse(JSON.stringify(this.form)); // 对象深拷贝
      subData.parent = subData.parent.pop();

      this.$store
        .dispatch('menuManage/editMenu', subData)
        .then(result => {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.$bus.$emit('closeDialog')
          this.$bus.$emit('onRefleshMenuTree')
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: '修改失败:' + err
          })
        })
    },
    onCancel() {
      this.$bus.$emit('closeDialog')
    }
  }
}
</script>

<style lang="scss" scoped></style>
