<template>
  <div class="p-3">
    <el-form label-width="100px" label-position="left">
      <el-form-item>
        <div>
          <img width="128" height="128" :src="currentContact.headimgurl" />
        </div>
      </el-form-item>
      <el-form-item label="昵称">
        <!-- <app-link :to="genLink(currentContact.uuid)"> -->
        <!-- <span style="color:#409EFF;">{{currentContact.nickname}}</span> -->
        <el-button type="text" @click="handleDetail">{{currentContact.nickname}}</el-button>
        <!-- </app-link> -->
      </el-form-item>
      <el-form-item label="性别">
        <div>{{sex(currentContact.gender)}}</div>
      </el-form-item>
      <!-- <el-form-item label="状态">
        <div>
          <el-tag
            type="primary"
            size="mini"
          >{{isEmpty(currentContact.state)?'未指定':currentContact.state.name}}</el-tag>
        </div>
      </el-form-item>-->

      <el-form-item label="角色">
        <!-- <div>{{ currentContact.role&&currentContact.role.name }}</div> -->
        <div v-if="currentContact.role">{{currentContact.role.name}}</div>
      </el-form-item>
      <el-form-item label="公司">
        <div v-if="currentContact.org">{{currentContact.org.name}}</div>
      </el-form-item>
      <el-form-item label="部门">
        {{
        isEmpty(currentContact.department)?'未指定':currentContact.department.name
        }}
      </el-form-item>

      <!-- <el-form-item label="手机">
        <div v-if="currentContact.userinfo">{{currentContact.userinfo.mobile}}</div>
      </el-form-item>-->
      <el-form-item
        label="国家/地区"
      >{{isEmpty(currentContact.country)&&isEmpty(currentContact.city)&&isEmpty(currentContact.province)?'未设置':currentContact.country+currentContact.city+currentContact.province}}</el-form-item>

      <el-form-item>
        <el-button type="text" @click="handleTransfer">转发</el-button>
      </el-form-item>

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


    </el-form>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { isEmpty } from '@/utils/normal'
import AppLink from '@/components/AppLink'
export default {
  components: {
    AppLink
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
    })
  },
  mounted() {
    this.handleSelection()
  },
  beforeUpdate() {},
  updated() {},
  methods: {
    handleDetail() {
      const payload = 'user/' + this.currentContact.uuid
      this.$bus.$emit('showConversationDetailPanel', payload)
    },
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