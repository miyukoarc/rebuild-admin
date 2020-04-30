<template>
  <div>
      <el-drawer
        title="我是标题"
        :visible.sync="showDrawer"
        :with-header="false">
        <slot/>
    </el-drawer>
  </div>
</template>

<script>
import FriendDetail from './friend-detail'
export default {
    data (){
        return {}
    }
}
</script>

<style>

</style>