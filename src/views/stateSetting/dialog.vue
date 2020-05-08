<template>
    <div>
        <el-dialog :title="title" :visible.sync="dialogVisible" :modal-append-to-body="false" append-to-body :width="dialogWidth" >
            <div>
                <component ref="dialogChild" :is="event" :pendingEvent="pendingEvent" :key="event"/>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import CreateState from './components/create-state'
import CreateTimer from './components/create-timer'
import CreateEvent from './components/create-event'
import EditEvent from './components/edit-event'
import EditState from './components/edit-state';
import {mapState} from 'vuex'


export default {
    components:{
        CreateState,
        CreateTimer,
        CreateEvent,
        EditEvent,
        EditState,
    },
  data() {
    return {
      dialogVisible: false,
      event: '',
      title: '',
      type: '',
      payload: null,
      pendingEvent: {}
    };
  },
  watch:{
      payload:{
          handler(newVal,oldVal){
              this.$nextTick(()=>{
                  this.$refs['dialogChild'].initData()
              })
              
          }
      },
      event:{
          handler(newVal,oldVal){
              if(newVal){
                  this.genTitle(newVal)
              }
          },
          immediate: true,
      },
      pendingEvent:{
          handler(newVal,oldVal){
              
              this.pendingEvent = newVal
          },
          deep: true,
          immediate: true
      }
  },
  computed:{
      ...mapState({
      })
  },
  mounted(){},
  methods: {
      genTitle(event){
          if(event=='CreateState'){
              this.title= '添加状态'
              
          }
          if(event=='CreateTimer'){
              this.title ='添加定时器'
              
          }
          if(event=='CreateEvent'){
             this.title= '添加事件'
          }
          if(event=='EditEvent'){
              this.title= '编辑事件'
          }
      }
          
          
      }
  }
  

</script>

<style>
</style>