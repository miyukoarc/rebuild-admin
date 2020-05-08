<template functionnal>
  <div>
      <!-- <span class="h4">{{org}}</span><span class="ml-1">{{username}}</span><span class="ml-1">({{mobile}})</span> -->
      <user-btn style="display:inline-block;vertical-align: middle;" class="mr-3"/>
      <el-breadcrumb separator="/" style="display:inline-block;vertical-align: middle;">
        <el-breadcrumb-item >{{org}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{username}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{mobile}}</el-breadcrumb-item>
        </el-breadcrumb>
  </div>
</template>

<script>
import UserBtn from './UserBtn'
export default {
    components: {
        UserBtn,
    },
    props: {
        org:{
            type: String,
            default: '韦恩工业'
        },
        username: {
            type: String,
            default: '布鲁斯·韦恩'
        },
        mobile:{
            type: String,
            default: '13000000'
        }
    }
}
</script>

<style>

</style>