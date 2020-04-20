<template>
  <div>
      <el-submenu v-if="item.children!=undefined" :index="item.name" popper-append-to-body :unique-opened="true">
        <template slot="title">
          <span>{{item.name}}</span>
        </template>
        <sidebar-item
          v-for="child in item.children"
          :key="child.url"
          :item='child'
          ></sidebar-item>
      </el-submenu>
      <el-menu-item v-else @click="handleClick">{{valString(item)}}</el-menu-item>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {getStateMachineDetail} from '@/api/stateSetting'
export default {
  name: 'SidebarItem',
  props: ['item','type'],
  computed:{
    ...mapState({
      menuType: state => state.secondMenu.menuType
    })
  },
  mounted(){
    
  },
  methods:{
    valString(item){
      if(item.name==undefined){
        return item
      }else{
        return item.name
      }
    },
    handleClick(){
      console.log(this.menuType)
      this.transferQuery(this.menuType)
    },
    pushRoute(){
      this.$router.push(this.item.url)
    },
    transferQuery(str){
      switch(str){
        case '/state_setting':
          getStateMachineDetail().then(res=>{
            console.log(res)
          })
          this.$store.commit('stateSettings/SAVE_ENTITY',this.item)
          break;
        case '/human_resource':
          this.pushRoute()
          break;
        case '/im_conversation':
          break;
        case '/im_friend':
          break;
        default: 
          return false;
      }
    }
  }

}
</script>

<style>

</style>