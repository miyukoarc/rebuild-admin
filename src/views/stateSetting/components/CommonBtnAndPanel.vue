<template>
  <div id="CommonBtnAndPanel" :class="inline ? 'dispaly-inline' : null">
    <el-button  @click="onBtnClick" v-bind="$attrs">
      {{ labelText }}
    </el-button>
    <panel v-if="oShow">
      <template >
        <StateSettingForm :mType="mType" @submitStateData="submitStateData" :formData="formData"/>
      </template>
    </panel>
  </div>
</template>
<script>
import panel from "./edit-detail";
import StateSettingForm from "./StateSettingForm";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "CommonBtnAndPanel",
  components: {
    panel,
    StateSettingForm,
  },
  props: {
    type: {
      type: String,
      default: "primary"
    },
    mType: {
      type: String,
      default: "event"
    },
    labelText: String,
    inline: {
      type: Boolean,
      default: false
    },
    formData:Object
  },
  data() {
    return {
      oShow:false
    }
  },
  computed: {
    ...mapState("stateSettings",["show"])
  },
  watch:{
    show(val){  
      if(!val){
        this.oShow = false;
      }
    }
  },
  methods: {
    submitStateData(formData) {
      this.$emit("submitStateData",[formData,this.mType]);
      this.$store.commit("stateSettings/TOGGLE_STATE", false);
    },
    onBtnClick(){
      this.$store.commit("stateSettings/TOGGLE_STATE", true);
      this.$emit('onClick');
      this.oShow = true;
    }
  },
  mounted () {
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/base.scss";
</style>
