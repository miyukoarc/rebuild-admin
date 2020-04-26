<template>
  <el-form :model="form" ref="form" label-width="80px">
    <el-form-item label="成员">
      <el-tag type="info" v-for="(item, index) in userList" :key="index" @close="handleClose(item)" :closable='true' class="ml-2">
        {{item.nickname}}
      </el-tag>
    </el-form-item>
    <el-form-item label="部门">
        <el-select v-model="form.departmentId" placeholder="请选择部门">
            <el-option v-for="item in departList"
                :key="item.uuid"
                :label="item.name"
                :value="item.uuid">
            </el-option>
        </el-select>
    </el-form-item>
    <el-form-item >
        <el-button type="primary" @click="onSubmit">确定</el-button>
          <el-button  @click="onCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {mapState} from 'vuex';
  export default {
    props: {
        userList: Array
    },
    data() {
      return {
        form: {
          departmentId:''
        }
      }
    },
    computed: {
        ...mapState('department',['departList'])
    },
    methods: {
      handleClose(tag) {
        if (this.userList.length < 2) {
            this.$message({
                type:'error',
                message:'至少保留一个成员！'
            });
            return;
        }
        this.userList.splice(this.userList.indexOf(tag), 1);
        this.$emit('handleDelete',tag);
      },
      onSubmit(){
          this.$emit('onSubmitData',[this.form,this.userList]);
      },
      onCancel(){
          this.$emit('onCancel');
      }
    },
  }

</script>

<style lang="scss" scoped>

</style>
