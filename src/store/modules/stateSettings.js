import Api from "@/api/stateSetting";
import {getEventList} from '@/api/stateSetting'
const state = {
  show: false,
  dataList: [],
  timers:[],
  events:[],
  actions: ["doEnable", "doDisable", "doKick", "doSpeak", "doTest"],
  unusedEvents: [],
  currentEntity:"user",
  currentStateList: [],
  stateList: [],
  roleList: [],
  actionList: [],
  eventList: [],
  eventsMap: [],
  loading: false
};

const mutations = {
  SAVE_EVENTLIST(state,val){
    state.eventsMap = val
  },
  ADD_STATE(state, form) {
    state.dataList[0].stateList = state.dataList[0].stateList.concat(form);
  },
  SAVE_ENTITY(state, role) {
    state.currentEntity = role;
  },
  SAVE_CURRENTSTATE(state, list) {
    state.currentStateList = list;
  },
  TOGGLE_STATE(state, current) {
    state.show = current;
  },
  CHANGESTATELIST(state, val) {
    state.stateList = val;
  },
  CHANGEROLELIST(state, val) {
    state.roleList = val;
  },
  CHANGEACTIONLIST(state, val) {
    state.actionList = val;
  },
  CHANGEUNUSEDEVENTS(state, val) {
    state.unusedEvents = val;
  },
  CHANGELOADING(state, val) {
    state.loading = val;
  },
  CHANGEEVENTLIST(state, val) {
    state.eventList = val;
  },
  
};

const actions = {
  getRoleList({ commit, state }) {
    return Api.getRoleList().then(res => {
      commit("CHANGEROLELIST", res.items);
    });
  },
  editEvent({commit},payload){
      return Api.editEvent(payload).then(res => {
        //   commit('')
      })
  },
  getStateList({ commit, state }) {
    return Api.getStateList().then(res => {
      commit("CHANGESTATELIST", res.items.user);
    });
  },
  getActionByEntity({ commit, state }) {
    return Api.getActionByEntity(state.currentEntity).then(res => {
      let item = res.items;
      item = item.map(e => {
        return { name: e, uuid: e };
      });
      commit("CHANGEACTIONLIST", item);
    });
  },
  getUnuseEvent({ commit, state }) {
    return Api.getUnuseEvent(state.currentEntity).then(res => {
      let item = res.items;
      commit("CHANGEUNUSEDEVENTS", item);
    });
  },
  getEventByEntity({ commit, state }) {
    return Api.getEventByEntity(state.currentEntity).then(res => {
      let items = res.items;
      let unuseList = state.unusedEvents;
      for (const item of items) {
        let flag = !unuseList.some(e => {
          return e.code == item.code;
        });
        item.isUse = flag;
      }
      commit("CHANGEEVENTLIST", items);
    });
  },
  getStateMachine({ commit, state }) {
    commit("CHANGELOADING", true);
    return Api.getStateMachine(state.currentEntity).then(res => {
      commit("CHANGELOADING", false);
      let items = res.items;
      for (const item of items) {
        if (!(item["events"] instanceof Array)) {
          item["events"] = [];
        }
      }
      commit("SAVE_CURRENTSTATE", items);
    });
  },
  addEvent({ commit, state }, val) {
    return Api.addEvent(val);
  },
  addState({ commit, state }, val) {
    return Api.addState(val);
  },
  addTimer({ commit, state }, val) {
    return Api.addTimer(val);
  },
  addEventByState({ commit, state }, obj) {
    return Api.addEventByState(obj);
  },
  editEventData({ commit, state }, obj) {
    return Api.editEvent(obj);
  },
  updateCache({ commit, state }) {
    return Api.updateCache(state.currentEntity);
  },
  delTimerById({ commit, state }, obj) {
    return Api.delTimerById(obj);
  },
  stateUnlinkEvent({ commit, state }, obj) {
    return Api.stateUnlinkEvent(obj);
  },
  getEventList({commit}){
      return new Promise((resolve,reject)=>{
        getEventList().then(res=>{
            commit('SAVE_EVENTLIST',res.items)
            resolve()
        }).catch(err=>{
            console.log(err)
            reject()
        })
      })
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
