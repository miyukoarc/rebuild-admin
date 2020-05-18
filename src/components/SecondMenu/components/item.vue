<template>
  <div>
    <el-submenu v-if="item.children!=undefined" :index="item.name" popper-append-to-body>
      <template slot="title">
        <span>
          <span
            :class="{'link-active':isLinkActive}"
            v-if="item.code.includes('Template')"
            class="link-hover"
            @click.stop="secondMenuClick(item)"
          >{{item.name}}</span>
          <span v-else>{{item.name}}</span>
        </span>
      </template>
      <sidebar-item v-for="child in item.children" :key="child.name" :item="child"></sidebar-item>
    </el-submenu>
    <el-menu-item
      :index="item.url"
      v-else
      @click="handleClick"
      style="padding-left:40px"
    >{{valString(item)}}</el-menu-item>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getStateMachineDetail } from '@/api/stateSetting'
export default {
  name: 'SidebarItem',
  props: ['item'],
  computed: {
    ...mapState({
      menuType: state => state.secondMenu.menuType,
      menuModule: state => state.secondMenu.menuModule
    }),
    isLinkActive() {
      return
    }
  },
  mounted() {},
  methods: {
    valString(item) {
      if (item.name == undefined) {
        return item
      } else {
        return item.name
      }
    },
    handleClick() {

      switch (this.menuType) {
        case 'transfer':
          // console.log(this.item)
          // this.$route.push('')
          this.$store.commit('secondMenu/SAVE_IFRAMEURL', this.item.url)
          // this.$store.dispatch('stateSettings/GET_STATELIST',this.item)
          // this.$store.commit('stateSettings/SAVE_ENTITY',this.item)
          break
        case 'router':
          this.pushRoute()
          break
      }
      // this.transferQuery(this.menuType)
    },
    secondMenuClick(item) {
      // console.log(item)
      this.$router.push({ url: item.url })
      this.pushRoute()
    },
    pushRoute() {
      // console.log()
      // debugger
      this.$router.push(this.item.url)
    },
    transferQuery(str) {
      // console.log(str)
    }
  }
}
</script>

<style lang="scss">
.link-hover {
  &:hover {
    color: #409eff;
  }
}
</style>