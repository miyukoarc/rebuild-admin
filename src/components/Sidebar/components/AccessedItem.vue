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
      ...mapGetters(['hasSecondMenu'])
  },
  methods: {
    ...mapState({
    //   hasSecondMenu: state => state.secondMenu.hasSecondMenu,
      menuType: state => state.secondMenu.menuType
    }),
    ...mapMutations('secondMenu', ['TOGGLE_TYPE', 'TOGGLE_STATE']),
    handleSecondMenu(item) {
      this.classifyUrl(item.url)
    },
    checkSecondMenuType(type) {
      switch (type) {
        // case 'store':
        //  this.$store.commit('secondMenu/TOGGLE_STATE',false)
        //   break;
        case 'friend':
          if(this.menuType!='transfer'){
            this.TOGGLE_TYPE('transfer')
          }
          this.$store.commit('secondMenu/TOGGLE_STATE',true)
          break;
        case 'conversation':
            if(this.menuType!='transfer'){
                this.TOGGLE_TYPE('transfer')
            }
          this.$store.commit('secondMenu/TOGGLE_STATE',true)
          break;
        case 'management':
            if(this.menuType!='router'){
                this.TOGGLE_TYPE('router')
            }
          this.$store.commit('secondMenu/TOGGLE_STATE',true)
          break;
        default:
          this.TOGGLE_TYPE('transfer')
          this.$store.commit('secondMenu/TOGGLE_STATE',false)
          break;
      }
      window.localStorage.setItem('hasSecondMenu',this.hasSecondMenu)
    },
    filterPath(url) {
      if (url.includes('http')) {
        return '#'
      } else return '/accessed' + url
    },
    classifyUrl(url) {
      let key
      if (!url.includes('http')) {
        key = url.split('/')[1]
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