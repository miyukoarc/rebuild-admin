<template>
  <div v-if="tags.length>1">
    <el-popover ref="popover" width="200" placement="bottom-start" trigger="hover">
      <div>
        <el-tag
        style="margin-left:5px;"
          slot="reference"
          v-for="(item, index) in tags"
          :key="index"
          size="mini"
          type="info"
        >{{ item.name }}</el-tag>
      </div>

      <el-tag
        
        slot="reference"
        v-for="(item, index) in tags.slice(0,1)"
        :key="index"
        size="mini"
        type="info"
      >
        {{ item.name }}
        <sup style="color:#ff4949">&nbsp;&nbsp;{{`${tags.length-1}+`}}</sup>
      </el-tag>
    </el-popover>
  </div>
  <div v-else>
    <el-tag
      slot="reference"
      v-for="(item, index) in tags"
      :key="index"
      size="mini"
      type="info"
    >{{ item.name }}</el-tag>
  </div>
</template>
  
<script>
export default {
  props: ['tags'],
  data() {
    return {
      inputVisible: false,
      inputValue: ''
    }
  },
  mounted() {},
  methods: {
    // handleClose() {
    //     alert('关闭')
    // },
    // showInput() {
    //   this.inputVisible = true
    //   this.$nextTick(_ => {
    //     this.$refs.saveTagInput.$refs.input.focus()
    //   })
    // },
    // handleInputConfirm() {
    //   let inputValue = this.inputValue
    // //   if (inputValue) {
    // //     this.dynamicTags.push(inputValue)
    // //   }
    //   this.inputVisible = false
    //   this.inputValue = ''
    // }
  }
}
</script>

<style lang="scss" scoped>
.tag-input-container {
  display: inline-block;
}
</style>