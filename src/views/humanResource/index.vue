<template>
  <div>
      <router-view :keyt="key"></router-view>
  </div>
</template>

<script>
export default {
    computed:{
        key(){
            return this.$route.fullPath
        }
    }
}
</script>

<style>

</style>