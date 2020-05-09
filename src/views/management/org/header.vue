<template>
  <el-container>
    <el-form :model="form" ref="form" label-width="80px" inline>
      <el-form-item label>
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
        <el-button type="primary" >添加</el-button>
        <el-button type="primary" >刷新</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>