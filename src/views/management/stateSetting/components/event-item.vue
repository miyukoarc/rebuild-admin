<template>
  <div class="container">
      <!-- <div class="title">{{name}}</div> -->
      <div class="property-item" v-for="(item,index) in formList" :key="index">
          <span>{{item[1]}}</span>
      </div>
  </div>
  
</template>

<script>
export default {
  props: {
      classify: {
          type: String,
          default: ""
      },
      eventName: {
          type: String,
          default: ""
      },
      btn:{
          type: Boolean,
          default: false
      }
  },
  data() {
    return {
      state: ['1'],
      form: {
        name: 'string',
        action: 'string',
        code: 'string',
        description: 'string',
        entity: 'string',
        guardSpel: 'string'
      },
      formList: []
    }
    },
    computed: {
        name(){
            return this.eventName
        }
    },
    mounted () {
        this.formList = Object.entries(this.form)
    },
    methods: {
    }
  }

</script>

<style lang="scss" scoped>
@import '@/styles/base.scss';
.container{
    display: flex;
}
.title{
    padding: 10px;
    border-right:1px solid #e9e9e9 ;

}

.property-item{
    padding: 10px;
    flex: 1;
    border-right:1px solid #e9e9e9 ;
}
</style>