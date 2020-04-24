<template>
  <el-container>
    <el-aside width="200px" class="p-3">
      <el-input
        placeholder="输入关键字进行过滤"
        v-model="filterText"
        size="small"
      >
      </el-input>
      <m-tree :datalist="datalist" class="mt-2" />
    </el-aside>
    <el-container>
      <el-header height="">
        <!-- Header content -->
      </el-header>
      <el-main height="">
        <mTable :columns="columns" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import mTree from "./tree";
import mTable from "@/components/CommonTable";
export default {
  components: {
    mTree,
    mTable
  },
  data() {
    return {
      datalist: [
        {
          label: "天邮平台中心",
          children: [
            {
              label: "运营部"
            },
            {
              label: "技术部"
            }
          ]
        },
        {
          label: "天邮平台中心",
          children: [
            {
              label: "运营部"
            },
            {
              label: "技术部"
            }
          ]
        },
        {
          label: "天邮平台中心",
          children: [
            {
              label: "运营部"
            },
            {
              label: "运维部"
            }
          ]
        }
      ],
      columns: [
        {
          visible: true,
          label: "姓名",
          prop: "name",
          uuid: 1,
          align: "center"
        },
        {
          visible: true,
          label: "职务",
          prop: "name",
          uuid:2,
          align: "center"
        },
        ,
        {
          visible: true,
          label: "部门",
          prop: "name",
          uuid: 3,
          align: "center"
        },
        {
          visible: true,
          label: "手机",
          prop: "phone",
          uuid: 4,
          align: "center"
        },
        {
          visible: true,
          label: "邮箱",
          prop: "email",
          uuid: 5,
          align: "center"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped></style>
