<template functionnal>
  <div>
      <span class="h4">{{org}}</span><span class="ml-1">{{username}}</span><span class="ml-1">({{mobile}})</span>
  </div>
</template>

<script>
export default {
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