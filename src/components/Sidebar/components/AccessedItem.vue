<template>
  <div @click="handleSecondMenu(item)">
    <app-link :to="filterPath(item.url)">
      <el-menu-item :index="item.code">
        <icon-item :icon="item.iconUrl" :title="item.name"></icon-item>
      </el-menu-item>
    </app-link>
  </div>
</template>

<script>
import AppLink from './AppLink'
import IconItem from './IconItem'
import { mapState, mapMutations,mapGetters } from 'vuex'

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
  computed: {
    ...mapState({
    //   hasSecondMenu: state => state.secondMenu.hasSecondMenu,
      menuType: state => state.secondMenu.menuType,
      menuMap:state => state.secondMenu.menuMap
    }),
      ...mapGetters(['hasSecondMenu'])
  },
  methods: {
    
    ...mapMutations('secondMenu', ['TOGGLE_TYPE', 'TOGGLE_STATE']),
    handleSecondMenu(item) {
      this.classifyUrl(item.url)
    },
    checkSecondMenuType(type) {
      console.log(this.menuMap,type)
      switch (type) {
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
          this.$store.commit('secondMenu/SAVE_SECONDMENU',this.menuMap[type].children)
          this.$store.commit('secondMenu/SAVE_MODULE',type)

          break;
        default:
          this.TOGGLE_TYPE('transfer')
          this.$store.commit('secondMenu/TOGGLE_STATE',false)
          // this.$store.commit('secondMenu/SAVE_SECONDMENU',this.menuMap[type])
          break;
      }
      // window.localStorage.setItem('hasSecondMenu',this.hasSecondMenu)
    },
    filterPath(url) {
      if (url.includes('http')) {
        return '#'
      } else return url
    },
    classifyUrl(url) {
      let key
      if (!url.includes('http')) {
        key = url.split('/')[2]
      } else {
        key = 'store'
      }
      this.checkSecondMenuType(key)
    }
  }
}
</script>

<style>
</style>