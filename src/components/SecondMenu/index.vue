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
      },
      $route:{
        handler(newVal,oldVal){
          if(newVal!=oldVal){
            this.checkOutSecond(newVal.path)
          }
          

        },
        deep: true,
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
      console.log(this.type)
    },
    methods:{
      checkOutSecond(path){
        if(path.includes('/im_friend')){
          path = 1
        }else
        if(path.includes('/im_conversation')){
          path = 2
        }else
        if(path.includes('/human_resource')){
          path = 3
        }else
        if(path.includes('/state_setting')){
          path = 4
        }


        

        switch(path){
          case 1:
            this.getFriend();
            break;
          case 2:
            this.getConversation()
            break;
          case 3:
            this.getHumanResource()
            break;
          case 4: 
            this.getStateMachine()
            break;
          default:
            console.log('默认')
            this.$store.commit('secondMenu/TOGGLE_STATE',false)
        }
      },
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