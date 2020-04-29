<template>
  <el-button size="small" type="primary" @click="showCreateState=!showCreateState">
    新建状态
    <el-dialog title="新建" :visible.sync="showCreateState" append-to-body>
      <div>
        <el-row>
          <el-col :span="8">
            <div>名称</div>
            <div style="margin: 20px 0;"></div>

          </el-col>
          <el-col :span="16">
            <el-input v-model="createStateForm.name" placeholder="请输入内容"></el-input>
            <div style="margin: 20px 0;"></div>
            
          </el-col>
        </el-row>
             <div>ID</div>
            <div style="margin: 20px 0;"></div>
            <div>描述</div>
            <div style="margin: 20px 0;"></div>
            <div>执行函数</div>
            <div style="margin: 20px 0;"></div>
            <div>退出函数</div>
            <div style="margin: 20px 0;"></div>
            <div>实体对象</div>
            <div style="margin: 20px 0;"></div>
            <div>主约束条件</div>
            <div style="margin: 20px 0;"></div>
            <div>次约束条件</div>
            <div style="margin: 20px 0;"></div>
            <div>状态类型</div>

            <el-input v-model="createStateForm.code" placeholder="请输入内容"></el-input>
            <div style="margin: 20px 0;"></div>
            <el-input v-model="createStateForm.enterAction" placeholder="请输入内容"></el-input>
            <div style="margin: 20px 0;"></div>
            <el-input v-model="createStateForm.exitAction" placeholder="请输入内容"></el-input>
            <div style="margin: 20px 0;"></div>
            <el-input v-model="createStateForm.entity" placeholder="请输入内容"></el-input>
            <div style="margin: 20px 0;"></div>
            <el-input v-model="createStateForm.firstGuardSpel" placeholder="请输入内容"></el-input>
            <div style="margin: 20px 0;"></div>
            <el-input v-model="createStateForm.thenGuardSpel" placeholder="请输入内容"></el-input>
            <div style="margin: 20px 0;"></div>
            <el-input v-model="createStateForm.stateType" placeholder="请输入内容"></el-input>
            <div style="margin: 20px 0;"></div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showCreateState = false">取 消</el-button>
        <el-button type="primary" @click="showCreateState = false">确 定</el-button>
      </div>
    </el-dialog>
  </el-button>
</template>

<script>
export default {
  data() {
    return {
      showCreateState: false,
      createStateForm: {
        name: 'string',
        code: 'string',
        description: 'string',
        enterAction: 'string',
        exitAction: 'string',
        entity: 'string',
        firstGuardSpel: 'string',
        stateType: 'COMMON',
        thenGuardSpel: 'string',
        sort: 0,
        thenTarget: 0,
        firstTarget: 0,
        lastTarget: 0,
      }
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style>
</style>