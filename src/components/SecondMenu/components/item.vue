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
    },
    pushRoute(){
      this.$route.push(this.item.url)
    },
    transferQuery(){
        
    }
  }

}
</script>

<style>

</style>