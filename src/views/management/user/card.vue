<template>
  <div class="p-2">
    <div>
      <div class="h5" v-if="customData">{{customData&&customData.nickname}}</div>
      <img width="128" height="128" :src="customData&&customData.headimgurl" />
    </div>
    <div style="text-align:right;">
      <el-button type="text" @click="showTransfer = true">转发</el-button>
      <el-button type="text">详细</el-button>
    </div>

    <el-dialog title="转发" width="600px" :visible.sync="showTransfer" append-to-body>
      <el-form label-width="100px">
        <el-form-item label="转发至">
          <el-select v-model="toAccount" placeholder="请选择">
            <el-option-group
              v-for="selection in options"
              :key="selection.label"
              :label="selection.label"
            >
              <el-option
                v-for="item in selection.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-option-group>
          </el-select>
        </el-form-item>
        <el-form-item label>
          <el-button type="primary" size="small" @click="handleConfirm">确定</el-button>
          <el-button type="danger" size="small" @click="showTransfer = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  props: {
    payload: {
      type: Object
    }
  },
  data() {
    return {
      showTransfer: false,
      toAccount: '',
      conversationType: '', //TIM.TYPES.CONV_C2C//TIM.TYPES.CONV_GROUP
      description: '',
      extendsion: '',
      transferForm: {
        data: '',
        description: '',
        extension: ''
      },
      options: [
        {
          label: '群组',
          options: []
        },
        {
          label: '联系人',
          options: []
        }
      ]
    }
  },
  watch: {
    toAccount: {
      handler(newVal, oldVal) {
        //   console.log(newVal)
        if (newVal.includes('@TGS')) {
          this.conversationType = 'GROUP'
          //   console.log(newVal,'TIM.TYPES.CONV_GROUP')
        }

        if (!newVal.includes('@TGS')) {
          this.conversationType = 'C2C'
          //   console.log(newVal,'TIM.TYPES.CONV_C2C')
        }
      },
      deep: true
      //   immediate:true
    }
  },
  computed: {
      ...mapState({
      eventsMap: state => state.stateSettings.eventsMap,
      currentContact: state => state.contacts.currentContact,
      groupList: state => state['im/group'].groupList,
      friendList: state => state['im/friend'].friendList
    }),
    customData(){
        return JSON.parse(this.payload.data)
    },
    customExtension() {
        return JSON.parse(this.payload.extension)
      
    },
    
  },
  mounted() {
      this.handleSelection()
      console.log(JSON.parse(this.payload.data))
  },
  methods: {
    // customData(){
    //     return JSON.stringfiy(this.payload.data)
    // },
    // customExtension() {
    //     return JSON.stringfiy(this.payload.extension)
      
    // },
    genUrl() {},

    handleSelection() {
      if (this.groupList) {
        this.groupList.forEach(item => {
          this.options[0].options.push({
            label: item.name,
            value: item.groupID
          })
        })
      }
      if (this.friendList) {
        this.friendList.forEach(item => {
          this.options[1].options.push({
            label: item.profile.nick,
            value: item.userID
          })
        })
      }
    },
    sex(gender) {
      if (gender == 'Gender_Type_Unknown' || !gender) {
        return '未知'
      }
      if (gender == 'Gender_Type_Female') {
        return '女'
      }
      if (gender == 'Gender_Type_Male') {
        return '男'
      }
    },
    isEmpty(obj) {
      return isEmpty(obj)
    },
    genLink(url) {
      return '/d/management/user/list?detail=' + url
    },
    handleTransfer() {
      console.log(this.showTransfer)
      this.showTransfer = true
    },
    handleConfirm() {
      this.postCustomMessage()
    },
    postCustomMessage() {
      this.transferForm.data = JSON.stringify(this.currentContact)
      this.transferForm.description = '名片'
      this.transferForm.extension = `/d/management/user/detail?=${this.currentContact.uuid}`

      const message = this.tim.createCustomMessage({
        to: this.toAccount,
        conversationType: this.conversationType,
        payload: {
          ...this.transferForm
        }
      })

      console.log(message)

      this.$store.commit('im/conversation/pushCurrentMessageList', message)

      this.tim.sendMessage(message).catch(error => {
        this.$store.commit('im/setting/showMessage', {
          type: 'error',
          message: error.message
        })
      })
      Object.assign(this.transferForm, {
        data: '',
        description: '',
        extension: ''
      })

      this.showTransfer = false
    }
  }
}
</script>

<style>
</style>