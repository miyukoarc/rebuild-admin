<template>
    <div>
        <el-dialog :title="genTitle()" :visible.sync="dialogVisible" :modal-append-to-body="false" append-to-body width="600px" :close-on-click-modal="false">
            <div>
                <component :is="event" />
            </div>
        </el-dialog>
    </div>
</template>

<script>
import EventDisable from './event-disable.vue'
import EventEnable from './event-enable.vue'
import EventKick from './event-kick.vue'
import {mapState} from 'vuex'
export default {
    components:{
        EventDisable,
        EventKick,
        EventEnable
    },
  data() {
    return {
      dialogVisible: false,
      event: 'EventDisable',
      eventType: ''
    };
  },
  watch:{
      eventType:{
          handler(newVal,oldVal){
              if(newVal){
                  this.genTitle()
              }
          },
          immediate: true,
      }
  },
  computed:{
      ...mapState({
          eventsMap: state => state.stateSettings.eventsMap
      })
  },
  mounted(){
      
      
  },
  updated(){
    //   console.warn(this.genTitle())
  },
  methods: {
      genTitle(){
          if(this.eventsMap['user']){
              for(let key of this.eventsMap['user']){
              if(key.code == this.eventType){
                  return key.name
              }
          }
          }
          
          
      }
  }
  
};
</script>

<style>
</style>