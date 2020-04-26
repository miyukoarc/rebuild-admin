import tim from '@/tim'
const state ={
  groupList: [],
  currentMemberList: [],
  createGroupModelVisible: false
}

const getters = {
  hasGroupList: state => state.groupList.length > 0
}
const mutations = {
  updateGroupList(state, groupList) {
    state.groupList = groupList
  },
  updateCreateGroupModelVisible(state, visible) {
    state.createGroupModelVisible = visible
  },
  updateCurrentMemberList(state, memberList) {
    state.currentMemberList = [...state.currentMemberList, ...memberList]
  },
  deleteGroupMemeber(state, userID) {
    state.currentMemberList = state.currentMemberList.filter((member) => member.userID !== userID)
  },
  deleteGroupMemberList(state, userIDList) {
    state.currentMemberList = state.currentMemberList.filter((member) => !userIDList.includes(member.userID))
  },
  resetCurrentMemberList(state) {
    state.currentMemberList = []
  },
  reset(state) {
    Object.assign(state, {
      groupList: [],
      currentMemberList: [],
      createGroupModelVisible: false
    })
  }
}
const actions ={
  updateGroupList(context, groupList) {
    context.commit('updateGroupList', groupList)
  },
  getGroupMemberList(context, groupID) {
    return tim.getGroupMemberList({
      groupID: groupID,
      offset: context.state.currentMemberList.length,
      count: 30
    }).then((imResponse) => {
      context.commit('updateCurrentMemberList', imResponse.data.memberList)
      return imResponse
    })
  }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}