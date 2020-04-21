<template>
  <div :class="{'has-logo':showLogo}">
    <div class="user-btn">
      <user-btn/>
    </div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <!-- <el-menu
        :collapse="true"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
        >
        <sidebar-item v-for="route in accessedRouter.slice(0,accessedRouter.length-1)" :key="route.path" :item="route"/>
     </el-menu> -->

     <el-menu
      :collapse="true"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
     >
     <accessed-item v-for="item in menu" :key="item.code" :item="item"></accessed-item>
    </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>

import { mapGetters,mapState } from 'vuex'
import Logo from './Logo'
import SidebarItem from './components/SidebarItem'
import AccessedItem from './components/AccessedItem'
import UserBtn from './components/UserBtn'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo, UserBtn,AccessedItem },
  computed: {
    ...mapState({
      menu: state=>state.secondMenu.menu
    }),
    ...mapGetters(['accessedRouter','filtedRouter']),
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
