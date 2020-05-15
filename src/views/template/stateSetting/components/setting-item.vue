<template>
  <div class="state-container">
    <div style="text-align:center;margin-bottom:10px;">
      <el-button type="danger">{{context.name}}</el-button>
    </div>

    <el-dropdown type="primary" split-button @command="handleClick" trigger="click">
      事件
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          icon="el-icon-circle-plus"
          :command="item"
          v-for="(item, index) in eventList"
          :key="index"
        >{{item.name}}</el-dropdown-item>
        <el-dropdown-item icon="el-icon-circle-plus-outline" :command="'add'">关联事件</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-dropdown type="success" @command="handleTimer" trigger="click">
      <el-button type="success">
        定时器
        <i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          icon="el-icon-circle-plus"
          :command="item"
          v-for="(item,index) in context.timer"
          :key="index"
        >{{item.name}}</el-dropdown-item>
        <el-dropdown-item icon="el-icon-circle-plus-outline" :command="'add'">新建定时器</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-dialog
      append-to-body
      :close-on-click-modal="false"
      title="event"
      :visible.sync="showEventDialog"
    >
      <div>
        <p>name:{{currentEvent.name}}</p>
        <p>code:{{currentEvent.code}}</p>
        <div>
          作用实体:
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="showEventDialog = false" title="解除关联">删除</el-button>
        <el-button type="primary" @click="showEventDialog = false">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog
      append-to-body
      :close-on-click-modal="false"
      title="定时器"
      :visible.sync="showTimerDialog"
      
    >
      <div>
        <p>name:{{currentTimer.name}}</p>
        <p>code:{{currentTimer.code}}</p>
      </div>

      <div slot="footer">
        <el-button @click="showTimerDialog = false">删除</el-button>
        <el-button type="primary" @click="showTimerDialog = false">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog
      append-to-body
      :close-on-click-modal="false"
      title="event"
      :visible.sync="showAddEventDialog"
    >
      <div>
        <el-button :focus="isCreateEvent" @click="isCreateEvent=true">新建</el-button>
        <el-button @click="isCreateEvent=false">已有</el-button>
      </div>

      <br />

      <transition>
        <div v-if="!isCreateEvent">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="(item,index) in events"
              :key="index"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </div>
        <div v-else>
          <p>
            name:
            <el-input v-model="createEventForm.name"></el-input>
          </p>
          <p>
            code:
            <el-input v-model="createEventForm.code"></el-input>
          </p>
        </div>
      </transition>

      <div slot="footer">
        <el-button @click="showAddEventDialog = false">确定</el-button>
        <el-button @click="showAddEventDialog = false">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog
      append-to-body
      :close-on-click-modal="false"
      title="event"
      :visible.sync="showTimerDialog"
    >
      <div>
        <p>name:{{currentTimer.name}}</p>
        <p>code:{{currentTimer.code}}</p>
      </div>

      <div slot="footer">
        <el-button @click="showTimerDialog = false">删除</el-button>
        <el-button type="primary" @click="showTimerDialog = false">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog
      append-to-body
      :close-on-click-modal="false"
      title="Timer"
      :visible.sync="showAddTimerDialog"
    >


      <br />

        <div>
          <p>
            name:
            <el-input v-model="createTimerForm.name"></el-input>
          </p>
          <p>
            code:
            <el-input v-model="createTimerForm.code"></el-input>
          </p>
        </div>


      <div slot="footer">
        <el-button @click="handleCreateForm">确定</el-button>
        <el-button @click="showAddTimerDialog = false">取消</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
import { isString } from '../../../utils/validate'
import { mapState } from 'vuex'
export default {
  props: ['context'],
  data() {
    return {
      createEventForm: {
        name: '',
        code: ''
      },

      createTimerForm: {
        name: '',
        code: ''
      },

      isCreateEvent: false,
      isCreateTimer: false,
      
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: '',
      showEventDialog: false,
      showAddEventDialog: false,
      showTimerDialog: false,
      showAddTimerDialog: false,
      currentEvent: {},
      currentTimer: {}
    }
  },
  computed: {
    ...mapState({
      events: state => state.stateSettings.events,
    }),
    eventList() {
      return this.context.event
    }
  },
  methods: {
    handleCreateForm(){
        
    },
    handleTimer(command) {
      if (isString(command)) {
        this.showAddTimerDialog = true
      } else {
        this.currentTimer = command
        this.showTimerDialog = true
      }
    },
    handleClick(command) {
      if (isString(command)) {
        this.showAddEventDialog = true
      } else {
        this.currentEvent = command
        this.showEventDialog = true
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.state-container {
  border: 2px solid #1890ff;
  border-radius: 4px;
  padding: 10px;
  margin-right: 20px;
}
</style>