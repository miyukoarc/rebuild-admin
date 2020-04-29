<script>
import {mapState} from 'vuex'
export default {
  props: ["role", "stateList"],
  methods: {
    handleClick() {
      this.$store.commit('stateSettings/SAVE_ROLE',this.role);
      // this.$store.commit('stateSetting/SAVE_CURRENTSTATE',this.stateList)
      // console.log("object");
      // const {role} = this
      // this.$router.push({
      //   path:'/stateSetting',
      //   params:{
      //     entity:role
      //   }
      // })
    }
  },
  computed:{
    ...mapState({
      currentRole: state=>state.stateSetting.currentRole
    })
  },
  render() {
    const {role} = this
    return (
      <el-menu-item class="entity-item-container" class={role==this.currentRole?'active-item':''} onClick={this.handleClick}>
        <div class="entity-name h3">{role}</div>
      </el-menu-item>
    );
  }
};
</script>

<style lang="scss" scoped>
.avatar-container {
  margin-top: 5px;
  width: 40px;
  height: 40px;
}
.entity-item-container {
  cursor: pointer;
  display: flex;
  padding: 0px 20px;
}

.entity-name {
  line-height: 50px;
  margin-left: 10px;
  color: #fff;
}
</style>
