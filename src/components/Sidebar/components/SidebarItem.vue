<template>
  <div v-if="!item.hidden" @click="closeSecondMenu">
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
    name: 'SidebarItem',
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
            hasSecondMenu: state=>state.secondMenu.hasSecondMenu
        })
    },
    mounted(){
    },
    methods:{
        closeSecondMenu(){
            if(this.hasSecondMenu){
                this.$store.commit('secondMenu/TOGGLE_STATE', false)
            }
            
        }
    }

}
</script>

<style>

</style>