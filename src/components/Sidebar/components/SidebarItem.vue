<template>
  <div v-if="!item.hidden">
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
    methods:{
        isUrl(str){
            if(str.includes('http')){
                return '#'
            }else{
                return str
            }
        }
    }

}
</script>

<style>

</style>