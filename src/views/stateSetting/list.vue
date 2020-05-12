<template>
  <div class="statesetting-container pb-5" v-loading.body.lock="loading">
    <div class="add-btn-container">
      <div style="display:flex;justify-content:space-between;">
        <div style="display:inline-block;margin: auto auto 0 0;">
          <el-button
            type="primary"
            size="small"
            @click="handleAction(action='CreateState')"
            inline
          >添加状态</el-button>
          <el-button
            type="primary"
            size="small"
            @click="handleAction(action='CreateEvent',)"
            inline
          >添加孤立事件</el-button>
          <el-button type="primary" size="small" @click="updateCacheData" inline>更新缓存</el-button>
        </div>

        <div>
          <actions-list></actions-list>
          <eventList @editStateData="editStateData" :eventTitle="'已使用事件'" :dataList="usedEvents"></eventList>
          <eventList @editStateData="editStateData" :eventTitle="'未使用事件'" :dataList="unusedEvents"></eventList>
        </div>
      </div>
    </div>
    <edit-dialog ref="editDialog" />

    <div ref="stateSettingContent">
      <div>
        <el-row
          style
          class="state-container"
          v-for="(item, index) in currentStateList"
          :key="index"
        >
          <el-col :span="4" style class="state-container-left" ref="stateLeft">
            <el-row>
              <el-col :span="14">
                <h3 :id="item.code" class="text-align-left">
                  <svg-icon icon-class="state"></svg-icon>
                  <span class="ml-1">{{ item.name }}</span>
                </h3>
              </el-col>
              <el-col :span="10" class="text-align-right" style="margin:1.2em 0">
                <i class="el-icon-edit click-cursor mr-1" @click="handleAction(action='EditState',payload=item)"></i>
                <StateSettingAddButton
                  labelText="添加事件"
                  :mType="AddButtonFormType.ADDBUTTONEVENT"
                  inline
                  @submitStateData="submitStateData"
                  :loading="subloading"
                  :stateId="item.uuid"
                  ref="stateAddEvent"
                  width="300px"
                >
                  <template v-slot:customBtn>
                    <!-- <i class="el-icon-camera-solid click-cursor" style="font-size:1.1em"></i> -->
                    <svg-icon icon-class="addEvent" class="click-cursor common-icon"></svg-icon>
                    <!-- <el-button type="success" size="mini">添加</el-button> -->
                  </template>
                  <template v-slot:body>
                    <el-select v-model="eventId" placeholder>
                      <el-option
                        v-for="item in eventList"
                        :key="item.uuid"
                        :label="item.name"
                        :value="item.uuid"
                      >
                        <span style="float: left">{{ item.name }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">
                          <el-tooltip
                            class="item"
                            effect="dark"
                            :content="item.isUse ? '已使用' : '未使用'"
                          >
                            <div
                              :class="
                                item.isUse ? 'isUseBall-use' : 'isUseBall-unUse'
                              "
                            ></div>
                          </el-tooltip>
                        </span>
                      </el-option>
                    </el-select>
                    <el-button type="primary" @click="onSubEventByState(item.uuid, index)">确定</el-button>
                  </template>
                </StateSettingAddButton>

                <!-- <el-button
                  size="mini"
                  type="success"
                  
                ></el-button>-->
                <!-- <i
                  class="el-icon-s-help click-cursor"
                  style="font-size:1.1em"
                  @click="handleAction(action='CreateTimer',payload=item.uuid)"
                ></i>-->
                <svg-icon
                  icon-class="addTimer"
                  style="height:1.1em;width:1.1em"
                  class="click-cursor ml-1"
                  @click="handleAction(action='CreateTimer',payload=item.uuid)"
                ></svg-icon>

                <!-- <StateSettingAddButton
                  labelText="添加定时器"
                  :mType="AddButtonFormType.ADDBUTTONTIMER"
                  inline
                  type="danger"
                  @submitStateData="submitStateData"
                  :loading="subloading"
                  :stateId="item.uuid"
                >
                  <template v-slot:customBtn>
                    <i class="el-icon-plus" style="font-size:1.17em"></i>
                  </template>
                </StateSettingAddButton>-->
              </el-col>
            </el-row>
            <el-row
              v-if="item.exitAction"
              class="property-item"
              type="flex"
              align="middle"
              justify="space-between"
            >
              <el-col :span="12" class="text-align-left">
                <span>{{ stateSettings.exitAction }}</span>
              </el-col>

              <el-col :span="12" class="text-align-right">
                <span>{{ item.exitAction }}</span>
              </el-col>
            </el-row>

            <el-row
              v-if="item.enterAction"
              class="property-item"
              type="flex"
              align="middle"
              justify="space-between"
            >
              <el-col :span="12" class="text-align-left">
                <span>{{ stateSettings.enterAction }}</span>
              </el-col>

              <el-col :span="12" class="text-align-right">
                <span>{{ item.enterAction }}</span>
              </el-col>
            </el-row>

            <el-row class="property-item" type="flex" align="middle" justify="space-between">
              <el-col :span="12" class="text-align-left">
                <span>{{ stateSettings.stateType }}</span>
              </el-col>

              <el-col :span="12" class="text-align-right">
                <StateTag>
                  <span v-if="item.stateType=='BEGIN'">启动状态</span>
                  <span v-else-if="item.stateType=='END'">结束状态</span>
                  <span v-else-if="item.stateType=='CHOICE'">分支状态</span>
                  <span v-else>通用状态</span>
                </StateTag>
              </el-col>
            </el-row>

            <el-row class="property-item" type="flex" align="middle" justify="space-between">
              <el-col :span="12" class="text-align-left">
                <span>{{ stateSettings.code }}</span>
              </el-col>

              <el-col :span="12" class="text-align-right">
                <span>{{ item.code }}</span>
              </el-col>
            </el-row>

            <el-row
              v-if="item.description"
              class="property-item"
              type="flex"
              align="middle"
              justify="space-between"
            >
              <el-col :span="12" class="text-align-left">
                <span>{{ stateSettings.description }}</span>
              </el-col>

              <el-col :span="12" class="text-align-right">
                <span>{{ item.description }}</span>
              </el-col>
            </el-row>

            <el-row
              v-if="item.stateType == 'CHOICE'"
              class="property-item"
              type="flex"
              align="middle"
              justify="space-between"
            >
              <el-col :span="12" class="text-align-left">
                <span>{{ stateSettings.firstTarget }}</span>
              </el-col>

              <el-col :span="12" class="text-align-right">
                <StateTag>
                  <span>{{ item.firstTarget.name }}</span>
                </StateTag>
              </el-col>
            </el-row>

            <el-row
              v-if="item.stateType == 'CHOICE'"
              class="property-item"
              type="flex"
              align="middle"
              justify="space-between"
            >
              <el-col :span="12" class="text-align-left">
                <span>{{ stateSettings.firstGuardSpel }}</span>
              </el-col>

              <el-col :span="12" class="text-align-right">
                <span>{{ item.firstGuardSpel }}</span>
              </el-col>
            </el-row>

            <el-row
              v-if="item.stateType == 'CHOICE'"
              class="property-item"
              type="flex"
              align="middle"
              justify="space-between"
            >
              <el-col :span="12" class="text-align-left">
                <span>{{ stateSettings.thenTarget }}</span>
              </el-col>

              <el-col :span="12" class="text-align-right">
                <StateTag>
                  <span>{{ item.thenTarget.name }}</span>
                </StateTag>
              </el-col>
            </el-row>

            <el-row
              v-if="item.stateType == 'CHOICE'"
              class="property-item"
              type="flex"
              align="middle"
              justify="space-between"
            >
              <el-col :span="12" class="text-align-left">
                <span>{{ stateSettings.thenGuardSpel }}</span>
              </el-col>

              <el-col :span="12" class="text-align-right">
                <span>{{ item.thenGuardSpel }}</span>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="20" class="state-container-right pl-5" ref="stateRight">
            <div class="state-container-event">
              <div class="mt-4">
                <h3>
                  <!-- <i class="el-icon-camera-solid mr-1"></i> -->
                  <svg-icon icon-class="event"></svg-icon>
                  <span class="ml-1">事件</span>
                </h3>
              </div>
              <el-divider></el-divider>
              <el-table :data="[] && item.events" size="mini" class="fill" empty-text="暂无事件">
                <el-table-column :label="stateSettings.name" prop="name"></el-table-column>
                <el-table-column :label="stateSettings.code">
                  <template slot-scope="scope">
                    <span>{{ scope.row.code }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="stateSettings.target">
                  <template slot-scope="scope">
                    <a v-if="!isEmpty(scope.row.target)" :href="`#${scope.row.target.code}`">
                      <StateTag size="mini">
                        {{
                        scope.row.target.name
                        }}
                      </StateTag>
                    </a>
                    <span v-else>无</span>
                  </template>
                </el-table-column>

                <el-table-column :label="stateSettings.guardSpel">
                  <template slot-scope="scope">
                    <span>{{ scope.row.guardSpel || "无" }}</span>
                  </template>
                </el-table-column>

                <el-table-column :label="stateSettings.action">
                  <template slot-scope="scope">
                    <action-tag>{{ scope.row.action }}</action-tag>
                  </template>
                </el-table-column>

                <el-table-column :label="stateSettings.roles" width="120">
                  <template slot-scope="scope">
                    <tag-button :tags="[] && scope.row.roles" v-if="scope.row.roles.length==1"></tag-button>
                    <el-badge
                      :value="scope.row.roles.length"
                      class="item mt-2"
                      type="primary"
                      v-else
                    >
                      <tag-button :tags="[] && scope.row.roles"></tag-button>
                    </el-badge>
                    <!-- <tag-button :tags="[] && scope.row.roles"></tag-button> -->
                  </template>
                </el-table-column>
                <el-table-column :label="stateSettings.terminal" prop="terminal"></el-table-column>
                <el-table-column :label="stateSettings.description">
                  <template slot-scope="scope">
                    <span>{{ scope.row.description || "无" }}</span>
                  </template>
                </el-table-column>
                <el-table-column label width="120">
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      size="mini"
                      class="deleteBtn"
                      icon="el-icon-delete"
                      @click="onDelEvent(item.uuid, scope.row.uuid)"
                    >解除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div>
              <div>
                <h3 class="mt-4">
                  <!-- <i class="el-icon-s-help mr-1"></i> -->
                  <svg-icon icon-class="timer" class="common-icon"></svg-icon>
                  <span>定时器</span>
                </h3>
              </div>
              <el-divider></el-divider>
              <el-table
                class="fill"
                :data="item.timers.isEmptyObj()?null:item.timers"
                empty-text="暂无定时器"
              >
                <el-table-column :label="stateSettings.name" prop="name"></el-table-column>
                
                <el-table-column :label="stateSettings.action">
                  <template slot-scope="scope">
                    <action-tag>{{ scope.row.action }}</action-tag>
                  </template>
                </el-table-column>
                <el-table-column :label="stateSettings.timer">
                  <template slot-scope="scope">
                    <div v-if="scope.row.timerOnce">{{ scope.row.timerOnce }}'' 延时定时器</div>
                    <div v-if="scope.row.timerInterval">{{ scope.row.timerInterval }}'' 周期定时器</div>
                  </template>
                </el-table-column>
                <el-table-column :label="stateSettings.description" prop="description">
                  <template slot-scope="scope">
                    <span>{{ scope.row.description || "无" }}</span>
                  </template>
                </el-table-column>
                <el-table-column label width="120">
                  <template slot-scope="scope">
                    <!-- <el-button
                      type="text"
                      size="mini"
                      class="deleteBtn"
                      icon="el-icon-delete"
                      @click="onDelTimer(item.uuid, scope.row.uuid)"
                    >删除</el-button> -->
                    <span class="deleteBtn cursor-pointer" @click="onDelTimer(item.uuid, scope.row.uuid)">
                        <i class="el-icon-delete"></i>
                        删除</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import TagButton from './components/tag-button'
import EventItem from './components/event-item'

import ActionsList from './components/actions-list'
import eventList from './components/eventList'
import StateSettingAddButton from './components/StateSettingAddButton'

import { AddButtonFormType } from '@/utils/commonEnum'
import ButtonPanel from './components/CommonBtnAndPanel'
import { isEmpty } from '@/utils/normal'
import StateTag from './components/StateTag'
import ActionTag from './components/StateSettingActionTag'
import EditDialog from './dialog'

const NAME = 'stateSettings'
export default {
  name: 'state-setting',
  props: ['entity'],
  components: {
    EditDialog,
    TagButton,
    EventItem,
    // TimerItem,
    ActionsList,
    eventList,
    ButtonPanel,
    StateSettingAddButton,
    StateTag,
    ActionTag
  },
  data() {
    return {
      // loading: false,
      subloading: false,
      timer: null,
      editEvent: false,
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
      eventId: null,
      state1: '',
      inputVisible: false,
      inputValue: '',
      createStateForm: {
        name: '',
        code: ''
      },
      AddButtonFormType,
      createEventForm: {
        name: '',
        code: ''
      },
      addTimerForm: {
        name: '',
        code: ''
      }
    }
  },
  computed: {
    usedEvents() {
      let list = this.unusedEvents.map(e=>{
        return e.uuid;
      })
      let diff = this.eventList.filter(val => {
        return list.indexOf(val.uuid) === -1
      })
      return diff;
    },
    ...mapState(NAME, [
      'currentStateList',
      'stateLessEvent',
      'events',
      'loading',
      'unusedEvents',
      'eventList',
      'currentRole'
    ]),
    stringifyArr() {
      let temp = []
      this.$store.state.stateSetting.events.forEach(item => {
        temp.push(JSON.stringify(item))
      })
      return temp
    }
  },
  watch: {
    $route: {
      handler(newVal, oldVal) {
        const entity = newVal.params.entity
        this.$store.commit('stateSettings/SAVE_ENTITY', entity)
        this.$store.dispatch('stateSettings/getStateMachine')
        this.$store.dispatch('stateSettings/getActionByEntity')
      },
      immediate: true,
      deep: true
    },
    currentRole(newValue, oldValue) {
      this.initData()
    }
  },
  created() {
    this.initData()
  },
  mounted() {},
  updated() {
    // this.$nextTick(() => {
    //   this.leftAndRightEqual()
    // })
    // this.leftAndRightEqual()
    let oBtns = document.getElementsByClassName('deleteBtn')
    let oRows = document.getElementsByClassName('el-table__row')
    for (let i = 0; i < oBtns.length; i++) {
      const btn = oRows[i]
      btn.onmouseover = () => {
        oBtns[i].style.display = 'inline-block'
      }
      btn.onmouseleave = () => {
        oBtns[i].style.display = 'none'
      }
    }
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  },
  methods: {
    ...mapMutations(NAME, ['SAVE_CURRENTSTATE', 'TOGGLE_STATE']),
    ...mapActions(NAME, [
      'getRoleList',
      'getStateList',
      'getActionByEntity',
      'addEvent',
      'addState',
      'addTimer',
      'getUnuseEvent',
      'editEventData',
      'getStateMachine',
      'updateCache',
      'delTimerById',
      'stateUnlinkEvent',
      'addEventByState',
      'getEventByEntity'
    ]),
    initData() {
      //   this.getStateList();
      this.getRoleList()
      //   this.getActionByEntity();
      this.getUnuseEvent().then(() => {
        this.getEventByEntity()
      })
      this.getStateMachine()
      this.timer = setTimeout(() => {
        clearTimeout(this.timer)
      }, 2000)
    },
    generateTimers(option) {
      if (this.hasTimers(option)) {
        return []
      } else {
        return option
      }
    },
    hasTimers(option) {
      if (this.isEmpty(option)) {
        return false
      } else return true
    },
    isEmpty(obj) {
      for (let key in obj) {
        return false
      }
      return true
    },
    tableRowClassName({ row, rowIndex }) {
      return 'bg-color-success'
    },
    childTableClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 0) {
        return 'bg-color-warning'
      } else {
        return 'bg-color-primary'
      }
    },
    childCellClassName({ rowIndex, columnIndex }) {
      if (columnIndex == 6) {
        return 'bg-color-danger'
      }
    },
    handleSelect(item) {},
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    subDataByMType() {},
    handleInputConfirm() {
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    submitStateData([form, mType]) {
      if (mType == AddButtonFormType.ADDBUTTONEVENT) {
        this.subEventFormData(form)
      } else if (mType == AddButtonFormType.ADDBUTTONSTATE) {
        this.subStateFormData(form)
      } else if (mType == AddButtonFormType.ADDBUTTONTIMER) {
        this.subTimerFormData(form)
      }
    },
    subEventFormData(form) {
      this.subloading = true
      this.addEvent(form)
        .then(res => {
          this.initData()
          this.subloading = false
          this.$message({
            message: '添加成功',
            type: 'success',
            duration: 5 * 1000
          })
        })
        .catch(err => {
          this.subloading = false
        })
    },
    subStateFormData(form) {
      this.subloading = true
      this.addState(form)
        .then(res => {
          this.subloading = false
          this.initData()
          this.$message({
            message: '添加成功',
            type: 'success',
            duration: 5 * 1000
          })
        })
        .catch(err => {
          this.subloading = false
        })
    },
    subTimerFormData(form) {
      this.subloading = true
      this.addTimer(form)
        .then(res => {
          this.initData()
          this.subloading = false
          this.$message({
            message: '添加成功',
            type: 'success',
            duration: 5 * 1000
          })
        })
        .catch(err => {
          this.subloading = false
        })
    },
    editStateData([form, mType]) {
      if (mType == AddButtonFormType.ADDBUTTONEVENT) {
        this.editEventFormData(form)
      } else if (mType == AddButtonFormType.ADDBUTTONTIMER) {
        this.editTimerFormData(form)
      }
    },
    editEventFormData(form) {
      this.editEventData(form)
        .then(res => {
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 5 * 1000
          })
          this.getUnuseEvent()
        })
        .catch(err => {})
    },
    editTimerFormData(form) {},
    updateCacheData() {
      this.updateCache()
        .then(res => {
          this.initData()
          this.$message({
            message: '更新成功',
            type: 'success',
            duration: 5 * 1000
          })
        })
        .catch(err => {
          this.$message({
            message: '更新失败',
            type: 'error',
            duration: 5 * 1000
          })
        })
    },
    onDelEvent(state, event) {
      let data = {
        state,
        event
      }
      this.$confirm('此操作将解除事件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.stateUnlinkEvent(data)
            .then(res => {
              this.getStateMachine()
              this.getUnuseEvent()
              this.$message({
                type: 'success',
                message: '解除成功!'
              })
            })
            .catch(err => {
              this.$message({
                type: 'error',
                message: '解除失败!'
              })
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    onDelTimer(state, timerid) {
      let data = {
        uuid: timerid
      }
      this.$confirm('此操作将解除定时器, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.delTimerById(data)
            .then(res => {
              this.getStateMachine()
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            })
            .catch(err => {
              this.$message({
                type: 'error',
                message: '删除失败!'
              })
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    leftAndRightEqual() {
      let leftDivs = document.getElementsByClassName('state-container-left')
      let rightDivs = document.getElementsByClassName('state-container-right')
      for (let index = 0; index < leftDivs.length; index++) {
        let lHeig = leftDivs[index].offsetHeight
        let rHeig = rightDivs[index].offsetHeight
        if (lHeig < rHeig) {
          rightDivs[index].style.borderLeft = '1px solid #dcdfe6'
        } else {
          leftDivs[index].style.borderRight = '1px solid #dcdfe6'
        }
      }
    },
    onSubEventByState(stateId, index) {
      let eventId = this.eventId
      if (eventId) {
        this.addEventByState({ state: stateId, event: eventId })
          .then(res => {
            this.eventId = null
            this.$message({
              type: 'success',
              message: '添加成功!'
            })
            this.$refs['stateAddEvent'][index].changeDialogState()
            this.initData()
          })
          .catch(err => {
            this.$message({
              type: 'error',
              message: '添加失败!'
            })
          })
      }
    },
    handleAction(action, payload) {
      this.$refs['editDialog'].dialogVisible = true
      //   this.$parent.$refs['editDialog'].type = 'create'
      this.$refs['editDialog'].event = action

      if (payload) {
        // alert(payload)
        console.log('<-------------->',payload)
        this.$refs['editDialog'].payload = payload
        if(Object.keys(payload).length){
            this.$store.commit('stateSettings/SAVE_CURRENT',payload)
        }
        

        // console.log(this.$refs['editDialog'])
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/base.scss';
@import '@/styles/mixin.scss';

// .el-table--enable-row-hover .el-table__body tr:hover > td {
//   background-color: initial !important;
// }
.statesetting-container .el-button--text {
  padding: 5px 10px;
}
.el-table .bg-color-danger {
  background: #fef0f0;
}
.form-label {
  font-weight: 500;
  text-align: left;
}
.add-btn-container .el-form-item {
  margin-bottom: (0!important);
}
.el-table .bg-color-success {
  // background: #f0f9eb;
}

.el-table .bg-color-warning {
  // background: #fdf6ec;
}

.el-table .bg-color-primary {
  // background: #ecf5ff;
}

.el-table th {
  // background-color: initial;
}

.el-table tr {
  // background-color: initial;
}

.statesetting-container {
  @include scrollBar;
  .header-title-success {
    // color: #000;
    // background: #f0f9eb;
  }
  .header-title-danger {
    // color: #000;
    // background: #fef0f0;
  }
  .header-title-warning {
    // color: #000;
    // background: #fdf6ec;
  }
}
// .statesetting-container .el-button {
//   margin-left: 10px;
// }
.el-table__body-wrapper {
  @include scrollBar;
}
.click-cursor {
  cursor: pointer;
}
.state-container:nth-child(even) {
  background: #fafafa;
  .el-table,
  .el-table th,
  .el-table tr {
    background: #fafafa;
  }
}
.deleteBtn {
  display: none;
  color: #f56c6c;
  transition: opacity 0.5;
}
.deleteBtn:hover {
  color: #f56c6c;
  opacity: 0.8;
}
.common-icon {
  width: 1.2em !important;
  height: 1.2em !important;
}
.statesetting-container .el-table thead {
  color: #303133;
}
</style>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
.property-item {
  margin-bottom: 1.2em;
}
.add-btn-container {
  padding: 15px 0 15px 5px;
  // border-bottom: 1px solid #dcdfe6;
}
.statesetting-container {
  width: 100%;
  border-top: 1px solid #e9e9e9;
  overflow: hidden;
  overflow-y: scroll;
}
.stateless-container {
  display: flex;
  border-top: 1px solid #e9e9e9;
}
.title-container {
  display: flex;
  justify-content: space-between;
}

.form-container {
  padding: 30px;
}
label {
  font-weight: (normal!important);
}
.state-container {
  // background: #ecf5ff;
  // border-bottom: 1px solid #dcdfe6;
  border-collapse: collapse;
}
.state-container-left {
  padding: 8px 12px 2em;
  font-size: 14px;
}
// .state-container-left > div:not(:first-child) {
.state-container-left {
  color: #606266;
  font-size: 13px;
}
.state-container-right {
  @include scrollBar;
  padding: 0px 0px 2em;
  margin: 0px;
  font-size: 13px;
}
.state-container-event > div:first-child {
  padding: 0px 12px 0 4px;
}
.state-container-event > div:last-child {
  padding: 0px 14px;
}
.state-container-right > div:last-child > div:first-child {
  padding: 0px 12px 0 4px;
}
.state-container-right > div:last-child > div:last-child {
  padding: 0px 14px;
}
.isUseBall-use {
  width: 6px;
  height: 6px;
  background: #e6a23c;
  border-radius: 3px;
  margin: 1em 0;
}
.isUseBall-unUse {
  width: 6px;
  height: 6px;
  background: #67c23a;
  border-radius: 3px;
  margin: 1em 0;
}
h3 {
  color: #303133;
  // font-weight: 600;
  font-size: 1.06em;
}
</style>
