<template>
  <div class="panel-conversation">
      <component :is="genComponent('Example')"/>
  </div>
</template>

<script>
import Example from '@/components/Example'

export default {
    components:{
        Example
    },
    computed: {
    },
    methods: {
        genComponent(val){
            return val+''
        }
    }
}
</script>

<style lang="scss" scoped>
.panel-conversation{
    width: 600px;
    height:100%;
    overflow-y: scroll;
}

::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}
</style>