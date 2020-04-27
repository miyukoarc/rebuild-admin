<template>
    <el-table
    :data="department"
    style="width: 100%"
    row-key="id"
    border
    lazy
    :load="load"
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
  >
    <el-table-column prop="name" label="日期" width="180"></el-table-column>
    <el-table-column prop="name" label="姓名" width="180"></el-table-column>
    <el-table-column prop="address" label="地址"></el-table-column>
  </el-table>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
    data() {
        return {
            
        }
    },
    computed: {
        ...mapState('department',['department']),
        // ...mapGetters(["department"])
    },
    mounted () {
        this.getDepartment();
    },
    methods: {
        ...mapActions('department',['getDepartment'])
    },
}
</script>

<style lang="scss" scoped>
</style>