<template>
<div class="outer-container">
    <p class="text-align-right">可执行动作</p>
    <div class="container" >
        <span v-for="(item, index) in actionList" :key="index">
             <action-tag type="danger"  size="mini" class="tag-item">{{item.name}}</action-tag>
        </span>
    </div>
</div>
  
</template>

<script>
import {mapState} from 'vuex'
import actionTag from './StateSettingActionTag';
export default {
    components: {
        actionTag,
    },
    data (){
        return {}
    },
    computed:{
        ...mapState({   
            actionList: state => state.stateSettings.actionList
        })
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/base.scss';
.outer-container{
margin: 0px 20px;
}
.container{
    text-align: right;
    
}

.tag-item{
    margin-right: 5px;
}
</style>