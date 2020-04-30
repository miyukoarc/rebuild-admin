<template>
  <div>
    <!-- 事件弹框 -->
    <div v-if="mType == AddButtonFormType.ADDBUTTONEVENT">
      <el-form
        :model="addEventForm"
        ref="addEventForm"
        label-width="100px"
        label-position="left"
        :rules="rules"
      >
        <el-form-item prop="name" :label="stateSettings.name">
          <el-input v-model="addEventForm.name" placeholder></el-input>
        </el-form-item>
        <el-form-item prop="code" :label="stateSettings.code">
          <el-input v-model="addEventForm.code" placeholder></el-input>
        </el-form-item>
        <el-form-item :label="stateSettings.roles" prop="roles">
          <el-select
            v-model="addEventForm.roles"
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
        <el-form-item :label="stateSettings.description" prop="description">
          <el-input v-model="addEventForm.description" placeholder></el-input>
        </el-form-item>
        <el-form-item :label="stateSettings.target" prop="target">
          <el-select v-model="addEventForm.target" placeholder="请选择目标状态">
            <el-option
              v-for="item in currentStateList"
              :key="item.uuid"
              :label="item.name"
              :value="item.uuid"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="stateSettings.action">
          <!-- <template slot="label">
            <div class="text-align-left">{{stateSettings.action}}</div>
          </template>-->
          <!-- <el-input v-model="addEventForm.action" placeholder></el-input> -->
          <el-select v-model="addEventForm.action" placeholder="请选择执行动作">
            <el-option
              v-for="item in actionList"
              :key="item.uuid"
              :label="item.name"
              :value="item.uuid"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="stateSettings.sort">
          <!-- <template slot="label">
            <div class="text-align-left">{{stateSettings.sort}}</div>
          </template>-->
          <!-- <el-input v-model="addEventForm.sort" placeholder></el-input> -->
          <el-input-number
            size="small"
            v-model="addEventForm.sort"
            :step="10"
            :min="10"
            aria-placeholder="优先级"
          ></el-input-number>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitStateData">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 状态弹框 -->
    <div v-if="mType == AddButtonFormType.ADDBUTTONSTATE">
      <el-form
        :model="addStateForm"
        ref="addStateForm"
        label-width="120px"
        label-position="left"
        :rules="rules"
      >
        <el-form-item prop="name">
          <template slot="label">
            <div class="text-align-left">{{ stateSettings.name }}</div>
          </template>
          <el-input v-model="addStateForm.name" placeholder></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <template slot="label">
            <div class="text-align-left">{{ stateSettings.code }}</div>
          </template>
          <el-input v-model="addStateForm.code" placeholder></el-input>
        </el-form-item>
        <el-form-item prop="description">
          <template slot="label">
            <div class="text-align-left">{{ stateSettings.description }}</div>
          </template>
          <el-input v-model="addStateForm.description" placeholder></el-input>
        </el-form-item>
        <el-form-item>
          <template slot="label">
            <div class="text-align-left">{{ stateSettings.enterAction }}</div>
          </template>
          <!-- <el-input v-model="addEventForm.enterAction" placeholder></el-input> -->
          <el-select v-model="addStateForm.enterAction" placeholder="请选择执行动作">
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
          <!-- <el-input v-model="addEventForm.exitAction" placeholder></el-input> -->
          <el-select v-model="addStateForm.exitAction" placeholder="请选择执行动作">
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
          <el-select v-model="addStateForm.stateType" placeholder @change="onStateChange">
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
              <!-- <el-input v-model="addStateForm.firstTarget" placeholder></el-input> -->
              <el-select v-model="addStateForm.firstTarget" placeholder="请选择目标状态">
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
              <el-input v-model="addStateForm.firstGuardSpel" placeholder></el-input>
            </el-form-item>
            <el-form-item>
              <template slot="label">
                <div class="text-align-left">{{ stateSettings.thenTarget }}</div>
              </template>
              <el-select v-model="addStateForm.thenTarget" placeholder="请选择目标状态">
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
              <el-input v-model="addStateForm.thenGuardSpel" placeholder></el-input>
            </el-form-item>
            <el-form-item>
              <template slot="label">
                <div class="text-align-left">{{ stateSettings.lastTarget }}</div>
              </template>
              <el-select v-model="addStateForm.lastTarget" placeholder="请选择目标状态">
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
          <el-input-number size="small" v-model="addStateForm.sort" :step="10" :min="10"></el-input-number>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitStateData">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 定时器弹框 -->
    <div v-if="mType == AddButtonFormType.ADDBUTTONTIMER">
      <el-form
        :model="addTimerForm"
        ref="addTimerForm"
        label-width="100px"
        label-position="left"
        :rules="rules"
      >
        <el-form-item prop="name" :label="stateSettings.name">
          <el-input v-model="addTimerForm.name" placeholder></el-input>
        </el-form-item>
        <el-form-item prop="code" :label="stateSettings.code">
          <!-- <template slot="label">
            <div class="text-align-left">{{ stateSettings.code }}</div>
          </template>-->
          <el-input v-model="addTimerForm.code" placeholder></el-input>
        </el-form-item>
        <el-form-item prop="description" :label="stateSettings.description">
          <el-input v-model="addTimerForm.description" placeholder></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="addTimerForm.state" placeholder>
            <el-option
              v-for="item in currentStateList"
              :key="item.uuid"
              :label="item.name"
              :value="item.uuid"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          :label="stateSettings.timerInterval"
          prop="timerInterval"
          :required="!Boolean(addTimerForm.timerOnce)"
        >
          <!-- <el-input
            v-model="addEventForm.timerInterval"
            placeholder
            :disabled="
              Number(addEventForm.timerInterva) == 0 &&
                Number(addEventForm.timerOnce) != 0
            "
          ></el-input>-->
          <!-- <el-input-number
            size="small"
            v-model="addTimerForm.timerInterval"
            :step="10"
            :min="10"
            aria-placeholder="优先级"
          ></el-input-number>-->
          <!-- <el-time-select
            v-model="addTimerForm.timerInterval"
            :disabled="Boolean(addTimerForm.timerOnce)"
            :picker-options="{
              start: '00:05',
              step: '00:05',
              end: '01:00'
            }"
            placeholder="选择时间"
          >
          </el-time-select>-->
          <el-input-number
            size="small"
            v-model="addTimerForm.timerInterval"
            :step="5"
            :min="0"
            :disabled="Boolean(addTimerForm.timerOnce)"
          ></el-input-number>
        </el-form-item>
        <el-form-item
          :label="stateSettings.timerOnce"
          prop="timerOnce"
          :required="!Boolean(addTimerForm.timerInterval)"
        >
          <el-input-number
            size="small"
            v-model="addTimerForm.timerOnce"
            :step="5"
            :min="0"
            :disabled="Boolean(addTimerForm.timerInterval)"
          ></el-input-number>
        </el-form-item>
        <el-form-item>
          <template slot="label">
            <div class="text-align-left">{{ stateSettings.action }}</div>
          </template>
          <el-select v-model="addTimerForm.action" placeholder="请选择执行动作">
            <el-option
              v-for="item in actionList"
              :key="item.uuid"
              :label="item.name"
              :value="item.uuid"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitStateData">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { AddButtonFormType } from '@/utils/commonEnum'
