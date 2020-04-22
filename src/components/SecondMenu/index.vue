<template>
    <!-- <el-scrollbar wrap-class="scrollbar-wrapper"> -->
      <el-menu
        :collapse="false"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :default-openeds="openArr"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        :default-active="$route.path"
        mode="vertical"
      >
        <sidebar-item v-for="(item,index) in currSecondMenu" :key="item.url||index" :item="item"/>
     </el-menu>
    <!-- </el-scrollbar> -->
</template>
<script>
import variables from '@/styles/variables.scss';
//

import {getStateMachine} from '@/api/stateSetting'

import SidebarItem from './components/item'
import {mapState} from 'vuex'

export default {
    components:{
      SidebarItem
    },
    data (){
        return {
            menuList: []
        }
    },
    watch: {
      // menuList:{
      //   handler(newVal,oldVal){
      //     console.log(newVal)
      //   },  
      //   deep:true,
      //   immediate:true
      // }
    },
    computed:{
      ...mapState({
        menuType: state=>state.secondMenu.menuType,
        menuMap:state=>state.secondMenu.menuMap,
        currSecondMenu:state => state.secondMenu.currSecondMenu,
        openArr: state=>state.secondMenu.openArr
      }),
      variables() {
        return variables
      },
    },
    mounted(){
    },
    methods:{
      openArray(){

      }

    }
}
</script>

<style lang="scss" scoped>

</style>