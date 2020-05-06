<template>
  <el-card class="card" :body-style="{ padding: '0px' }">
      
      <div>
          <slot/>
      </div>
      
  </el-card>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.card {
    // width: 400px;
    .title-text{
        font-size: 16px;
        font-weight: 700;
    }
    .foot-btn{
        text-align: right;
    }
}
</style>