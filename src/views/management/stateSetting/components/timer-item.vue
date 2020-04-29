<template>
  <!-- <el-collapse v-model="state">
    <el-collapse-item :title="name" name="1">
      <el-row v-for="(item,index) in formList" :key="index">
        <el-col :span="12">{{stateSettings.${item[0]}}}</el-col>
        <el-col :span="12">{{item[1]}}</el-col>
      </el-row>
      <el-row class="text-align-right">
          <el-button v-if="btn" size="mini" type="danger">删除</el-button>
      </el-row>
    </el-collapse-item>
  </el-collapse> -->
  <div class="container">
      <div class="title">{{name}}</div>
      <div class="property-item" v-for="(item,index) in formList" :key="index">
          <span>{{item[0]}}</span>
          <hr>
          <span>{{item[1]}}</span>
      </div>
  </div>
</template>

<script>
export default {
  props: {
      name: {
          type: String,
          default: ""
      },
      btn:{
          type: Boolean,
          default: true
      }
  },
  data() {
    return {
      state: ['1'],
      form: {
        action: 'string',
        code: 'string',
        description: 'string',
        name: 'string',
        source: 0,
        timerInterval: 0,
        timerOnce: 0
      },
      formList: []
    }
  },
  mounted() {
    this.formList = Object.entries(this.form)
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
@import '@/styles/base.scss';
.container{
    display: flex;
}
.title{
    padding: 10px;
    border-right:1px solid #e9e9e9 ;

}

.property-item{
    padding: 10px;
    flex: 1;
    border-right:1px solid #e9e9e9 ;
}
</style>