<template>
  <el-container>
      <el-aside width="200px" class="p-3">
          <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText"
            size="small"
            >
        </el-input>
        <m-tree :datalist='datalist' class="mt-2"/>
      </el-aside>
      <el-container>
          <el-header height="">
              <!-- Header content -->
          </el-header>
          <el-main height="">
              <mTable/>
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
    mTable,
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
      ]
    };
  }
};
</script>

<style lang="scss" scoped></style>
