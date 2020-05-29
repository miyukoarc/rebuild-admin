<template>
  <el-container>
    <el-form :model="form" ref="form" label-width="80px" inline>
      <el-form-item>
        <el-button
          v-waves
          type="primary"
          icon="el-icon-circle-plus-outline"
          size="small"
        >添加</el-button>

        <el-button 
          v-waves 
          type="primary" 
          icon="el-icon-refresh" 
          size="small" 
          class="ml-2"
        >刷新</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      form: {
        name: null
      }
    }
  },
  methods: {
    handleCreate() {

    }
  }
}
</script>

<style lang="scss" scoped></style>
