<template>
  <el-container id="dialog-button">
    <el-button type="primary" @click="show = true" v-bind="$attrs">
      <slot></slot>
    </el-button>

    <el-dialog
      append-to-body
      destroy-on-close
      :visible.sync="show"
      :width="dialogWidth"
      v-bind="$attrs"
    >
    <slot name="dialog">

    </slot>
    </el-dialog>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      show: false
    };
  },
  mounted () {
    this.$bus.$on('closeDialog',_=>{
      this.show = false;
    })
  },
};
</script>

<style lang="scss" scoped>
#dialog-button{
    display:inline-block;
    overflow:unset !important;
}
</style>
