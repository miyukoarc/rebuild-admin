<template>
  <div>
    <el-container class="mb-3">
      <el-button size="mini" type="primary" @click="handleCreate">添加等级</el-button>
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
      <el-table-column prop="colour" label="颜色分类" align="center"></el-table-column>
      <el-table-column label="积分区间" align="center">
        <template v-slot="scope">
          <div>
            <span>{{scope.row.gradeBeginScore}}~</span>
            <span>{{scope.row.gradeEndScore}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="gradeExplanation" label="等级说明" align="center"></el-table-column>
      <el-table-column label="关联证照" align="center">
        <template v-slot="scope">
          <div>
            <span>{{scope.row.licenseTemplate.name}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="默认使用" align="center">
        <template v-slot="scope">
          <div>
            <span>{{scope.row.useByDefault?'是':'否'}}</span>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column label="限制违章次数(重/中/轻)" align="center">
        <template v-slot="scope">
            <div>
                <span>{{scope.row.severeCount}}·</span>
                <span>{{scope.row.moderateCount}}·</span>
                <span>{{scope.row.mildCount}}</span>            
            </div>
        </template>
      </el-table-column> -->
      <el-table-column label="操作" align="center">
        <template v-slot="scope">
          <el-button size="mini" type="text" @click.stop="handleEdit(scope.row)">编辑</el-button>
          <el-button class="ml-0" size="mini" type="text" @click.stop="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <detail-dialog ref="detailDialog"></detail-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DetailDialog from './detail-dialog'
export default {
  components: {
    DetailDialog
  },
  computed: {
    ...mapState({
      loading: state => state.licenseReason.loading,
      penalizeList: state => state.licensePenalize.penalizeList,
      gradeList: state => state.licenseGrade.gradeList,
      reasonList: state => state.licenseReason.reasonList,
      userInfo: state => state.user.userInfo,
      currentLicense: state =>state.licenseTemplate.currentLicense
    })
  },
  methods: {
    handleCreate() {
      //   this.$bus.$emit('showFormDialog',{type: 'Create',state: true})
      this.$refs['detailDialog'].event = 'GradeCreate'
      this.$refs['detailDialog'].eventType = 'create'
      this.$refs['detailDialog'].dialogVisible = true
    },
    handleDetail() {},
    handleEdit(val) {
      console.log(val)
      this.$store.commit('licenseGrade/SAVE_DETAIL', val)
      this.$refs['detailDialog'].event = 'GradeEdit'
      this.$refs['detailDialog'].eventType = 'edit'
      this.$refs['detailDialog'].dialogVisible = true
      this.$bus.$emit('transferCurrentGrade', val)
    },
    handleDelete(val) {
      console.log(val)
      const payload = val.uuid
      this.$confirm('是否删除当前模板', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$store
            .dispatch('licenseGrade/deleteGrade', payload)
            .then(async () => {
              await this.initDataList()
              this.$message({
                type: 'success',
                message: '操作成功'
              })
            })
            .catch(err => {
              this.$message({
                type: 'error',
                message: err.message
              })
            })
        })
        .catch(err => {
          console.log(err)
        })
    },
    initDataList() {
      this.$store
        .dispatch('licenseGrade/getGradeList', this.currentLicense.uuid)
        .then(() => {
          console.log('1')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>
</style>