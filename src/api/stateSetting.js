
/* eslint-disable */ 
import request from "@/utils/request";


const getRoleList = function() {
  return request({
    url: "/v1/list/role",
    method: "get"
  });
};
const getStateList = function() {
  return request({
    url: `/v1/stateMachine` + "/list",
    method: "get"
  });
};

const getActionByEntity = function(entity) {
  return request({
    url: `/v1/stateMachine` + `/list/${entity}/action`,
    method: "get"
  });
};

const getUnuseEvent = function(entity) {
  return request({
    url: `/v1/stateMachine` + `/list/${entity}/uselessEvent`,
    method: "get"
  });
};

const getStateMachine = function(entity) {
  return request({
    url: `/v1/stateMachine` + `/list/${entity}`,
    method: "get"
  });
};
const addEvent = function(data) {
  return request({
    url: `/v1/stateMachine` + "/addEvent",
    method: "post",
    data: data
  });
};
const addEventByState = function(data) {
    return request({
      url: "/v1/stateMachine/stateLinkEvent",
      method: "post",
      data: data
    });
  };

const addState = function(data) {
  return request({
    url: `/v1/stateMachine` + "/addState",
    method: "post",
    data: data
  });
};

const addTimer = function(data) {
  return request({
    url: `/v1/stateMachine` + "/stateAddTimer",
    method: "post",
    data: data
  });
};

const editEvent = function(data) {
  return request({
    url: `/v1/stateMachine` + "/updateEvent",
    method: "post",
    data: data
  });
};

const updateCache = function(entity) {
  return request({
    url: `/v1/stateMachine` + `/updateCache/${entity}`,
    method: "post",
    data: { entity: entity }
  });
};
const delTimerById = function(data) {
  return request({
    url: `/v1/stateMachine` + `/stateDeleteTimer`,
    method: "post",
    data: data
  });
};
const stateUnlinkEvent = function(data) {
  return request({
    url:`/v1/stateMachine/stateUnlinkEvent`,
    method: "post",
    data:data
  });
};

const getEventByEntity = function(entity) {
    return request({
      url: `v1/list/event?entity=${entity}`,
      method: "get"
    });
  };


export const getEventList = ()=>{
    return request({
        url: '/v1/stateMachine/listEvent',
        method: 'get'
    })
}

export const updateState = (data) => {
    return request({
        url: '/v1/stateMachine/updateState',
        method: 'post',
        data
    })
}

module.exports = {
  getRoleList,
  getStateList,
  getActionByEntity,
  addEvent,
  addState,
  addTimer,
  editEvent,
  getUnuseEvent,
  getStateMachine,
  updateCache,
  delTimerById,
  stateUnlinkEvent,
  addEventByState,
  getEventByEntity,
  getEventList,
  updateState
};
