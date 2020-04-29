<template>
  <card-board :title="'部门'">
      <div>
          <el-row>
              <el-col :span="12">部门:</el-col>
              <el-col :span="12">法务部</el-col>
          </el-row>
          <el-row>
              <el-col :span="12">主管:</el-col>
              <el-col :span="12">无名</el-col>
          </el-row>
      </div>
  </card-board>
</template>

<script>
import CardBoard from '@/components/CardBoard'
export default {
    components: {
        CardBoard
    },
    data(){
        return {

        }
    }
}
</script>

<style>

</style>