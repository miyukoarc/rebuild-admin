<template>
  <el-button size="small" type="success" @click="showCreateTimer=!showCreateTimer">
    新建定时器
    <el-dialog title="添加定时器" :visible.sync="showCreateTimer" append-to-body>
      <div>
        <el-row>
          <el-col :span="8">name:</el-col>
          <el-col :span="16">
            <el-input v-model="addTimerForm.name" placeholder="请输入内容"></el-input>
          </el-col>
        </el-row>
        <div style="margin: 20px 0;"></div>
        <el-row>
          <el-col :span="8">code:</el-col>
          <el-col :span="16">
            <el-input v-model="addTimerForm.code" placeholder="请输入内容"></el-input>
          </el-col>
        </el-row>
        <div style="margin: 20px 0;"></div>
        <el-row>
          <el-col :span="8">关联状态:</el-col>
          <el-col :span="16">
            <el-autocomplete
              class="inline-input"
              v-model="state1"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              @select="handleSelect"
            ></el-autocomplete>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showCreateTimer = false">取 消</el-button>
        <el-button type="primary" @click="showCreateTimer = false">确 定</el-button>
      </div>
    </el-dialog>
  </el-button>
</template>

<script>
export default {
  data(){
    return {
      showCreateTimer: false,
      addTimerForm: {
        name: '',
        code: ''
      }
    }
  },
  mounted () {
    
  },
  methods:{

  }
}
</script>

<style>

</style>