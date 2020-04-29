<template>
  <div></div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    computed: {
        ...mapState({
        currentConversation: state => state['im/conversation'].currentConversation
    })
    },
    mounted(){},
    methods: {

    }
    

}
</script>

<style>

</style>