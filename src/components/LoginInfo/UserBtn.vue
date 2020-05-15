<template>
  <el-container class="user-btn">
    <el-dropdown class="avatar-container" trigger="click" placement="bottom-start">
      <div class="avatar-wrapper">
        <!-- <img :src="avatar" class="user-avatar" /> -->
        <el-avatar :src="avatar" class="user-avatar" :size="40"></el-avatar>
        <!-- <i class="el-icon-caret-bottom" /> -->
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <!-- <router-link to="/"> -->
        <el-dropdown-item @click.native="handleShow">个人信息</el-dropdown-item>
        <!-- </router-link> -->
        <!-- <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
          <el-dropdown-item>Github</el-dropdown-item>
        </a>
        <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
          <el-dropdown-item>Docs</el-dropdown-item>
        </a>-->
        <el-dropdown-item divided @click.native="logout">
          <span style="display:block;">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-dialog
      title="个人信息"
      :width="dialogWidth"
      :visible.sync="showProfile"
      append-to-body
      :close-on-click-modal="false"
    >
      <el-form :model="infoForm" label-width="50px" ref="infoForm" label-position="left">
        <!-- <el-form-item> -->
        <div class="py-3" style="text-align:center;">
          <!-- <img width="128" height="128" :src="infoForm.faceUrl" alt /> -->
          <!-- <a class="btn" >设置头像</a> -->
          <my-upload
            field="file"
            @srcFileSet="srcFileSet"
            @crop-success="cropSuccess"
            @crop-upload-success="cropUploadSuccess"
            @crop-upload-fail="cropUploadFail"
            v-model="show"
            :width="300"
            :height="300"
            url="http://10.10.10.199:40001/v1/upload"
            :params="params"
            :headers="headers"
            img-format="png"
          ></my-upload>
          <el-image
            :src="infoForm.faceUrl"
            @click="toggleShow"
            class="cursor-pointer"
            title="点击重新上传头像"
          />

          <!-- <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-change="handleChange"
            :file-list="fileList">
             <el-image
              style="width: 100px; height: 100px"
              src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" title="点击重新上传头像"></el-image>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>-->
        </div>
        <!-- </el-form-item> -->
        <el-form-item label="性别">
          <el-select v-model="infoForm.gender">
            <el-option
              v-for="item in genderList"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            ></el-option>
          </el-select>
          <!-- <el-input  v-model="infoForm.gender"></el-input> -->
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="infoForm.nick"></el-input>
        </el-form-item>
        <el-form-item label="签名">
          <el-input v-model="infoForm.selfSignature"></el-input>
        </el-form-item>

        <!-- <el-form-item>
          <el-button type="primary" size="mini" @click="handleConfirm">确定</el-button>
        </el-form-item>-->
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="handleConfirm">确定</el-button>
        <el-button>取消</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>
 
<script>
import { mapGetters, mapState } from 'vuex'
import { removeToken } from '@/utils/auth'
import myUpload from 'vue-image-crop-upload'
import { getToken } from '@/utils/auth'
export default {
  inject: ['reload'],
  components: {
    'my-upload': myUpload
  },
  data() {
    return {
      showProfile: false,
      infoForm: {
        faceUrl: 'string',
        gender: 'Gender_Type_Unknown',
        nick: 'string',
        selfSignature: 'string',
        uuid: 0
      },
      genderList: [
        {
          value: 'Gender_Type_Unknown',
          label: '未指定'
        },
        {
          value: 'Gender_Type_Female',
          label: '女'
        },
        {
          value: 'Gender_Type_Male',
          label: '男'
        }
      ],

      /**
       * 头像上传
       */

      show: false,
      params: {
        // file: '',
        name: 'avatar'
      },
      headers: {
        Authorization: 'Bearer ' + this.getToken()
      },
      imgDataUrl: '' // the datebase64 url of created image
    }
  },
  computed: {
    ...mapGetters(['avatar']),
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  mounted() {
    this.initForm()
  },
  methods: {
    getToken() {
      return getToken()
    },
    async logout() {
      // await this.$store.dispatch('im/user/logout').then().catch(err=>{console.log(err)})
      await removeToken()
      await this.clearSig()
      await this.$store.commit('user/RESET_STATE')
      this.$router.push(`/d/login?redirect=${this.$route.fullPath}`)
      this.reload()
    },
    clearSig() {
      window.localStorage.removeItem('userID')
      window.localStorage.removeItem('userSig')
    },
    initForm() {
      this.infoForm.uuid = this.userInfo.uuid
      this.infoForm.nick = this.userInfo.nickname
      this.infoForm.gender = this.userInfo.gender
      this.infoForm.faceUrl = this.userInfo.headimgurl
    },
    handleShow() {
      this.showProfile = true
      console.warn(this.showProfile)
    },
    handleConfirm() {
      this.$store
        .dispatch('user/updateUserInfo', this.infoForm)
        .then(() => {
          this.$store.dispatch('user/getInfo').then(() => {
            this.$message({
              type: 'success',
              message: '提交成功'
            })

            this.showProfile = false
          })
        })
        .catch(err => {
          console.log(err)
          this.$message({
            type: 'error',
            message: err || err.message
          })
        })
    },
    /**
     * 上传头像
     */
    srcFileSet(fileName, fileType, fileSize) {
      console.log(fileName, fileType, fileSize)
    },
    toggleShow() {
      this.show = !this.show
    },
    /**
     * crop success
     *
     * [param] imgDataUrl
     * [param] field
     */
    cropSuccess(imgDataUrl, field) {
      console.log('-------- crop success --------')
      console.log(field)
      this.infoForm.faceUrl = imgDataUrl
      this.params.file = imgDataUrl
    },
    /**
     * upload success
     *
     * [param] jsonData   服务器返回数据，已进行json转码
     * [param] field
     */
    cropUploadSuccess(jsonData, field) {
      console.log('-------- upload success --------')
      console.log(jsonData)
      this.infoForm.faceUrl = 'http://10.10.10.199:40001/v1/file/' + jsonData.id
      console.log('field: ' + field)
    },
    /*console.log
     * upload fail
     *
     * [param] status    server api return error status, like 500
     * [param] field
     */
    cropUploadFail(status, field) {
      console.log('-------- upload fail --------')
      console.log(status)
      console.log('field: ' + field)
    }
  }
}
</script>

<style lang="scss" scoped>
.user-btn {
  // float: right;
  text-align: center;
  // height: 50px;
  // line-height: 50px;

  &:focus {
    outline: none;
  }

  .right-menu-item {
    display: inline-block;
    padding: 0 8px;
    height: 100%;
    font-size: 18px;
    color: #5a5e66;
    vertical-align: text-bottom;

    &.hover-effect {
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }
  }

  .avatar-container {
    .avatar-wrapper {
      // margin-top: 5px;
      // position: relative;

      .user-avatar {
        cursor: pointer;
        // width: 40px;
        // height: 40px;
        // border-radius: 10px;
      }

      .el-icon-caret-bottom {
        cursor: pointer;
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>