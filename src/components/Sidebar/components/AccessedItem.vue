<template>
  <div @click="genSecondMenu(item)">
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
export default {
    name: 'AccessedItem',
    components:{
        AppLink,
        IconItem
    },
    props: {
        item: Object,
        required: true
    },
    methods: {
        genSecondMenu(item){
            console.log(item.url)
        },
        checkSecondMenuType(){

        },
        filterPath(url){
            if(url.includes('http')){
                return '#'
            }else return '/accessed'+url
            
        }
    }
}
</script>

<style>

</style>