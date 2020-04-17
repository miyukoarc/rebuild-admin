<template>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        
        :collapse="true"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in 10" :key="route" />
     </el-menu>
    </el-scrollbar>
</template>
<script>
import variables from '@/styles/variables.scss'
export default {
    data (){
        return {
            
        }
    },
    mounted(){},
    methods:{}
}
</script>