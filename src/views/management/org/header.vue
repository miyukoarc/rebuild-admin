<template>
  <el-container>
    <el-form :model="form" ref="form" label-width="80px" inline>
      <el-form-item label>
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
        <el-button type="primary" @click="handleTest">测试</el-button>
        <el-button type="primary" @click="handleCreate">添加</el-button>
        <el-button type="primary" @click="handleRefresh">刷新</el-button>
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
  },
  methods: {
      handleSearch(){

      },
      handleCreate(){

      },
      handleRefresh(){

      },
      handleTest(){
          this.$bus.$emit('showFormDialog',{ type: 'test',state: true })
          console.log(1)
      }
  }
}
</script>

<style lang="scss" scoped>
</style>