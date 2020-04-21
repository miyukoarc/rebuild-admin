<template>
    <!-- <el-scrollbar wrap-class="scrollbar-wrapper"> -->
      <el-menu
        :collapse="false"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="true"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="(item,index) in menuList" :key="index||item.name" :item="item" :type="$route.path"/>
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
      menuList:{
        handler(newVal,oldVal){
          console.log(newVal)
        },  
        deep:true,
        immediate:true
      }
    },
    computed:{
      ...mapState({
        menuMap:state=>state.secondMenu.menuMap,
      }),
      variables() {
        return variables
      },
    },
    mounted(){
    },
    methods:{
      getStateMachine(){
        return getStateMachine().then(async res=>{
          this.menuList = await Object.keys(res.items)
          await this.$store.commit('stateSettings/SAVE_STATEMACHINE',res.items)
          console.log(this.menuList)
        })
      },
      getFriend(){
        this.menuList = [
          {
            name:'朋友1'
          }
        ]
      },
      getConversation(){
        this.menuList = [
          {
            name: '会话1'
          }
        ]
      },
      getHumanResource(){
        this.menuList = this.menuMap['/human_resource'].children
        console.log(this.menuMap['/human_resource'].children)
      }


    }
}
</script>

<style lang="scss" scoped>

</style>