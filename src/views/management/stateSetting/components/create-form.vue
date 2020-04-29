<template>
  <el-form ref="form" label-width="80px">
      <el-form-item label=""></el-form-item>
  </el-form>
</template>

<script>
export default {
    props: {
        formType: 'state'
    },
    data(){
        return {
            formType: 'state',
            formList: [],
            stateForm: {},
            timerForm: {},
            eventForm: {}

        }
    },
    mounted () {
        
    },
    methods: {
        initForm(){
            switch(this.formType){
                case 'state':
                case 'timer':
                case 'event':
                    default:
            }
        }
    }
}
</script>

<style>

</style>