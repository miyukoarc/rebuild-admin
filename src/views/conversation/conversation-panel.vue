<template>
  <div class="panel-conversation">
      <component :is="genComponent('FriendDetail')"/>
  </div>
</template>

<script>
import Example from '@/components/Example'
import FriendDetail from './friend-detail'
export default {
    components:{
        Example,
        FriendDetail
    },
    data(){
        return {

        }
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
    min-width: 400px;
    height:100%;
    overflow-y: scroll;
}

::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}
</style>