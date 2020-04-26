<script>
export default {
    props: ['msg'],
    functional: true,
    render(h,context){
        const {msg} = context.props
        return (
            <div class="tip-container">
                <h5 class="tips-title"><i class="el-icon-magic-stick"></i><span class="title">提示</span></h5>
                <p>{msg}</p>
            </div>
        )
    }
}
</script>

<style lang="scss" scoped>
.tip-container{
    padding: 15px;
    border-radius: 4px;
    border: 1px dashed #409EFF;
    background-color: #ecf5ff;
}
.tips-title{
    margin: 0 0 15px 0;
}
.title{
    margin-left: 10px;
}
</style>