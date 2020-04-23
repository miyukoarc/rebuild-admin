<template>
  <div>
    <el-form label-width="100px" label-position="left" :model="updateForm" :rules="rules">
        <el-form-item label="名称" prop="name">
            <el-input v-model="updateForm.name"></el-input>
        </el-form-item>
        <el-form-item label="Code" prop="code">
            <el-input v-model="updateForm.code"></el-input>
        </el-form-item>
        <el-form-item label="parent" prop="code">
            <!-- <el-select v-model="value" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select> -->
        </el-form-item>
        <el-form-item label="关系">
            <relation-card></relation-card>
        </el-form-item>
        <el-form-item label="管理员">
            <div>manager</div>
        </el-form-item>
        <el-form-item label="成员">
            <div>user</div>
        </el-form-item>
        <el-form-item label="删除">
          <el-button type="danger" size="mini" @click="handleDel">删除</el-button>
        </el-form-item>
        <el-form-item>
            <el-button size="small" type="primary" @click.native="handleConfirm">确定</el-button>
            <el-button size="small" type="success">返回</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import RelationCard from './card'
export default {
    components:{
        RelationCard
    },
    data(){
    return{
        updateForm:{
            name: '',
            code: '',
            org: '',
            parent: '',
            uuid: ''
        },
        rules: {
            name:[
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          code: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
        }
    }   
    },
    watch:{
        currentDetail:{
            handler(newVal,oldVal){
                // console.log(newVal)
                this.initData()
            },
            deep:true,
            immediate:true
        }
    },
    computed:{
        ...mapState({

            currentDetail: state=>state.department.currentDetail
        })
    },
    mounted(){
        this.initData()
    },
    beforeUpdate(){
        console.log('数据马上更新')
    },
    updated(){
        console.log('数据更新了')
    },
    methods:{
        handleConfirm(){

        },
        handleDel(){
        this.$confirm('是否删除当前部门', 'Warning',{
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        }).then(async ()=>{
            await this.$store.dispatch('department/deleteDepartment',{uuid:this.currentDetail.uuid}).then(_=>{
                this.$store.dispatch('department/getDepartment')
            })
            // console.log()
            this.$router.replace(this.$route.path)
            this.$message({
                type:'success',
                message:'删除成功'
            })
            
        }).catch(err=>{
            console.log(err)
        })
        },
        initData(){
            this.updateForm.uuid = this.currentDetail.uuid
            this.updateForm.name = this.currentDetail.name
            this.updateForm.code = this.currentDetail.code
        }
    }
}
</script>

<style>
</style>