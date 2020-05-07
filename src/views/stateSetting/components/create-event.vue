<template>
  <div>
    <el-form :model="form" ref="form" label-width="100px" label-position="left" :rules="rules">
      <el-form-item prop="name" :label="stateSettings.name">
        <el-input v-model="form.name" placeholder></el-input>
      </el-form-item>
      <el-form-item prop="code" :label="stateSettings.code">
        <el-input v-model="form.code" placeholder></el-input>
      </el-form-item>
      <el-form-item :label="stateSettings.roles" prop="roles">
        <el-select
          v-model="form.roles"
          placeholder="请选择角色"
          multiple
          collapse-tags
          @change="onChange"
        >
          <el-option
            v-for="item in roleList"
            :key="item.uuid"
            :label="item.name"
            :value="item.uuid"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="stateSettings.target" prop="target">
        <el-select v-model="form.target" placeholder="请选择目标状态">
          <el-option
            v-for="item in currentStateList"
            :key="item.uuid"
            :label="item.name"
            :value="item.uuid"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="stateSettings.description">
        <el-input v-model="form.description" placeholder></el-input>
      </el-form-item>

      <el-form-item :label="stateSettings.action">
        <el-select v-model="form.action" placeholder="请选择执行动作">
          <el-option
            v-for="item in actionList"
            :key="item.uuid"
            :label="item.name"
            :value="item.uuid"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="stateSettings.sort">
        <el-input-number
          size="small"
          v-model="form.sort"
          :step="10"
          :min="10"
          aria-placeholder="优先级"
        ></el-input-number>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
        <el-button type="danger" @click="handleCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      stateSettings: {
        name: '名称',
        code: 'Code',
        description: '功能描述',
        guardSpel: '执行条件',
        roles: '可执行角色',
        sort: '排序',
        target: '跳转状态',
        terminal: '可执行终端',
        enterAction: '进入执行',
        exitAction: '退出执行',
        firstGuardSpel: '第一执行条件',
        firstTarget: '第一目标',
        lastTarget: '最终目标',
        stateType: '状态类型',
        thenGuardSpel: '第二执行条件',
        thenTarget: '第二目标',
        timerInterval: '周期定时器',
        timerOnce: '延时定时器',
        action: '执行动作',
        COMMON: '通用状态',
        BEGIN: '启动状态',
        END: '结束状态',
        CHOICE: '分支状态',
        ORG: '企业端',
        USER: '用户端',
        timer: '定时器(S)'
      },
      form: {
        action: '', //unrequire
        code: '',
        description: '',
        entity: 'string',
        guardSpel: '', //执行条件
        name: '',
        roles: [],
        sort: 10,
        target: null, //跳转目标状态
        terminal: 'ORG' //可执行终端
      },
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        code: [{ required: true, message: '请输入CODE', trigger: 'blur' }],
        roles: [{ required: true, message: '请选择角色', trigger: 'blur' }],
        description: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ],
        target: [
          { required: true, message: '请选择目标状态', trigger: 'blur' }
        ],
        stateType: [
          { required: true, message: '请选择状态类型', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      actionList: state => state.stateSettings.actionList,
      roleList: state => state.stateSettings.roleList,
      currentStateList: state => state.stateSettings.currentStateList,
      currentEntity: state => state.stateSettings.currentEntity
    })
  },
  mounted() {
    this.form.entity = this.currentEntity
  },
  methods: {
    onChange() {},
    handleConfirm() {
      this.$refs['form'].validate(valid => {
        valid &&
          this.$store
            .dispatch('stateSettings/addEvent', this.form)
            .then(() => {
              this.$parent.$parent.dialogVisible = false
              this.$message({
                type: 'sucess',
                message: '操作成功'
              })
            })
            .catch(err => {
              this.$message({
                type: 'error',
                message: err
              })
            })
      })
    },
    handleCancel() {
      this.$parent.$parent.dialogVisible = false
    }
  }
}
</script>

<style>
</style>