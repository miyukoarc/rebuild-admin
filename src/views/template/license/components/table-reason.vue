<template>
  <div>
    <el-container class="mb-3">
      <el-button size="mini" type="primary" @click="handleCreate">添加规则</el-button>
    </el-container>
    <el-table
      v-loading="loading" 
      :data="reasonList"
      style="width: 100%"
      row-key="uuid"
      border
      @row-click="handleDetail"
    >
      <el-table-column label="序号" width="55" type="index" align="center"></el-table-column>
      <el-table-column label="名称" prop="name" align="center"></el-table-column>      
      <el-table-column label="违章类型" align="center">
          <template v-slot="scope">
              <div>
                  <span>{{reasonClassifyName(scope.row.reasonClassify)}}</span>
              </div>
          </template>
          </el-table-column>      
      <el-table-column label="违章扣分" prop="licenseReasonScore" align="center"></el-table-column>      
      <el-table-column label="操作" align="center">
        <template v-slot="scope">
          <el-button size="mini" type="text" @click.stop="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="text" @click.stop="handleDelete(scope.row)">删除</el-button>
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
  data(){
      return {
          reasonClassifyMap: {
              'SEVERE': '重度',
              'MODERATE': '中度',
              'MILD': '轻度'
          }
      }
  },
  computed: {
    ...mapState({
      loading: state => state.licenseReason.loading,
      penalizeList: state => state.licensePenalize.penalizeList,
      gradeList: state => state.licenseGrade.gradeList,
      reasonList: state => state.licenseReason.reasonList,
      currentLicense: state => state.licenseTemplate.currentLicense
    }),
    
  },
  methods: {
    reasonClassifyName(key){
        return this.reasonClassifyMap[key]+''
    },
    handleCreate() {
      this.$refs['detailDialog'].event = 'ReasonCreate'
      this.$refs['detailDialog'].eventType = 'create'
      this.$refs['detailDialog'].dialogVisible = true
    },
    handleDetail() {},
    handleEdit(val) {
      this.$store.commit('licenseReason/SAVE_DETAIL', val)
      this.$refs['detailDialog'].event = 'ReasonEdit'
      this.$refs['detailDialog'].eventType = 'edit'
      this.$refs['detailDialog'].dialogVisible = true
      this.$bus.$emit('transferCurrentReason', val)
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
            .dispatch('licenseReason/deleteReason', payload)
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
                message: err.message||'错误'
              })
            })
        })
        .catch(err => {
          console.log(err)
        })
    },
    initDataList() {
      this.$store
        .dispatch('licenseReason/getReasonList', this.currentLicense.uuid)
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