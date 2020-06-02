<template>
  <el-container>
    <el-form :model="form" ref="form" label-width="80px" inline>
      <!-- <el-form-item>
        <el-input
          v-model="form.name"
          placeholder="搜索"
          size="small"
        ></el-input>
      </el-form-item> -->

      <el-form-item>
          <el-select v-model="currentTable" placeholder="请选择" @change="handleFreshTable">
            <el-option v-for="item in licenseTemplateList" :key="item.uuid" :label="item.name" :value="item.uuid"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button v-waves type="primary" size="small" icon="el-icon-search"
          >搜索</el-button
        >
        <el-button 
        v-waves
        size="small"
        type="primary"
        @click="handleCreate"
        >
        <i class="el-icon-circle-plus-outline"></i>
        添加</el-button>
        <el-button
          v-waves
          type="primary"
          icon="el-icon-refresh"
          size="small"
          class="filter-item ml-2"
          @click="handleFresh"
          >刷新</el-button
        >
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>
import DialogButton from "@/components/DialogButton";
import { mapState, mapMutations, mapActions } from "vuex";
const NAME = "management"

export default {
  components: {
    DialogButton,
    
  },
  data() {
    return {
      form: {
        name: null
      },
      currentTable: 1,//uuid of licenseTemplate
    };
  },
  computed: {
      ...mapState({
        licenseTemplateList: state => state.licenseTemplate.licenseList
    }),
  },
  mounted(){
      console.log(this.licenseTemplateList)
  },
  methods: {
    
    ...mapActions(NAME, ["addRole"]),
    handleFresh(){
        console.log(this.licenseTemplateList)
    },
    handleCreate(){
        this.$bus.$emit('showFormDialog',{type: 'Create',state: true})
        this.$bus.$emit('transferTemplateUuid',{uuid:this.currentTable})
    },
    handleFreshTable(val){
        console.log(val)

        this.$store.dispatch('licensePenalize/getPenalizeList',this.currentTable)
        .then(()=>{})
        .catch(err=>{
            this.$message({
                type: 'error',
                message: err.message || '错误'
            })
        })
    }
  }
};
</script>

<style lang="scss" scoped></style>