import { mapState, mapMutations, mapActions } from 'vuex'

// const NAME = 'stateSettings'
export default {
  props: {
    mType: String,
    formData: Object,
    stateId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      AddButtonFormType,
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
      addEventFormSpare: {
        action: '', //unrequire
        code: '',
        description: '',
        // entity: "string",
        guardSpel: '', //执行条件
        name: '',
        roles: [],
        sort: 10,
        target: null, //跳转目标状态
        terminal: 'ORG' //可执行终端
      },
      addStateFormSpare: {
        code: '',
        description: '',
        enterAction: '',
        // "entity": "string",
        exitAction: '',
        firstGuardSpel: '',
        firstTarget: null,
        lastTarget: null,
        name: '',
        sort: 10,
        stateType: 'COMMON', //require
        thenGuardSpel: '',
        thenTarget: null
      },
      addTimerFormSpare: {
        action: '', // 必填
        code: '', // requir
        description: '',
        // "entity": "string",
        name: '',
        state: 0, //从状态传过来的
        timerInterval: 0, //互斥  循环执行 s  require
        timerOnce: 0 //一次执行 s
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
    ...mapState('stateSettings', [
      'roleList',
      'stateList',
      'actionList',
      'currentStateList'
    ]),

    addEventForm() {
      if (this.formData) {
        if (this.stateId) this.formData.target = this.stateId
        let roles = this.formData.roles
        if (roles && roles.length > 0 && roles[0] instanceof Object) {
          roles = roles.map(e => {
            return e.uuid
          })
          this.formData.roles = roles
          this.formData.target = this.formData.target.uuid
        } else if (!(roles instanceof Array)) {
          this.formData.roles = []
        }
        return this.formData
      }
      if (this.stateId) this.addEventFormSpare.target = this.stateId
      return this.addEventFormSpare
    },
    addStateForm() {
      if (this.formData) {
        return this.formData
      }
      return this.addStateFormSpare
    },
    addTimerForm() {
      if (this.formData) {
        if (this.stateId) this.formData.state = this.stateId
        return this.formData
      }
      if (this.stateId) this.addTimerFormSpare.state = this.stateId
      return this.addTimerFormSpare
    }
  },
  mounted() {},
  methods: {
    ...mapActions('stateSettings', ['getStateList']),
    onStateChange() {
      if ('CHOICE' == this.addStateForm.stateType) {
        this.showThenAction = true
      } else {
        this.showThenAction = false
      }
    },
    submitStateData() {
      if (this.mType == AddButtonFormType.ADDBUTTONEVENT) {
        this.$refs['addEventForm'].validate(valid => {
          valid && this.$emit('submitStateData', this.addEventForm)
        })
      } else if (this.mType == AddButtonFormType.ADDBUTTONSTATE) {
        this.$refs['addStateForm'].validate(valid => {
          valid && this.$emit('submitStateData', this.addStateForm)
        })
      } else if (this.mType == AddButtonFormType.ADDBUTTONTIMER) {
        this.$refs['addTimerForm'].validate(valid => {
          // console.log(valid);
          if (this.addTimerForm.timerInterval == 0) {
            delete this.addTimerForm.timerInterval
          }
          valid && this.$emit('submitStateData', this.addTimerForm)
        })
      }
    },
    onChange() {}
  }
}
</script>

<style lang="scss">
@import '@/styles/base.scss';
label > div {
  display: inline-block;
}
</style>
