<template>
  <el-form :model="form" ref="form" label-width="80px">
    <el-form-item label="名称">
      <el-select
        v-model="form.phone"
        placeholder="请输入关键词"
        remote
        reserve-keyword
        :remote-method="remoteMethod"
        filterable
        :loading="loading"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即添加</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        phone: ''
      },
      options: [],
      loading: false,
      list: [],
      states: [
        'Alabama',
        'Alaska',
        'Arizona',
        'Arkansas',
        'California',
        'Colorado',
        'Connecticut',
        'Delaware',
        'Florida',
        'Georgia',
        'Hawaii',
        'Idaho',
        'Illinois',
        'Indiana',
        'Iowa',
        'Kansas',
        'Kentucky',
        'Louisiana',
        'Maine',
        'Maryland',
        'Massachusetts',
        'Michigan',
        'Minnesota',
        'Mississippi',
        'Missouri',
        'Montana',
        'Nebraska',
        'Nevada',
        'New Hampshire',
        'New Jersey',
        'New Mexico',
        'New York',
        'North Carolina',
        'North Dakota',
        'Ohio',
        'Oklahoma',
        'Oregon',
        'Pennsylvania',
        'Rhode Island',
        'South Carolina',
        'South Dakota',
        'Tennessee',
        'Texas',
        'Utah',
        'Vermont',
        'Virginia',
        'Washington',
        'West Virginia',
        'Wisconsin',
        'Wyoming'
      ]
    }
  },
  mounted() {
    this.list = this.states.map(item => {
      return { value: `value:${item}`, label: `label:${item}` }
    })
  },
  methods: {
    onSubmit() {},
    remoteMethod(query) {
      // if (query !== '') {
      //   this.loading = true
      //   setTimeout(() => {
      //     this.loading = false
      //     this.options = this.list.filter(item => {
      //       return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
      //     })
      //   }, 200)
      // } else {
      //   this.options = []
      // }
      if(query!==''||query.length!=0){

      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>