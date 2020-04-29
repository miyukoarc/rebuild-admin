<template>
  <el-card class="card">
      
      <div>
          <div class="title-text">
              <span>{{title}}</span>
          </div>
          <hr>
          <div>
              <slot />
          </div>
          <div class="foot-btn">
              <el-button type="text">转发</el-button>
              <el-button type="text">详细</el-button>
          </div>
      </div>
  </el-card>
</template>

<script>
export default {
    props: ['title'],
    data(){
        return {
            // title: '标题',

        }
    }
}
</script>

<style lang="scss" scoped>
.card {
    width: 400px;
    .title-text{
        font-size: 16px;
        font-weight: 700;
    }
    .foot-btn{
        text-align: right;
    }
}
</style>