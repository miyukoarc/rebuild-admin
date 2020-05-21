<template>
  <el-container class="app-container">
    <el-header height="auto" style="padding:0">
      <!-- <mHeadedr></mHeadedr> -->
      <list-header></list-header>
    </el-header>

    <el-container>
      <!-- <cTable
        :columns="columns"
        :data="orgTemplateList"
        :showPagin="false"
        :page="page"
        :showCheckBox="false"
        @sortChange="sortChange"
        @pageChange="pageChange"
        @rowClick="handleRowClick"
        border
      />-->
      <el-table
        v-loading="loading"
        :data="departmentTemplates"
        style="width: 100%"
        row-key="uuid"
        border
        lazy
        stripe
        default-expand-all
        class="fill"
        @row-click="handleDetail"
        :tree-props="{ children: 'children' }"
        >
        <el-table-column prop="name" label="名称" align="center"></el-table-column>
        <el-table-column prop="code" label="Code" align="center"></el-table-column>
        <el-table-column prop="createdAt" label="创建时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="240">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click.stop="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click.stop="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-container>

    <right-panel>
      <user-detail />
    </right-panel>

    <form-dialog ref="formDialog"></form-dialog>
  </el-container>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import UserDetail from './detail.vue'
import ListHeader from './header.vue'
import cTable from '@/components/CommonTable'
import FormDialog from './dialog'

export default {
    data() {},
    methods: {
        handleEdit(val) {},
        handleDelete(val) {},
        initData() {
            this.$store.dispatch()
        }
    },
    created (){
        this.initData()
    },
    mounted (){}

}
</script>

<style>

</style>