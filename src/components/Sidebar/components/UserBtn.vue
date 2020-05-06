<template>
  <div class="user-btn">
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img :src="avatar" class="user-avatar" />
        <!-- <i class="el-icon-caret-bottom" /> -->
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <!-- <router-link to="/"> -->
          <el-dropdown-item @click.native="handleShow">Profile</el-dropdown-item>
        <!-- </router-link> -->
        <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
          <el-dropdown-item>Github</el-dropdown-item>
        </a>
        <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
          <el-dropdown-item>Docs</el-dropdown-item>
        </a>
        <el-dropdown-item divided @click.native="logout">
          <span style="display:block;">Log Out</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-dialog title="profile" width="30%" :visible.sync="showProfile" append-to-body>
      <el-form :model="infoForm" label-width="100px" ref="infoForm">
        <el-form-item label="性别">
          <el-input  v-model="infoForm.gender"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="infoForm.nick"></el-input>
        </el-form-item>
        <el-form-item label="签名">
          <el-input v-model="infoForm.selfSignature"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" size="mini" @click="handleConfirm">确定</el-button>
        </el-form-item>
        
      </el-form>
    </el-dialog>
  </div>
</template>
 
<script>
import { mapGetters,mapState } from "vuex";
import { removeToken } from "@/utils/auth";
export default {
    inject: ['reload'],
  data() {
    return {
      showProfile: false,
      infoForm: {
        faceUrl: "string",
        // gender: "Gender_Type_Unknown",
        nick: "string",
        selfSignature: "string",
        uuid: 0
      }
    };
  },
  computed: {
    ...mapGetters(["avatar"]),
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  mounted(){
    this.initForm()
  },
  methods: {
    async logout() {
      // await this.$store.dispatch('im/user/logout').then().catch(err=>{console.log(err)})
      await removeToken();
      await this.clearSig();
      this.$router.push(`/d/login?redirect=${this.$route.fullPath}`);
      this.reload()
    },
    clearSig() {
      window.localStorage.removeItem("userID");
      window.localStorage.removeItem("userSig");
    },
    initForm() {
      this.infoForm.uuid = this.userInfo.uuid
      this.infoForm.nick = this.userInfo.nick
      // this.infoForm.gender = this.userInfo.gender
      this.infoForm.faceUrl = this.userInfo.headimgurl
    },
    handleShow (){
      
      this.showProfile = true
      console.warn(this.showProfile)
    },
    handleConfirm (){
      
      this.$store.dispatch('user/updateUserInfo',this.infoForm).then(()=>{
        this.$message({
          type: 'success',
          message: '提交成功'
        })
      }).catch(err=>{
        console.log(err)
        this.$message({
          type: 'error',
          message: err||err.message
        })
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.user-btn {
  // float: right;
  text-align: center;
  height: 50px;
  line-height: 50px;

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
      margin-top: 5px;
      position: relative;

      .user-avatar {
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 10px;
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