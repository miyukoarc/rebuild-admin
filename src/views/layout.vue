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
import { mapState, mapMutations } from 'vuex'
// import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  watch: {
    $route: {
      handler(newVal, oldVal) {

        console.log(newVal, '<-------------------->')
        this.handleSecondMenu(newVal.path)
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    ...mapState({
      menuType: state => state.secondMenu.menuType,
      menuMap: state => state.secondMenu.menuMap
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
  mounted() {
    // console.log(this.$route)
  },
  methods: {
    ...mapMutations('secondMenu', ['TOGGLE_TYPE', 'TOGGLE_STATE']),
    handleSecondMenu(item) {
      this.classifyUrl(item)
    },
    checkSecondMenuType(type) {
      //   console.log('第一次判断',type)
      const keys = Object.keys(this.menuMap)

      const hasStatus = keys.some(item => {
        return type == item
      })

      if (type) {
        if (
          type != 'friend' &&
          type != 'conversation' &&
          type != 'management' &&
          hasStatus
        ) {
          type = 'menu'
        }
      } else {
        type = 'iframe'
      }

      switch (type) {
        case 'iframe':
          if (this.menuType != 'transfer') {
            this.TOGGLE_TYPE('transfer')
          } //定义二级菜单'路由'功能
          if (this.menuMap[this.$route.params.modules]) {
            this.$store.commit('secondMenu/TOGGLE_STATE', true)
            this.$store.commit(
              'secondMenu/SAVE_SECONDMENU',
              this.menuMap[this.$route.params.modules].children
            )
            this.$store.commit(
              'secondMenu/SET_OPENARR',
              this.menuMap[this.$route.params.modules].children
            )
          } else {
            this.$store.commit('secondMenu/TOGGLE_STATE', false)
            // this.$store.commit('secondMenu/SAVE_SECONDMENU', this.menuMap[this.$route.params.modules].children)
            // this.$store.commit('secondMenu/SET_OPENARR', this.menuMap[this.$route.params.modules].children)
          }

          this.$store.commit('secondMenu/SAVE_MODULE', type)
          break
        case 'menu':
          if (this.menuType != 'router') {
            this.TOGGLE_TYPE('router')
          } //定义二级菜单'路由'功能
          if (this.menuMap[this.$route.params.modules]) {
            this.$store.commit('secondMenu/TOGGLE_STATE', true)
            this.$store.commit(
              'secondMenu/SAVE_SECONDMENU',
              this.menuMap[this.$route.params.modules].children
            )
            this.$store.commit(
              'secondMenu/SET_OPENARR',
              this.menuMap[this.$route.params.modules].children
            )
          } else {
            this.$store.commit('secondMenu/TOGGLE_STATE', false)
            // this.$store.commit('secondMenu/SAVE_SECONDMENU', this.menuMap[this.$route.params.modules].children)
            // this.$store.commit('secondMenu/SET_OPENARR', this.menuMap[this.$route.params.modules].children)
          }

          this.$store.commit('secondMenu/SAVE_MODULE', type)
          break

        case 'friend':
          if (this.menuType != 'transfer') {
            this.TOGGLE_TYPE('transfer')
          } //定义耳机菜单'传值功能'
          this.$store.commit('secondMenu/TOGGLE_STATE', true)
          this.$store.commit('secondMenu/SAVE_SECONDMENU', [{ name: '小明' }]) //储存当前二级菜单
          this.$store.commit('secondMenu/SAVE_MODULE', type)
          break

        case 'conversation':
          if (this.menuType != 'transfer') {
            this.TOGGLE_TYPE('transfer')
          }
          this.$store.commit('secondMenu/TOGGLE_STATE', true) //渲染二级菜单
          this.$store.commit('secondMenu/SAVE_SECONDMENU', [{ name: '消息1' }])
          this.$store.commit('secondMenu/SAVE_MODULE', type)
          break
        case 'management':
          if (this.menuType != 'router') {
            this.TOGGLE_TYPE('router')
          } //定义二级菜单'路由'功能

          this.$store.commit('secondMenu/TOGGLE_STATE', true)
          this.$store.commit(
            'secondMenu/SAVE_SECONDMENU',
            this.menuMap[this.$route.params.modules].children
          )
          this.$store.commit('secondMenu/SAVE_MODULE', type)

          break

        case 'stateSetting':
          if (this.menuType != 'router') {
            this.TOGGLE_TYPE('router')
          } //定义二级菜单'路由'功能

          this.$store.commit('secondMenu/TOGGLE_STATE', true)
          this.$store.commit(
            'secondMenu/SAVE_SECONDMENU',
            this.menuMap[this.$route.params.modules].children
          )
          this.$store.commit('secondMenu/SAVE_MODULE', type)
          break
        default:
          //   console.log(type)
          this.TOGGLE_TYPE('transfer')
          this.$store.commit('secondMenu/TOGGLE_STATE', false)
          // this.$store.commit('secondMenu/SAVE_SECONDMENU',this.menuMap[type])
          break
      }
      // window.localStorage.setItem('hasSecondMenu',this.hasSecondMenu)
    },
    classifyUrl(url) {
      const temp = url

      let key = temp.split('/')[2]

      this.checkSecondMenuType(key)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
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
  width: calc(100% - #{$sideBarWidth});
}

.mobile .fixed-header {
  width: 100%;
}
</style>
