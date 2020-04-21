const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  accessedRouter: state=> state.permission.accessedRouter,
  department: state => state.humanResource.department,
  filtedRouter: state=>state.permission.filtedRouter&&state.permission.filtedRouter.children
}
export default getters
