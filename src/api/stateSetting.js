
/* eslint-disable */ 
import request from "@/utils/request";


export const getRoleList = function() {
  return request({
    url: "/v1/list/role",
    method: "get"
  });
};
export const getStateList = function() {
  return request({
    url: `/v1/stateMachine` + "/list",
    method: "get"
  });
};

export const getActionByEntity = function(entity) {
  return request({
    url: `/v1/stateMachine` + `/list/${entity}/action`,
    method: "get"
  });
};

export const getUnuseEvent = function(entity) {
  return request({
    url: `/v1/stateMachine` + `/list/${entity}/uselessEvent`,
    method: "get"
  });
};

export const getStateMachine = function(entity) {
  return request({
    url: `/v1/stateMachine` + `/list/${entity}`,
    method: "get"
  });
};
export const addEvent = function(data) {
  return request({
    url: `/v1/stateMachine` + "/addEvent",
    method: "post",
    data: data
  });
};
export const addEventByState = function(data) {
    return request({
      url: "/v1/stateMachine/stateLinkEvent",
      method: "post",
      data: data
    });
  };

export const addState = function(data) {
  return request({
    url: `/v1/stateMachine` + "/addState",
    method: "post",
    data: data
  });
};

export const addTimer = function(data) {
  return request({
    url: `/v1/stateMachine` + "/stateAddTimer",
    method: "post",
    data: data
  });
};

export const editEvent = function(data) {
  return request({
    url: `/v1/stateMachine` + "/updateEvent",
    method: "post",
    data: data
  });
};

export const updateCache = function(entity) {
  return request({
    url: `/v1/stateMachine` + `/updateCache/${entity}`,
    method: "post",
    data: { entity: entity }
  });
};
export const delTimerById = function(data) {
  return request({
    url: `/v1/stateMachine` + `/stateDeleteTimer`,
    method: "post",
    data: data
  });
};
export const stateUnlinkEvent = function(data) {
  return request({
    url:`/v1/stateMachine/stateUnlinkEvent`,
    method: "post",
    data:data
  });
};

export const getEventByEntity = function(entity) {
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

// module.exports = {
//   getRoleList,
//   getStateList,
//   getActionByEntity,
//   addEvent,
//   addState,
//   addTimer,
//   editEvent,
//   getUnuseEvent,
//   getStateMachine,
//   updateCache,
//   delTimerById,
//   stateUnlinkEvent,
//   addEventByState,
//   getEventByEntity,
//   getEventList,
//   updateState
// };
