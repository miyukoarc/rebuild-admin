import {
  titleNotify
} from '@/utils'

const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  accessedRouter: state => state.permission.accessedRouter,
  department: state => state.department.department,
  hasSecondMenu: state => state.secondMenu.hasSecondMenu,
  showRightPanel: state => state.component.showRightPanel,
  showConversationProfile: state => state.component.showConversationProfile
}

export default getters
