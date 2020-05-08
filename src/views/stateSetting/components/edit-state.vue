<template>
  <div>
    <el-form :model="form" ref="form" label-width="120px" label-position="left" :rules="rules">
      <el-form-item prop="name">
        <template slot="label">
          <div class="text-align-left">{{ stateSettings.name }}</div>
        </template>
        <el-input v-model="form.name" placeholder></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <template slot="label">
          <div class="text-align-left">{{ stateSettings.code }}</div>
        </template>
        <el-input v-model="form.code" placeholder></el-input>
      </el-form-item>
      <el-form-item prop="description">
        <template slot="label">
          <div class="text-align-left">{{ stateSettings.description }}</div>
        </template>
        <el-input v-model="form.description" placeholder></el-input>
      </el-form-item>
      <el-form-item>
        <template slot="label">
          <div class="text-align-left">{{ stateSettings.enterAction }}</div>
        </template>
        <el-select v-model="form.enterAction" placeholder="请选择执行动作">
          <el-option
            v-for="item in actionList"
            :key="item.uuid"
            :label="item.name"
            :value="item.uuid"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <template slot="label">
          <div class="text-align-left">{{ stateSettings.exitAction }}</div>
        </template>
        <el-select v-model="form.exitAction" placeholder="请选择执行动作">
          <el-option
            v-for="item in actionList"
            :key="item.uuid"
            :label="item.name"
            :value="item.uuid"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="stateType">
        <template slot="label">
          <div class="text-align-left">{{ stateSettings.stateType }}</div>
        </template>
        <el-select v-model="form.stateType" placeholder @change="onStateChange">
          <el-option
            v-for="item in stateTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-collapse-transition name="slide-down">
        <div v-show="showThenAction">
          <el-form-item>
            <template slot="label">
              <div class="text-align-left">{{ stateSettings.firstTarget }}</div>
            </template>
            <!-- <el-input v-model="form.firstTarget" placeholder></el-input> -->
            <el-select v-model="form.firstTarget" placeholder="请选择目标状态">
              <el-option
                v-for="item in currentStateList"
                :key="item.uuid"
                :label="item.name"
                :value="item.uuid"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <template slot="label">
              <div class="text-align-left">{{ stateSettings.firstGuardSpel }}</div>
            </template>
            <el-input v-model="form.firstGuardSpel" placeholder></el-input>
          </el-form-item>
          <el-form-item>
            <template slot="label">
              <div class="text-align-left">{{ stateSettings.thenTarget }}</div>
            </template>
            <el-select v-model="form.thenTarget" placeholder="请选择目标状态">
              <el-option
                v-for="item in currentStateList"
                :key="item.uuid"
                :label="item.name"
                :value="item.uuid"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <template slot="label">
              <div class="text-align-left">{{ stateSettings.thenGuardSpel }}</div>
            </template>
            <el-input v-model="form.thenGuardSpel" placeholder></el-input>
          </el-form-item>
          <el-form-item>
            <template slot="label">
              <div class="text-align-left">{{ stateSettings.lastTarget }}</div>
            </template>
            <el-select v-model="form.lastTarget" placeholder="请选择目标状态">
              <el-option
                v-for="item in currentStateList"
                :key="item.uuid"
                :label="item.name"
                :value="item.uuid"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-collapse-transition>

      <el-form-item :label="stateSettings.sort">
        <!-- <template slot="label">
            <div class="text-align-left">{{stateSettings.sort}}</div>
        </template>-->
        <el-input-number size="small" v-model="form.sort" :step="10" :min="10"></el-input-number>
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
      showThenAction: false,
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
        code: '',
        description: '',
        enterAction: '',
        entity: "string",
        exitAction: '',
        firstGuardSpel: '',
        firstTarget: null,
        lastTarget: null,
        name: '',
        sort: 10,
        stateType: 'COMMON', //require
        thenGuardSpel: '',
        thenTarget: null,
        uuid: ''
      },
      stateTypeList: [
        {
          label: '通用状态',
          value: 'COMMON'
        },
        {
          label: '启动状态',
          value: 'BEGIN'
        },
        {
          label: '结束状态',
          value: 'END'
        },
        {
          label: '分支状态',
          value: 'CHOICE'
        }
      ],
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
      currentStateList: state => state.stateSettings.currentStateList,
      currentState:state => state.stateSettings.currentState
    })
  },
  mounted() {},
  methods: {
    initData(){
        this.form.code = this.currentState?.code
        this.form.description = this.currentState?.description
        this.form.enterAction = this.currentState?.enterAction
        this.form.entity = this.currentState?.entity
        this.form.exitAction = this.currentState?.exitAction
        this.form.firstGuardSpel = this.currentState?.firstGuardSpel
        this.form.firstTarget = this.currentState?.firstTarget
        this.form.lastTarget = this.currentState?.lastTarget
        this.form.name = this.currentState?.name
        this.form.sort = this.currentState?.sort
        this.form.stateType = this.currentState?.stateType
        this.form.thenGuardSpel = this.currentState?.thenGuardSpel
        this.form.thenTarget = this.currentState?.thenTarget
        this.form.uuid = this.currentState?.uuid
    },
    onStateChange() {
      if ('CHOICE' == this.form.stateType) {
        this.showThenAction = true
      } else {
        this.showThenAction = false
      }
    },
    handleConfirm() {
      this.$refs['form'].validate(valid => {
        valid&&this.$store
          .dispatch('stateSettings/updateState', this.form)
          .then(() => {
            this.$parent.$parent.dialogVisible = false
            this.$message({
              type: 'sucess',
              message: '操作成功'
            })
            this.$parent.$parent.dialogVisible = false
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