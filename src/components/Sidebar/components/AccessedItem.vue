<template>
  <div @click="handleSecondMenu(item)">
    <app-link :to="filterPath(item)">
      <el-menu-item :index="filterPath(item)" class="py-3 px-0">

        <!-- <app-link v-if="item.code==='template'" :to="filterPath(item)">
            <icon-item :icon="item.iconUrl" :title="item.name"></icon-item>
        </app-link> -->

        <icon-item :icon="item.iconUrl" :title="item.name"></icon-item>
        
      </el-menu-item>
    </app-link>
  </div>
</template>

<script>
import AppLink from './AppLink'
import IconItem from './IconItem'
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
  name: 'AccessedItem',
  components: {
    AppLink,
    IconItem
  },
  props: {
    item: Object,
    required: true
  },
  watch: {
    $route: {
      handler(newVal, oldVal) {},
      immediate: true
    }
  },
  computed: {
    ...mapState({
      //   hasSecondMenu: state => state.secondMenu.hasSecondMenu,
      menuType: state => state.secondMenu.menuType,
      menuMap: state => state.secondMenu.menuMap
    }),
    ...mapGetters(['hasSecondMenu'])
  },
  mounted(){
    //   console.log(this.item)
  },
  methods: {
    ...mapMutations('secondMenu', ['TOGGLE_TYPE', 'TOGGLE_STATE']),
    handleSecondMenu(item) {
      //   console.log(item.url)
      this.classifyUrl(item.url)
    },
    checkSecondMenuType(type) {

        console.log(type)

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
      }
      // window.localStorage.setItem('hasSecondMenu',this.hasSecondMenu)
    },
    classifyUrl(url) {
      //   console.log('url',url)
      let key
      if (url.includes('http')) {
        this.$store.commit('secondMenu/SAVE_IFRAMEURL', url)
        key = 'iframe'
      }
      if (this.$route.params.modules) {
        key = this.$route.params.modules
      }
      if (!this.$route.params.modules && !url.includes('http')) {
        key = url.split('/')[2]
      }
      //   console.log(key)
      this.checkSecondMenuType(key)
    },
    filterPath(item) {
      const { url, code } = item
      if (url.includes('iframe')||url.includes('http')) {
        return '/d/iframe/' +code
      }

      if (item.children) {
        return item.children[0].url
      } else return url
    },
    filterIndex(item) {
      const { url, code } = item
      if (url.includes('http')) {
        return '/d/iframe/' + code
      } else return url
    }
  }
}
</script>

<style>
</style>