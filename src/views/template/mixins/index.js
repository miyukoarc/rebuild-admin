import {mapState} from 'vuex'

export default {
    data(){
        return {
        }
    },
    computed: {
        ...mapState({
            currOrgTemplate: state =>state.orgTemplate.currOrgTemplate
        })
    },
    watch: {
      currOrgTemplate:{
        handler(newVal,oldVal){
            // console.log(newVal)
        },
      }
    },
    async mounted () {
            await this.getCurrentOrgTemplate()
    },
    methods:{
        getCurrentOrgTemplate(){
            const payload = this.$route.params.org
            this.$store.dispatch('orgTemplate/orgTemplateQueryByCode',payload).then(()=>{
                console.log('获取企业模板')
            }).catch(err=>{
                console.log(err)
            })
        }
    }
}