<template>
  <div ref="rightPanel" :class="{show:showRightPanel}" class="rightPanel-container" >
    <div class="rightPanel-background" />
    <div class="rightPanel">
      <div class="rightPanel-items">
        <slot/>
      </div>
      <div />
    </div>
  </div>
</template>

<script>
import { addClass, removeClass } from '@/utils/index.js'
import { mapState, mapGetters } from 'vuex'
export default {
  data(){
    // show：true,
    return {
      show: true
    }
  },
  computed: {
    ...mapGetters(['showRightPanel'])
  },
  watch: {
    'showRightPanel': {
      handler(newVal, oldVal) {
        if (newVal) {
          this.addEventClick()
        }
        if (oldVal) {
          window.removeEventListener('click', this.closeSidebar)
        }
      }, immediate: true
    }
  },
  mounted() {
    this.insertToBody()
  },
  beforeDestroy() {
    const elx = this.$refs.rightPanel
    elx.remove()
  },
  methods: {
    toggle() {
      this.$store.commit('component/TOGGLE_PANEL', !stateSetting_editor_show)
    },
    addEventClick() {
      window.addEventListener('click', this.closeSidebar)
    },
    closeSidebar(evt) {
      // console.log(evt.target)
      const parent = evt.target.closest('.rightPanel-background')
      if (parent) {
        this.$store.commit('component/TOGGLE_PANEL', false);
        // this.$emit("isShow");
      }
    },
    insertToBody() {
      const elx = this.$refs.rightPanel
      const body = document.querySelector('body');
      // const isExist = document.querySelector(".rightPanel-container");
      body.insertBefore(elx, body.firstChild)
      // if(!isExist){
      //    body.insertBefore(elx, body.firstChild)
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
.showRightPanel {
  overflow: hidden;
  position: relative;
  width: calc(100% - 15px);
}
.rightPanel-background {
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity .3s cubic-bezier(.7, .3, .1, 1);
  background: rgba(0, 0, 0, .2);
  z-index: -1;
}

.rightPanel {
  width: 100%;
  max-width: 800px;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, .05);
  transition: all .25s cubic-bezier(.7, .3, .1, 1);
  transform: translate(100%);
  background: #fff;
  z-index: 2001;
}

.show {
  transition: all .3s cubic-bezier(.7, .3, .1, 1);

  .rightPanel-background {
    z-index: 2000;
    opacity: 1;
    width: 100%;
    height: 100%;
  }

  .rightPanel {
    transform: translate(0);
  }
}

.handle-button {
  width: 48px;
  height: 48px;
  position: absolute;
  left: -48px;
  text-align: center;
  font-size: 24px;
  border-radius: 6px 0 0 6px !important;
  z-index: 0;
  pointer-events: auto;
  cursor: pointer;
  color: #fff;
  line-height: 48px;
  i {
    font-size: 24px;
    line-height: 48px;
  }
}
.rightPanel-items{
  padding: 60px;
}
</style>
