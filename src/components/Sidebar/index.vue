<template>
  <div :class="{'has-logo':showLogo}">
    <div class="user-btn">
      <user-btn/>
    </div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="true"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
        >
        <sidebar-item v-for="route in accessedRouter" :key="route.path" :item="route"/>
     </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './components/SidebarItem'
import UserBtn from './components/UserBtn'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo, UserBtn },
  computed: {
    ...mapGetters(['accessedRouter']),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route

      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
