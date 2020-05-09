<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <div class="second-part">

        <div class="menu-container" v-if="hasSecondMenu">
          <second-menu></second-menu>
        </div>
        <router-view style="flex:1;" :key="key" />
      </div>
      
    </transition>
  </section>
</template>

<script>
import SecondMenu from '@/components/SecondMenu'
import {mapState} from 'vuex'
export default {
  name: 'AppMain',
  components:{
    SecondMenu
  },
  computed: {
    ...mapState({
      hasSecondMenu: state => state.secondMenu.hasSecondMenu
    }),
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/index.scss";
.second-part{
  display: flex;
  height: 100%;

}
.menu-container{
  width: 200px;
  .el-menu{
    height:100%;
  }
}
.app-main {
  /*50 = navbar  */
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header+.app-main {
  padding-top: 55px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
