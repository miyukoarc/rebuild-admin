<template>
  <el-container class="app-container">
    <el-header height="auto">
        <cHeader/>
    </el-header>
    <el-main height class="pt-0">
      <cTable :columns="columns" :showPagin="false" border />
    </el-main>
  </el-container>
</template>

<script>
import cTable from '@/components/CommonTable'
import cHeader from './header';
export default {
  components: {
    cTable,
    cHeader,
  },
  data() {
    return {
      form: {
        name: ''
      },
      columns: [
        {
          visible: true,
          label: '名称',
          prop: 'name',
          sort: false,
          align: 'center'
        },
        {
          visible: true,
          label: '描述',
          prop: 'describe',
          sort: false,
          align: 'center'
        },
         {
          visible: true,
          label: '创建时间',
          prop: 'created_at',
          sort: false,
          align: 'center'
        },
         {
          visible: true,
          label: '部门',
          prop: 'depart',
          sort: false,
          align: 'center'
        },
        {
          visible: true,
          label: '部门',
          prop: 'depart',
          sort: false,
          align: 'center'
        }
      ]
    }
  },
  methods:{
    initData(){
        
    }
  }
}
</script>

<style lang="scss" scoped>
</style>