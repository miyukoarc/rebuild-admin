<template>
  <div>
    <group-member-list :group-profile="groupProfile" />
    
  </div>
</template>

<script>
import GroupMemberList from '@/components/group-member-list.vue'
import { Select, Option } from 'element-ui'
export default {
  components: {
    GroupMemberList,
    ElSelect: Select,
    ElOption: Option
  },
  props: ['groupProfile'],
  data() {
    return {
      showEditName: false,
      showEditFaceUrl: false,
      showEditIntroduction: false,
      showEditNotification: false,
      showEditJoinOption: false,
      showChangeGroupOwner: false,
      showEditMessageRemindType: false,
      showEditNameCard: false,
      name: this.groupProfile.name,
      avatar: this.groupProfile.avatar,
      introduction: this.groupProfile.introduction,
      notification: this.groupProfile.notification,
      joinOption: this.groupProfile.joinOption,
      newOwnerUserID: '',
      messageRemindType: this.groupProfile.selfInfo.messageRemindType,
      nameCard: this.groupProfile.selfInfo.nameCard || '',
      messageRemindTypeMap: {
        AcceptAndNotify: '接收消息并提示',
        AcceptNotNotify: '接收消息但不提示',
        Discard: '屏蔽消息'
      },
      joinOptionMap: {
        FreeAccess: '自由加入',
        NeedPermission: '需要验证',
        DisableApply: '禁止加群'
      }
    }
  },
  computed: {
    editable() {
      return (
        this.groupProfile.type === this.TIM.TYPES.GRP_PRIVATE ||
        ['Owner', 'Admin'].includes(this.groupProfile.selfInfo.role)
      )
    },
    isOwner() {
      return this.groupProfile.selfInfo.role === 'Owner'
    },
    showDissmissGroup() {
      // 私有群不能解散
      return this.isOwner && this.groupProfile.type !== 'Private'
    }
  },
  watch: {
    groupProfile(groupProfile) {
      Object.assign(this, {
        showEditName: false,
        showEditFaceUrl: false,
        showEditIntroduction: false,
        showEditNotification: false,
        showEditJoinOption: false,
        showChangeGroupOwner: false,
        showEditNameCard: false,
        name: groupProfile.name,
        avatar: groupProfile.avatar,
        introduction: groupProfile.introduction,
        notification: groupProfile.notification,
        joinOption: groupProfile.joinOption,
        messageRemindType: groupProfile.messageRemindType,
        nameCard: groupProfile.selfInfo.nameCard || ''
      })
    }
  },
  methods: {
    inputFocus(ref) {
      this.$nextTick(() => {
        this.$refs[ref].focus()
      })
    },
    editName() {
      this.tim
        .updateGroupProfile({
          groupID: this.groupProfile.groupID,
          name: this.name.trim()
        })
        .then(() => {
          this.showEditName = false
        })
        .catch(error => {
          this.$store.commit('showMessage', {
            type: 'error',
            message: error.message
          })
        })
    },
    editFaceUrl() {
      this.tim
        .updateGroupProfile({
          groupID: this.groupProfile.groupID,
          avatar: this.avatar.trim()
        })
        .then(() => {
          this.showEditFaceUrl = false
        })
        .catch(error => {
          this.$store.commit('showMessage', {
            type: 'error',
            message: error.message
          })
        })
    },
    editIntroduction() {
      this.tim
        .updateGroupProfile({
          groupID: this.groupProfile.groupID,
          introduction: this.introduction.trim()
        })
        .then(() => {
          this.showEditIntroduction = false
        })
        .catch(error => {
          this.$store.commit('showMessage', {
            type: 'error',
            message: error.message
          })
        })
    },
    editNotification() {
      this.tim
        .updateGroupProfile({
          groupID: this.groupProfile.groupID,
          notification: this.notification.trim()
        })
        .then(() => {
          this.showEditNotification = false
        })
        .catch(error => {
          this.$store.commit('showMessage', {
            type: 'error',
            message: error.message
          })
        })
    },
    editJoinOption() {
      this.tim
        .updateGroupProfile({
          groupID: this.groupProfile.groupID,
          joinOption: this.joinOption
        })
        .then(() => {
          this.showEditJoinOption = false
        })
        .catch(error => {
          this.$store.commit('showMessage', {
            type: 'error',
            message: error.message
          })
        })
    },
    changeOwner() {
      this.tim
        .changeGroupOwner({
          groupID: this.groupProfile.groupID,
          newOwnerID: this.newOwnerUserID
        })
        .then(() => {
          this.showChangeGroupOwner = false
          this.$store.commit('showMessage', {
            message: `转让群主成功，新群主ID：${this.newOwnerUserID}`
          })
          this.newOwnerUserID = ''
        })
        .catch(error => {
          this.$store.commit('showMessage', {
            type: 'error',
            message: error.message
          })
        })
    },
    quitGroup() {
      this.tim.quitGroup(this.groupProfile.groupID).then(({ data: { groupID }}) => {
        this.$store.commit('showMessage', {
          message: '退群成功'
        })
        if (groupID === this.groupProfile.groupID) {
          this.$store.commit('resetCurrentConversation')
        }
      })
        .catch(error => {
          this.$store.commit('showMessage', {
            type: 'error',
            message: error.message
          })
        })
    },
    dismissGroup() {
      this.tim.dismissGroup(this.groupProfile.groupID).then(({ data: { groupID }}) => {
        this.$store.commit('showMessage', {
          message: `群：${this.groupProfile.name || this.groupProfile.groupID}解散成功！`,
          type: 'success'
        })
        if (groupID === this.groupProfile.groupID) {
          this.$store.commit('resetCurrentConversation')
        }
      })
        .catch(error => {
          this.$store.commit('showMessage', {
            type: 'error',
            message: error.message
          })
        })
    },
    editMessageRemindType() {
      this.tim
        .setMessageRemindType({
          groupID: this.groupProfile.groupID,
          messageRemindType: this.messageRemindType
        })
        .then(() => {
          this.showEditMessageRemindType = false
        })
        .catch(error => {
          this.$store.commit('showMessage', {
            type: 'error',
            message: error.message
          })
        })
    },
    editNameCard() {
      if (this.nameCard.trim().length === 0) {
        this.$store.commit('showMessage', {
          message: '不能设置空的群名片',
          type: 'warning'
        })
        return
      }
      this.tim
        .setGroupMemberNameCard({
          groupID: this.groupProfile.groupID,
          nameCard: this.nameCard.trim()
        })
        .then(() => {
          this.showEditNameCard = false
        })
        .catch(error => {
          this.$store.commit('showMessage', {
            type: 'error',
            message: error.message
          })
        })
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/base.scss';

.group-info-content {
	padding: 10px 10px;
	.avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}
}
.info-item {
	margin-bottom: 12px;
	.label {
		font-size: 14px;
		color: $secondary;
	}
	.content {
		color: $background;
		word-wrap: break-word;
		word-break: break-all;
	}
	.long-content {
		word-wrap: break-word;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
	}
}
.cursor-pointer {
	cursor: pointer;
}

/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}
</style>
