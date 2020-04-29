<template>
  <div class="statesetting-container" v-loading.body.lock="loading">
    <div class="add-btn-container">
      <div style="display:flex;justify-content:space-between;">
        <div style="display:inline-block;margin: auto auto 0 0;">
          <StateSettingAddButton
            labelText="添加状态"
            :mType="AddButtonFormType.ADDBUTTONSTATE"
            inline
            type="success"
            @submitStateData="submitStateData"
            :loading="subloading"
          />
          <StateSettingAddButton
            labelText="添加孤立事件"
            :mType="AddButtonFormType.ADDBUTTONEVENT"
            inline
            @submitStateData="submitStateData"
            :loading="subloading"
          >
          </StateSettingAddButton>
          <el-button type="primary" @click="updateCacheData"
            >更新缓存</el-button
          >
        </div>

        <div>
          <actions-list></actions-list>
          <unused-event-list @editStateData="editStateData"></unused-event-list>
        </div>
      </div>
    </div>

    <div ref="stateSettingContent">
      <div v-for="(item, index) in currentStateList" :key="index">
        <el-row style="" class="state-container">
          <el-col
            :span="4"
            style=""
            class="state-container-left"
            ref="stateLeft"
          >
            <el-row>
              <el-col :span="18">
                <h3 :id="item.code" class="text-align-left">
                  <i class="el-icon-message-solid"></i>
                  &nbsp;&nbsp;{{ item.name }}
                </h3>
              </el-col>
              <el-col :span="6" class="text-align-right" style="margin:1.2em 0">
                <StateSettingAddButton
                  labelText="添加事件"
                  :mType="AddButtonFormType.ADDBUTTONEVENT"
                  inline
                  @submitStateData="submitStateData"
                  :loading="subloading"
                  :stateId="item.uuid"
                  ref="stateAddEvent"
                  width="324px"
                >
                  <template v-slot:customBtn>
                    <i
                      class="el-icon-circle-plus-outline"
                      style="font-size:1.17em"
                    ></i>
                  </template>
                  <template v-slot:body>
                    <el-select v-model="eventId" placeholder="">
                      <el-option
                        v-for="item in eventList"
                        :key="item.uuid"
                        :label="item.name"
                        :value="item.uuid"
                      >
                        <span style="float: left">{{ item.name }}</span>
                        <span
                          style="float: right; color: #8492a6; font-size: 13px"
                        >
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
                    <el-button
                      type="primary"
                      @click="onSubEventByState(item.uuid, index)"
                      >确定</el-button
                    >
                  </template>
                </StateSettingAddButton>
                <StateSettingAddButton
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
                </StateSettingAddButton>
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

            <el-row
              class="property-item"
              type="flex"
              align="middle"
              justify="space-between"
            >
              <el-col :span="12" class="text-align-left">
                <span>{{ stateSettings.stateType }}</span>
              </el-col>

              <el-col :span="12" class="text-align-right">
                <StateTag type="danger" size="mini">
                  <span>{{ item.stateType }}</span>
                </StateTag>
              </el-col>
            </el-row>

            <el-row
              class="property-item"
              type="flex"
              align="middle"
              justify="space-between"
            >
              <el-col :span="12" class="text-align-left">
                <span>{{ stateSettings.code }}</span>
              </el-col>

              <el-col :span="12" class="text-align-right">
                <span style="font-weight:700">{{ item.code }}</span>
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
          <el-col :span="20" class="state-container-right" ref="stateRight">
            <div>
              <h3><i class="el-icon-camera-solid"></i>&nbsp;&nbsp;事件</h3>
              <el-table
                row-class-name="bg-color-success"
                header-row-class-name="header-title-success"
                border
                :data="[] && item.events"
                size="mini"
              >
                <el-table-column
                  :label="stateSettings.name"
                  prop="name"
                  align="center"
                ></el-table-column>
                <el-table-column
                  :label="stateSettings.code"
                  align="center"
                >
                  <template slot-scope="scope">
                    <span style="font-weight:700">{{ scope.row.code }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="stateSettings.description"
                  align="center"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.description || "无" }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="stateSettings.terminal"
                  prop="terminal"
                  align="center"
                ></el-table-column>
                <el-table-column
                  :label="stateSettings.target"
                  align="center"
                >
                  <template slot-scope="scope">
                    <a
                      v-if="!isEmpty(scope.row.target)"
                      :href="`#${scope.row.target.code}`"
                    >
                      <StateTag size="mini">{{
                        scope.row.target.name
                      }}</StateTag>
                    </a>
                    <span v-else>无</span>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="stateSettings.guardSpel"
                  align="center"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.guardSpel || "无" }}</span>
                  </template>
                </el-table-column>

                <el-table-column
                  :label="stateSettings.action"
                  align="center"
                >
                  <template slot-scope="scope">
                    <action-tag>{{ scope.row.action }}</action-tag>
                  </template>
                </el-table-column>

                <el-table-column
                  :label="stateSettings.roles"
                  align="center"
                >
                  <template slot-scope="scope">
                    <tag-button :tags="[] && scope.row.roles"></tag-button>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                  <template slot-scope="scope">
                    <el-button
                      type="info"
                      size="mini"
                      @click="onDelEvent(item.uuid, scope.row.uuid)"
                      >解除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div v-if="item.timers.length">
              <h3><i class="el-icon-s-help"></i>&nbsp;&nbsp;定时器</h3>
              <div>
                <el-table
                  row-class-name="bg-color-warning"
                  header-row-class-name="header-title-warning"
                  border
                  :data="item.timers"
                >
                  <el-table-column
                    :label="stateSettings.name"
                    prop="name"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    :label="stateSettings.description"
                    prop="description"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <span>{{ scope.row.description || "无" }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="stateSettings.action"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <action-tag> {{ scope.row.action }}</action-tag>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="stateSettings.timer"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div v-if="scope.row.timerOnce">
                        {{ scope.row.timerOnce }}'' 延时定时器
                      </div>
                      <div v-if="scope.row.timerInterval">
                        {{ scope.row.timerInterval }}'' 周期定时器
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                      <el-button
                        type="info"
                        size="mini"
                        @click="onDelTimer(item.uuid, scope.row.uuid)"
                        >删除</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import TagButton from "./components/tag-button";
import EventItem from "./components/event-item";
import TimerItem from "./components/timer-item";
import CreateState from "./components/create-state";
import CreateTimer from "./components/create-timer";
import CreateEvent from "./components/create-event";
import ActionsList from "./components/actions-list";
import UnusedEventList from "./components/unusedEvents";
import StateSettingAddButton from "./components/StateSettingAddButton";
import EditDetail from "./components/edit-detail";
import { AddButtonFormType } from "@/utils/commonEnum";
import ButtonPanel from "./components/CommonBtnAndPanel";
import { isEmpty } from "@/utils/normal";
import StateTag from "./components/StateTag";
import ActionTag from "./components/StateSettingActionTag";

const NAME = "stateSettings";
export default {
  name: "state-setting",
  props: ["entity"],
  components: {
    EditDetail,
    TagButton,
    EventItem,
    TimerItem,
    CreateState,
    CreateTimer,
    CreateEvent,
    ActionsList,
    UnusedEventList,
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
        name: "名称",
        code: "Code",
        description: "功能描述",
        guardSpel: "执行条件",
        roles: "可执行角色",
        sort: "排序",
        target: "跳转状态",
        terminal: "可执行终端",
        enterAction: "进入执行",
        exitAction: "退出执行",
        firstGuardSpel: "第一执行条件",
        firstTarget: "第一目标",
        lastTarget: "最终目标",
        stateType: "状态类型",
        thenGuardSpel: "第二执行条件",
        thenTarget: "第二目标",
        timerInterval: "周期定时器",
        timerOnce: "延时定时器",
        action: "执行动作",
        COMMON: "通用状态",
        BEGIN: "启动状态",
        END: "结束状态",
        CHOICE: "分支状态",
        ORG: "企业端",
        USER: "用户端",
        timer: "定时器(S)"
      },
      stateLess: [
        {
          name: "无状态",
          code: "stateLess",
          event: [
            {
              name: "使启动",
              code: "doStart",
              target: ["user"]
            },
            {
              name: "使关闭",
              code: "doClose",
              target: ["user"]
            }
          ]
        }
      ],
      eventId: null,
      state1: "",
      inputVisible: false,
      inputValue: "",
      createStateForm: {
        name: "",
        code: ""
      },
      AddButtonFormType,
      createEventForm: {
        name: "",
        code: ""
      },
      addTimerForm: {
        name: "",
        code: ""
      }
    };
  },
  computed: {
    ...mapState(NAME, [
      "currentStateList",
      "stateLessEvent",
      "events",
      "loading",
      "unusedEvents",
      "eventList",
      "currentRole"
    ]),
    stringifyArr() {
      let temp = [];
      this.$store.state.stateSetting.events.forEach(item => {
        temp.push(JSON.stringify(item));
      });

      return temp;
    }
  },
  watch: {
    currentRole(newValue, oldValue) {
      this.initData();
    }
  },
  created() {
    this.initData();
  },
  mounted() {},
  updated() {
    this.$nextTick(() => {
      this.leftAndRightEqual();
    });
    this.leftAndRightEqual();
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  },
  methods: {
    ...mapMutations(NAME, ["SAVE_CURRENTSTATE", "TOGGLE_STATE"]),
    ...mapActions(NAME, [
      "getRoleList",
      "getStateList",
      "getActionByEntity",
      "addEvent",
      "addState",
      "addTimer",
      "getUnuseEvent",
      "editEventData",
      "getStateMachine",
      "updateCache",
      "delTimerById",
      "stateUnlinkEvent",
      "addEventByState",
      "getEventByEntity"
    ]),
    initData() {
      this.getStateList();
      this.getRoleList();
      this.getActionByEntity();
      this.getUnuseEvent().then(() => {
        this.getEventByEntity();
      });
      this.getStateMachine();
      this.timer = setTimeout(() => {
        clearTimeout(this.timer);
      }, 2000);
    },
    generateTimers(option) {
      if (this.hasTimers(option)) {
        return [];
      } else {
        return option;
      }
    },
    hasTimers(option) {
      if (this.isEmpty(option)) {
        return false;
      } else return true;
    },
    isEmpty(obj) {
      for (let key in obj) {
        return false;
      }
      return true;
    },
    tableRowClassName({ row, rowIndex }) {
      return "bg-color-success";
    },
    childTableClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 0) {
        return "bg-color-warning";
      } else {
        return "bg-color-primary";
      }
    },
    childCellClassName({ rowIndex, columnIndex }) {
      if (columnIndex == 6) {
        return "bg-color-danger";
      }
    },
    handleSelect(item) {},
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    subDataByMType() {},
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    submitStateData([form, mType]) {
      if (mType == AddButtonFormType.ADDBUTTONEVENT) {
        this.subEventFormData(form);
      } else if (mType == AddButtonFormType.ADDBUTTONSTATE) {
        this.subStateFormData(form);
      } else if (mType == AddButtonFormType.ADDBUTTONTIMER) {
        this.subTimerFormData(form);
      }
    },
    subEventFormData(form) {
      this.subloading = true;
      this.addEvent(form)
        .then(res => {
          this.initData();
          this.subloading = false;
          this.$message({
            message: "success",
            type: "success",
            duration: 5 * 1000
          });
        })
        .catch(err => {
          this.subloading = false;
        });
    },
    subStateFormData(form) {
      this.subloading = true;
      this.addState(form)
        .then(res => {
          this.subloading = false;
          this.initData();
          this.$message({
            message: "success",
            type: "success",
            duration: 5 * 1000
          });
        })
        .catch(err => {
          this.subloading = false;
        });
    },
    subTimerFormData(form) {
      this.subloading = true;
      this.addTimer(form)
        .then(res => {
          this.initData();
          this.subloading = false;
          this.$message({
            message: "success",
            type: "success",
            duration: 5 * 1000
          });
        })
        .catch(err => {
          this.subloading = false;
        });
    },
    editStateData([form, mType]) {
      if (mType == AddButtonFormType.ADDBUTTONEVENT) {
        this.editEventFormData(form);
      } else if (mType == AddButtonFormType.ADDBUTTONTIMER) {
        this.editTimerFormData(form);
      }
    },
    editEventFormData(form) {
      this.editEventData(form)
        .then(res => {
          this.$message({
            message: "修改成功",
            type: "success",
            duration: 5 * 1000
          });
          this.getUnuseEvent();
        })
        .catch(err => {});
    },
    editTimerFormData(form) {},
    updateCacheData() {
      this.updateCache()
        .then(res => {
          this.initData();
          this.$message({
            message: "更新成功",
            type: "success",
            duration: 5 * 1000
          });
        })
        .catch(err => {
          this.$message({
            message: "更新失败",
            type: "error",
            duration: 5 * 1000
          });
        });
    },
    onDelEvent(state, event) {
      let data = {
        state,
        event
      };
      this.$confirm("此操作将解除事件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.stateUnlinkEvent(data)
            .then(res => {
              this.getStateMachine();
              this.getUnuseEvent();
              this.$message({
                type: "success",
                message: "解除成功!"
              });
            })
            .catch(err => {
              this.$message({
                type: "error",
                message: "解除失败!"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    onDelTimer(state, timerid) {
      let data = {
        uuid: timerid
      };
      this.$confirm("此操作将解除定时器, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.delTimerById(data)
            .then(res => {
              this.getStateMachine();
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            })
            .catch(err => {
              this.$message({
                type: "error",
                message: "删除失败!"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    leftAndRightEqual() {
      let leftDivs = document.getElementsByClassName("state-container-left");
      let rightDivs = document.getElementsByClassName("state-container-right");
      for (let index = 0; index < leftDivs.length; index++) {
        let lHeig = leftDivs[index].offsetHeight;
        let rHeig = rightDivs[index].offsetHeight;
        if (lHeig < rHeig) {
          rightDivs[index].style.borderLeft = "1px solid #dfe6ec";
        } else {
          leftDivs[index].style.borderRight = "1px solid #dfe6ec";
        }
      }
    },
    onSubEventByState(stateId, index) {
      let eventId = this.eventId;
      if (eventId) {
        this.addEventByState({ state: stateId, event: eventId })
          .then(res => {
            this.eventId = null;
            this.$message({
              type: "success",
              message: "添加成功!"
            });
            this.$refs["stateAddEvent"][index].changeDialogState();
            this.initData();
          })
          .catch(err => {
            this.$message({
              type: "error",
              message: "添加失败!"
            });
          });
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/base.scss";

.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: initial !important;
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
  background: #f0f9eb;
}

.el-table .bg-color-warning {
  background: #fdf6ec;
}

.el-table .bg-color-primary {
  background: #ecf5ff;
}

.el-table th {
  background-color: initial;
}

.el-table tr {
  background-color: initial;
}

.statesetting-container {
  .header-title-success {
    color: #000;
    background: #f0f9eb;
  }
  .header-title-danger {
    color: #000;
    background: #fef0f0;
  }
  .header-title-warning {
    color: #000;
    background: #fdf6ec;
  }
}
.statesetting-container .el-button {
  margin-left: 10px;
}
</style>

<style lang="scss" scoped>
.property-item {
  margin-bottom: 1.2em;
}
.add-btn-container {
  padding: 15px 0 15px 5px;
  background-color: #fff;
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
  background: #ecf5ff;
  border-bottom: 1px solid #dfe6ec;
  border-collapse: collapse;
}
.state-container-left {
  padding: 10px 12px;
  font-size: 14px;
}
.state-container-left > div:not(:first-child) {
  color: #606266;
  font-size: 13px;
}
.state-container-right {
  padding: 10px 12px;
  margin: 0px;
  font-size: 13px;
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
</style>
