<template>
  <div>
      <el-submenu v-if="item.children!=undefined" :index="item.name" popper-append-to-body>
        <template slot="title">
          <span>{{item.name}}</span>
        </template>
        <sidebar-item
          v-for="child in item.children"
          :key="child.name"
          :item='child'
          ></sidebar-item>
      </el-submenu>
      <el-menu-item :index="item.url" v-else @click="handleClick">{{valString(item)}}</el-menu-item>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {getStateMachineDetail} from '@/api/stateSetting'
export default {
  name: 'SidebarItem',
  props: ['item'],
  computed:{
    ...mapState({
      menuType: state => state.secondMenu.menuType,
      menuModule: state => state.secondMenu.menuModule
    })
  },
  mounted(){
    console.log(this.item)
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
      // console.log(this.menuType,this.item,this.menuModule)

      switch(this.menuType){
        case 'transfer':
          // this.$store.dispatch('stateSettings/GET_STATELIST',this.item)
          // this.$store.commit('stateSettings/SAVE_ENTITY',this.item)
          break;
        case 'router':
          this.pushRoute()
          break;
      
      }
      // this.transferQuery(this.menuType)
    },
    pushRoute(){
      this.$router.push(this.item.url)
    },
    transferQuery(str){
      // console.log(str)
    }
  }

}
</script>

<style>

</style>