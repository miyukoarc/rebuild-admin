<template>
  <div>
      状态设置
  </div>
</template>

<script>
export default {
    mounted(){
        this.$store.dispatch('stateSettings/getEventList')
    }
}
</script>

<style>

</style>