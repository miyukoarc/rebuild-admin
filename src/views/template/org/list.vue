<template>
  <div class="p-3">
      <div class="h3">
          {{currOrgTemplate.name}}
      </div>
      <br>
      <common-table
        :columns="departmentColumns"
        :data="departmentTemplates"
        :showPagin="false"
        :showCheckBox="false"
        border
      ></common-table>

      <common-table
        :columns="menuColumns"
        :data="menuTemplates"
        :showPagin="false"
        :showCheckBox="false"

        border
      ></common-table>

      <common-table
        :columns="roleColumns"
        :data="roleTemplates"
        :showPagin="false"
        :showCheckBox="false"

        border
      ></common-table>

      <!-- <mini-table>

      </mini-table> -->
  </div>
</template>

<script>
import CommonTable from '@/components/CommonTable'
// import MiniTable from '@/components/MiniTable'
import {mapState} from 'vuex'
export default {
    components: {
        CommonTable,
        // MiniTable
    },
    data (){
        return {
            departmentColumns:[
                {
                    visible: true,
                    label: '名称',
                    prop: 'name',
                    sort: false,
                    align: 'center'
                },
                {
                    visible: true,
                    label: 'Code',
                    prop: 'code',
                    sort: false,
                    align: 'center'
                },
                {
                    visible: true,
                    label: '创建时间',
                    prop: 'createdAt',
                    sort: false,
                    align: 'center'
                }
            ],
            menuColumns:[
                {
                    visible: true,
                    label: '名称',
                    prop: 'name',
                    sort: false,
                    align: 'center'
                },
                {
                    visible: true,
                    label: 'Code',
                    prop: 'code',
                    sort: false,
                    align: 'center'
                },
                {
                    visible: true,
                    label: '创建时间',
                    prop: 'createdAt',
                    sort: false,
                    align: 'center'
                }
            ],
            roleColumns:[
                {
                    visible: true,
                    label: '名称',
                    prop: 'name',
                    sort: false,
                    align: 'center'
                },
                {
                    visible: true,
                    label: 'Code',
                    prop: 'code',
                    sort: false,
                    align: 'center'
                },
                {
                    visible: true,
                    label: '创建时间',
                    prop: 'createdAt',
                    sort: false,
                    align: 'center'
                }
            ]
        }
    },
    computed: {
        ...mapState({
            currOrgTemplate: state => state.orgTemplate.currOrgTemplate,
            departmentTemplates: state => state.orgTemplate?.currOrgTemplate?.departmentTemplates,
            roleTemplates: state => state.orgTemplate?.currOrgTemplate?.departmentTemplates,
            menuTemplates: state => state.orgTemplate?.currOrgTemplate?.departmentTemplates
        })
    },
    created(){
        this.initData()
    },
    mounted (){

    },
    methods:{
        initData(){
            this.$store.dispatch('orgTemplate/orgTemplateQueryByCode',this.$route.params.org)
            .then(()=>{}).catch((err)=>{
                console.log(err)
            })
        },
        handleRowClick(){}
    }

}
</script>

<style>

</style>