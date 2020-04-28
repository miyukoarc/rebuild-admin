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
      <el-button type="primary" @click="onSubmit">添加</el-button>
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
        terminal: "ORG",
        org: 1
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
      if (this.formData) {
        return this.formData;
      }
      return this.form1;
    }
  },
  methods: {
    onSubmit() {
      this.$emit("onSubmit", this.form);
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
