<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <div>
        <span>name: {{ name }}</span>
      </div>


      
      
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CardBoard from '@/components/CardBoard'
export default {
  components: {
    CardBoard
  },
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
