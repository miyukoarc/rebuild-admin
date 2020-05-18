<template>
  <el-container>
    <el-form :model="form" ref="form" label-width="80px" inline>
      <el-form-item label="">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" v-waves>立即创建</el-button>
        <el-button v-waves>导入</el-button>
        <el-button v-waves>导出</el-button>
        <el-button v-waves>添加</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name:"sadasd"
      }
    }
  },
  methods: {
    onSubmit() {
      
    }
  },
}
</script>

<style lang="scss" scoped>
</style>