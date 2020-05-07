<template>
  <el-form :model="form" ref="form" label-width="80px">
    <el-form-item label="名称">
      <el-select v-model="form.phone" placeholder="请输入手机号" remote reserve-keyword :remote-method="remoteMethod"
        filterable :loading="loading">
        <el-option v-for="item in options" :key="item.uuid" :label="item.nickname" :value="item.uuid">
          <div>
            <el-image style="width:28px;height:28px;vertical-align:middle" :src='item.headimgurl'>
            </el-image>
            <span style="vertical-align:middle">{{item.nickname}}</span>
          </div>
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即添加</el-button>
      <el-button @click="onCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import {
    mapActions
  } from 'vuex';
  export default {
    data() {
      return {
        form: {
          phone: ''
        },
        options: [],
        loading: false,
        list: []
      }
    },
    mounted() {
      this.list = this.states.map(item => {
        return {
          value: `value:${item}`,
          label: `label:${item}`
        }
      })
    },
    methods: {
      onSubmit() {},
      ...mapActions('employee', ['getUserByPhone']),
      remoteMethod(query) {
        if (query !== '' && query.length == 11) {
          this.getUserByPhone(query).then(res => {
            return this.options = [res];
          })
        }
      },
      onSubmit(){
        this.$emit('onSubmitData',{unionId:this.options[0].unionId})
      },
      onCancel(){
        this.$emit('onCancel');
      }
    }
  }

</script>

<style lang="scss" scoped>
</style>
