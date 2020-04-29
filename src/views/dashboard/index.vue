<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <div>
        <span>name: {{ name }}</span>
      </div>

      <card-board>
        <div style="font-size:14px;">你写代码的样子好像蔡徐坤</div>
      </card-board>


      <card-board>
        <div>
          <el-row>
            <el-col>

            </el-col>
          </el-row>
        </div>
      </card-board>
      
      
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CardBoard from '@/components/CardBoard'
export default {
  components: {
    CardBoard
  },
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
