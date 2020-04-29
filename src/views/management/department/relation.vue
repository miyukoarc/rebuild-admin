
<template>
  <div class="card-container">
      <el-timeline>
          <el-timeline-item v-if="!isEmpty(currentParent)">
              <div>
                  <h5>{{currentParent.name}}</h5>
              </div>
          </el-timeline-item>
          <el-timeline-item type="primary" size="large">
              <div>
                  <h4>{{currentDetail.name}}</h4>
              </div>
          </el-timeline-item>
          <el-timeline-item v-if="!isEmpty(currentChildren)">
              <div class="child-container">
                  <h5 v-for="item in currentChildren" :key="item.uuid">{{item.name}}</h5>
              </div>
          </el-timeline-item>
      </el-timeline>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {isEmpty} from '@/utils/normal'
export default {
    data(){
        return {

        }
    },
    computed:{
        ...mapState({
            currentParent: state => state.department.currentParent,
            currentChildren: state => state.department.currentChildren,
            currentDetail: state => state.department.currentDetail
        }),
        
    },
    mounted(){

    },
    methods: {
        isEmpty(obj){
            return isEmpty(obj)
        }
    }
}
</script>

<style lang="scss" scoped>
.card-container{
    padding: 15px 0;
}
.child-container{
    display: flex;
}
</style>