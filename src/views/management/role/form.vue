<template>
  <el-form :model="form" ref="form" :rules="rules" label-width="80px">
    <el-form-item label="code" prop="code">
      <el-input v-model="form.code"></el-input>
    </el-form-item>
    <el-form-item label="名称" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="平台" prop="terminal">
      <el-input v-model="form.terminal"></el-input>
    </el-form-item>
    <el-form-item style="text-align: right">
      <el-button type="primary" @click="onSubmit" v-if="!formData">添加</el-button>
       <el-button type="primary" @click="onSubmit" v-if="formData">编辑</el-button>
      <el-button @click="onCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    formData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      form1: {
        code: "",
        name: "",
        terminal: "",
      },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        code: [{ required: true, message: "请输入CODE", trigger: "blur" }],
        terminal: [{ required: true, message: "请输入平台", trigger: "blur" }]
      }
    };
  },
  computed: {
    form() {
      if (this.formData&&!Object.keys(this.formData).length) {
       this.form1 = {
         ...this.formData
       }
        return this.form1;
      }
      return this.form1;
    },
    org(){
      return this.$store.state.user.userInfo.org.uuid;
    }
  },
  methods: {
    onSubmit() {
      this.form1.org = this.org;
      this.$emit("onSubmit", this.form1);
    },
    onCancel() {
      this.$emit("onCancle");
    }
  }
};
</script>

<style lang="scss">
form label {
  font-weight: normal;
}
</style>
