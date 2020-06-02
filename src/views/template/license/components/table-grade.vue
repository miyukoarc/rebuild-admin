<template>
  <div>
    <el-container>
      <el-button size="mini" type="primary">添加等级</el-button>
    </el-container>
    <el-table
      v-loading="loading"
      :data="gradeList"
      style="width: 100%"
      row-key="uuid"
      border
      @row-click="handleDetail"
    >
      <el-table-column label="序号" width="55" type="index" align="center"></el-table-column>
      <el-table-column prop="name" label="名称" align="center"></el-table-column>
      <el-table-column prop="penalize" label="处罚" align="center"></el-table-column>
      <el-table-column prop="url" label="URL" align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      loading: state => state.licenseReason.loading,
      penalizeList: state => state.licensePenalize.penalizeList,
      gradeList: state => state.licenseGrade.gradeList,
      reasonList: state => state.licenseReason.reasonList
    })
  },
  methods: {
    handleDetail() {}
  }
}
</script>

<style>
</style>