<template>
    <div class="p-3">
        <h3 style="margin: 0 0 20px 0">
        <span style="font-weight:normal">问题管理</span>
        </h3>

        <header-bar></header-bar>


        <div class="table-container">

            <div class="aside">
                <el-table
                    :data="data"
                    style="width: 100%"
                    row-key="uuid"
                    border
                    lazy
                    class="fill"
                    @row-click="handleDetail">
                    <el-table-column type="index" width="35" align="center"></el-table-column>
                    <el-table-column prop="name" label="名称" align="center"></el-table-column>
                    
                </el-table>
            </div>
            <div class="operate-area pl-3">
                <div class="edit">
                    <el-card class="card">
                        <div slot="header">
                            <span>题干</span>
                        </div>

                        <div class="selection-container px-3">
                            <template name="SelectItem">
                                <div class="selection-item" v-for="(item, index) in selections" :key="index">
                                    <h5>{{symbol[index]}}</h5>
                                    <div class="desc pl-3">{{item.text}}</div>
                                </div>
                            </template>
                        </div>
                    </el-card>
                </div>
                <div class="show-off"></div>
            </div>
        </div>

    </div>
</template>

<script>
import HeaderBar from './header'
export default {
    components: {
        HeaderBar
    },
    data (){
        return{
            symbol: ['A','B','C','D','E','F'],
            data: [],
            selections: [
                {
                    text: '选项一'
                },
                {
                    text: '选项二'
                },
                {
                    text: '选项三'
                },
                {
                    text: '选项四'
                }
            ]
        }
    },
    methods:{
        handleDetail(){

        }
    }

}
</script>

<style lang="scss" scoped>
.table-container{
    display: flex;
    .aside{
        width: 400px;
    }
}

.operate-area{
    flex: 1;
}

.edit{
    display: flex;
    .card {
        width: 100%;
    }

}
.selection-container{
    .selection-item
    {
        .desc{

        }
    }
}
</style>