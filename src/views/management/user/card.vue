<template>
  <div class="p-2">
    <div>
      <div class="h5">{{customData&&customData.nickname}}</div>
      <img width="128" height="128" :src="customData&&customData.headimgurl" />
    </div>
    <div style="text-align:right;">
      <el-button type="text" @click="showTransfer = true">转发</el-button>
      <!-- <app-link :to="`/d/management/user/list?detail=${customExtension}`"> -->
    <el-button type="text" @click="handleDetail">详细</el-button>
      <!-- </app-link> -->
    </div>

    <el-dialog title="转发" width="600px" :visible.sync="showTransfer" append-to-body :close-on-click-modal="false">
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
import { mapState } from 'vuex'
import AppLink from '@/components/AppLink'

export default {
  props: {
    payload: {
      type: Object
    }
  },
  components: { AppLink },
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
      //   parseData: this.customData
    }
  },
  watch: {
    toAccount: {
      handler(newVal, oldVal) {

        if (newVal.includes('@TGS')) {
          this.conversationType = 'GROUP'

        }

        if (!newVal.includes('@TGS')) {
          this.conversationType = 'C2C'

        }
      },
      deep: true

    }
  },
  computed: {
    ...mapState({
      eventsMap: state => state.stateSettings.eventsMap,
      currentContact: state => state.contacts.currentContact,
      groupList: state => state['im/group'].groupList,
      friendList: state => state['im/friend'].friendList
    }),
    customData() {
        let str
        try{
            str = this.payload.data
            return JSON.parse(str)
        }catch(err){

        }

    },
    customExtension() {
      return this.payload.extension.split('/')[1]
    }
  },
  mounted() {
    this.handleSelection()
  },
  methods: {
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
      this.showTransfer = true
    },
    handleConfirm() {
      this.postCustomMessage()
    },
    postCustomMessage() {
      this.transferForm.data = JSON.stringify(this.currentContact)
      this.transferForm.description = '名片'
      this.transferForm.extension = `user/${this.currentContact.uuid}`

      const message = this.tim.createCustomMessage({
        to: this.toAccount,
        conversationType: this.conversationType,
        payload: {
          ...this.transferForm
        }
      })

      console.log(JSON.stringify(this.currentContact))

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
    },
    handleDetail(){
        this.$bus.$emit('showConversationDetailPanel',this.payload.extension)
    }
  }
}
</script>

<style>
</style>