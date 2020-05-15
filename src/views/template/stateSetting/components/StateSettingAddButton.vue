<template>
  <div id="StateSettingAddButton"  :class="inline?'dispaly-inline':null"  @click="onClick">
    <slot name="customBtn">
      <el-button :type="type" :size="size" :plain="plain">
        {{ labelText }}
      </el-button>
    </slot>
    <el-dialog
      :title="labelText"
      :visible.sync="showCreateState"
      :close-on-click-modal="false"
      append-to-body
      destroy-on-close
      :width="width"
    >
      <slot name="body">
        <StateSettingForm :mType="mType" @submitStateData="submitStateData" :loading="loading" :stateId="stateId"/>
      </slot>
    </el-dialog>
  </div>
</template>

<script>
import { AddButtonFormType } from "@/utils/commonEnum";
import StateSettingForm from './StateSettingForm';

export default {
  name: "AddButton",
  components: {
      StateSettingForm,
  },
  props: {
    type: {
      type: String,
      default: "primary"
    },
    mType: {
      type: String,
      default: "addEvent"
    },
    labelText: String,
    size:String,
    inline:{
        type:Boolean,
        default:false,
    },
    loading:{
      type:Boolean,
      default:false,
    },
    plain:{
        type:Boolean,
        default:false,
    },
    stateId:{
      type:Number,
      default:null,
    },
    width:{
      type:String,
      default:"500px"
    }
  },
  data() {
    return {
      showCreateState: false,
      showThenAction: false,
      AddButtonFormType,
    };
  },
  computed: {
    //   formDataList() {
    //       if (this.mType==AddButtonFormType.ADDBUTTONEVENT) {
    //           return this.addEventForm;
    //       }else if(this.mType==AddButtonFormType.ADDBUTTONSTATE){
    //           return this.addStateFrom;
    //       }else if(this.mType==AddButtonFormType.ADDBUTTONTIMER) {
    //           return this.addTimerForm;
    //       }
    //   }
  },
  methods: {
    changeDialogState() {
      this.showCreateState = !this.showCreateState;
    },
    onClick() {
      this.changeDialogState();
    },
    onStateChange() {
      if ("CHOICE" == this.addStateForm.stateType) {
        this.showThenAction = true;
      } else {
        this.showThenAction = false;
      }
    },
    submitStateData(val) {
      this.changeDialogState();
      // submit data function
      val.entity = "user"; //实体（从全局获取）
      this.$emit("submitStateData", [val,this.mType]);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/base.scss";

</style>
