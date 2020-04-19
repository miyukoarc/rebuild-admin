<template>
  <div v-if="!item.hidden" @click="genSecondMenu(item)">
      <app-link :to="item.path">
        <el-menu-item :index="item.name">
          <icon-item :icon="item.meta&&item.meta.icon" :title="item.meta&&item.meta.title" />
        </el-menu-item>
      </app-link>
  </div>
</template>

<script>
import AppLink from './AppLink'
import IconItem from './IconItem'
import {mapState} from 'vuex'
export default {
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    components: {
        AppLink,
        IconItem
    },
    computed:{
        ...mapState({
            secondMenu:state=>state.secondMenu.menuMap,
            hasSecondMenu: state=>state.secondMenu.hasSecondMenu
        })
    },
    mounted(){
        // console.log(item)
    },
    methods:{
        genSecondMenu(item){
            const currSecondMenu = this.secondMenu[item.path]
            console.log(currSecondMenu)
            if(currSecondMenu!=undefined){
                // console.log(this.secondMenu[item.path])
                this.$store.commit('secondMenu/TOGGLE_TYPE',item.path)
                this.$store.commit('secondMenu/SAVE_SECONDMENU',currSecondMenu)
                this.$store.commit('secondMenu/TOGGLE_STATE',true)
            }else this.$store.commit('secondMenu/TOGGLE_STATE', false)
            
            

        }
    }

}
</script>

<style>

</style>