<template>
  <el-container>
    <el-form :model="form" ref="form" label-width="80px" inline>
      <el-form-item>
        <el-input
          v-model="form.name"
          placeholder="名称"
          size="small"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button v-waves type="primary" size="small" icon="el-icon-search" 
          >搜索</el-button>
        <dialog-button
          v-waves
          type="primary"
          size="small"
          icon="el-icon-circle-plus-outline"
          class="ml-2"
          width="30%"
          title="添加"
          ref="dialogbutton"
        >
        添加
          <span slot="dialog">
            <addForm @close="onCancel"/>
            <!-- <mForm @onSubmit="onSubmit" @onCancel="onCancel" /> -->
          </span>
        </dialog-button>
        <el-button
          v-waves
          type="primary"
          icon="el-icon-refresh"
          size="small"
          class="filter-item ml-2"
          @click="handleRefresh"
          >刷新</el-button
        >
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>
import DialogButton from "@/components/DialogButton";
import mForm from "./form";
import addForm from './add'
import { mapState, mapMutations, mapActions } from "vuex";
// import
const NAME = "management";
export default {
  components: {
    DialogButton,
    mForm,
    addForm
  },
  data() {
    return {
      form: {
        name: null
      }
    };
  },
  methods: {
    ...mapActions(NAME, ["addRole"]),
    handleRefresh(){
      this.$store.dispatch('department/getDepartmenList').then().catch(err=>{})
    },
    onCancel() {
      this.$refs["dialogbutton"].show = false;
    },
    onSubmit(form) {
      // console.log(form);
      this.addRole(form)
        .then(result => {
          this.$refs["dialogbutton"].show = false;
          this.$message({
            type:'success',
            message:'添加成功'
          })
        })
        .catch(err => {
          this.$message({
            type:'error',
            message:'添加失败'
          })
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
