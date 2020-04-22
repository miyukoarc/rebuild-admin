<template>
  <div class="hideSidebar app-wrapper">
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'
import AppMain from '@/components/AppMain'
import { mapState,mapMutations } from 'vuex'
// import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  watch: {
    $route:{
      handler(newVal,oldVal){
        console.log(newVal.params.modules)
        this.initSecondMenu(newVal.params.modules)
      },
      immediate: true

    }
  },
  computed: {
    ...mapState({
      menuType: state => state.secondMenu.menuType,
      menuMap:state => state.secondMenu.menuMap
    }),
    sidebar() {
      return this.$store.state.app.sidebar
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  mounted(){
    // console.log(this.$route)
  },
  methods: {
    ...mapMutations('secondMenu', ['TOGGLE_TYPE', 'TOGGLE_STATE']),
    initSecondMenu(type){

      if(type){
        if(type!='friend'&&type!='conversation'&&type!='management'){
          type = 'menu'
        }
      }

      switch (type) {
        case 'menu':
          console.log(this.$route.params.modules,this.menuMap[this.$route.params.modules].children)
          if(this.menuType!='router'){
              this.TOGGLE_TYPE('router')
          }//定义二级菜单'路由'功能
          this.$store.commit('secondMenu/TOGGLE_STATE',true)
          this.$store.commit('secondMenu/SAVE_SECONDMENU',this.menuMap[this.$route.params.modules].children)
          this.$store.commit('secondMenu/SET_OPENARR',this.menuMap[this.$route.params.modules].children)
          this.$store.commit('secondMenu/SAVE_MODULE',type)
          break;

        case 'friend':
          if(this.menuType!='transfer'){
            this.TOGGLE_TYPE('transfer')
          }//定义耳机菜单'传值功能'
          this.$store.commit('secondMenu/TOGGLE_STATE',true)
          this.$store.commit('secondMenu/SAVE_SECONDMENU',[{name:'小明'}])//储存当前二级菜单
          this.$store.commit('secondMenu/SAVE_MODULE',type)
          break;

        case 'conversation':
          if(this.menuType!='transfer'){
              this.TOGGLE_TYPE('transfer')
          }
          this.$store.commit('secondMenu/TOGGLE_STATE',true)//渲染二级菜单
          this.$store.commit('secondMenu/SAVE_SECONDMENU',[{name:'消息1'}])
          this.$store.commit('secondMenu/SAVE_MODULE',type)
          break;
        case 'management':
          if(this.menuType!='router'){
              this.TOGGLE_TYPE('router')
          }//定义二级菜单'路由'功能

          this.$store.commit('secondMenu/TOGGLE_STATE',true)
          this.$store.commit('secondMenu/SAVE_SECONDMENU',this.menuMap[this.$route.params.modules].children)
          this.$store.commit('secondMenu/SAVE_MODULE',type)

          break;
        default:
          this.TOGGLE_TYPE('transfer')
          this.$store.commit('secondMenu/TOGGLE_STATE',false)
          // this.$store.commit('secondMenu/SAVE_SECONDMENU',this.menuMap[type])
          break;
      }
      // commit('secondMenu/SAVE_SECONDMENU',this.menuMap[])
    },
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
