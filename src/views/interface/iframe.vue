<template>
  <div style="height:100%">
    <!-- <div>
      <el-button
        type="primary"
        size="small"
        @click="handleCreate"
      >独立窗口(remote)</el-button>

      <el-button
        type="secondary"
        size="small"
        @click="handleCreateIpc"
      >独立窗口(ipcMain)

      </el-button>
    </div> -->
      <div style="width:100%;height:calc(100% - 40px);">
          <iframe id="iframe" :src="currentIframe" frameborder="0" width="100%" height="100%"></iframe>
      </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name: 'IframeView',
  data (){
    return {
      iframeSrc: 'http://10.10.10.199:40000/swagger-ui.html#/structure-show-controller',
      BrowserWindow: null,
    }
  },
  computed:{
      ...mapState({
          currentIframe: state => state.secondMenu.currentIframe
      })
  },
  created(){
  },
  mounted(){},
  methods: {
    handleCreate(){
      if(this.$isElectron){
      const { BrowserWindow } = this.$remote
      // this.$create({ width: 800, height: 600 }).loadURL('https://github.com')
      let win = new BrowserWindow({ width: 800, height: 600 })
      win.loadURL('https://github.com')
    }
    
    
    
    },
    handleCreateIpc(){
      if(this.$isElectron){
        this.$ipcRenderer.send('add')

      }
    }
  },
  mounted(){
    
  }
}
</script>

<style scoped>

::-webkit-scrollbar {
  width: 3px;
  height: 3px;
}
  
/* 滚动槽 */
::-webkit-scrollbar-track {
  border-radius: 10px;
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.1);
}

/* 设置滚动条的样式 */



</style>