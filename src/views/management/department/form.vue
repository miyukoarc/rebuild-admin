<template>
  <div>
    <el-form label-width="100px" label-position="left" :model="updateForm" :rules="rules">
        <el-form-item label="名称" prop="name">
            <el-input v-model="updateForm.name"></el-input>
        </el-form-item>
        <el-form-item label="Code" prop="code">
            <el-input v-model="updateForm.code"></el-input>
        </el-form-item>
        <el-form-item label="上级" prop="code">
            <el-select v-model="updateForm.parent" placeholder="请选择">
                <el-option
                v-for="item in allDepartments"
                :key="item.code"
                :label="item.name"
                :value="item.uuid">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="管理员">
            <el-select v-model="setManagerForm.managerId">
                <el-option
                    v-for="item in employeeList"
                    :key="item.uuid"
                    :label="item.nickname"
                    :value="item.uuid"
                ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="关系">
            <relation-card></relation-card>
        </el-form-item>
        
        <el-form-item label="成员">
            <div v-if="!isEmpty(currentDetail.users)">
                <el-tag style="margin-right:3px;" v-for="user in currentDetail.users" :key="user.uuid" size="mini">{{user.nickname}}</el-tag>
            </div>
        </el-form-item>
        <el-form-item label="删除">
          <el-button type="danger" size="mini" @click.native="handleDel">删除</el-button>
        </el-form-item>
        <el-form-item>
            <el-button size="small" type="primary" @click.native="handleConfirm">确定</el-button>
            <el-button size="small" type="success" @click.native="handleClose">返回</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState,mapGetters } from 'vuex'
import RelationCard from './card'
import {isEmpty} from '@/utils/normal'
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
        setManagerForm: {
            managerId: '',
            departmentId: ''
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
                this.initData()
            },
            deep:true,
            immediate:true
        }
    },
    computed:{
        ...mapState({
            org:state =>state.user.info.org,
            currentParent: state => state.department.currentParent,
            employeeList: state => state.employee.employeeList,
            allDepartments: state=>state.department.allDepartments,
            currentDetail: state=>state.department.currentDetail
        }),
        ...mapGetters(['showRightPanel'])
    },
    mounted(){
        this.initData()
    },
    beforeUpdate(){
    },
    updated(){
    },
    methods:{
        isEmpty(obj){
            return isEmpty(obj)
        },
        handleClose(){
            this.$store.commit('component/TOGGLE_PANEL', false)
        },
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

                this.$router.replace(this.$route.path)
                this.$message({
                    type:'success',
                    message:'删除成功'
                })

            }).catch(err=>{
                this.$message({
                    type: 'error',
                    message: err.error
                })
            })
            
            
        }).catch(err=>{
            console.log(err)
        })
        },
        initData(){
            const currentManager = this.currentDetail.manager
            this.setManagerForm.departmentId = this.currentDetail.uuid
            this.updateForm.org = this.org.uuid
            this.updateForm.uuid = this.currentDetail.uuid
            this.updateForm.name = this.currentDetail.name
            this.updateForm.code = this.currentDetail.code
            if(this.currentParent.uuid){
                this.updateForm.parent = this.currentParent.uuid
            }
            if(!this.isEmpty(currentManager)){
                alert('不空')
                this.setManagerForm.managerId = currentManager.uuid
            }
        }
    }
}
</script>

<style>
</style>