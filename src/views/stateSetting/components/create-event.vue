<template>
  <el-button size="small" type="danger" @click="showCreateEvent=!showCreateState">
    新建事件
    <el-dialog title="新建事件" :visible.sync="showCreateEvent" append-to-body>
      <div>
        <el-row>
          <el-col :span="8">
            <div>name:</div>
            <div style="margin: 20px 0;"></div>
            <div>code:</div>
          </el-col>
          <el-col :span="16">
            <el-input v-model="createEventForm.name" placeholder="请输入内容"></el-input>
            <div style="margin: 20px 0;"></div>
            <el-input v-model="createEventForm.code" placeholder="请输入内容"></el-input>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showCreateEvent = false">取 消</el-button>
        <el-button type="primary" @click="showCreateEvent = false">确 定</el-button>
      </div>
    </el-dialog>
  </el-button>
</template>

<script>
export default {
  data(){
    return {
      showCreateEvent: false,
      createEventForm: {
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