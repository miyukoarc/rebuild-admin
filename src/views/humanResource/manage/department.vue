<template>
  <div>
      <span>部门管理</span>

      <el-tree
      :data="this.department"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"></el-tree>
  </div>
</template>

<script>
import {mapState,mapGetters} from 'vuex'
export default {
  data (){
    return {
      
    }
  },
  computed:{
    // ...mapState({
    //   department: state => state.humanResource.department
    // }),
    ...mapGetters(['department'])
  },
  async mounted(){
    await this.$store.dispatch('humanResource/getDepartment')
  },
  methods: {
  }
}
</script>

<style>

</style>