<template>
    <!-- <div class="back">
        <div class="total">
            <div class="border"> </div>
            <div class="title">
                热度总榜
            </div>
            <div class="body">
                <div class="item">
                    <div class="itemName">山高路远问归期</div>
                    <div class="hotIndex">1523156</div>
                </div>
            </div>
        </div>
        <div class="institution">
            <div class="title">
                知名机构
            </div>
        </div>
    </div> -->
    <div class="paper">
        <el-card class="paperCard">
            <!-- <div class="top-left"></div> -->
            <div class="leftLine"></div>
            <div class="paperTitle">热门文献</div>
            <div class="rightLine"></div>
            <div class="middle"></div>
            <div class="left">
                <div v-for="i in this.leftPapers.length" class="paperItem" @click="this.jump(this.leftPapers[i-1].id)">
                    <div style="position: relative;width: 100%;height: 65%;top: 20%;">
                        <el-text size="large" truncated style="width: 100%;font-size: 16px;font-weight: 800;">{{ this.leftPapers[i-1].name }}</el-text>
                    </div>
                    <div style="position: relative;width: 100%;height: 35%;top: 0%;">
                        <el-text size="small" truncated style="width: 100%;font-size: 12px;font-weight: 400;">{{ this.leftPapers[i-1].author }}</el-text>
                    </div>
                </div>
            </div>
            <div class="right">
                <div v-for="i in this.rightPapers.length" class="paperItem" @click="this.jump(this.leftPapers[i-1].id)">
                    <div style="position: relative;width: 100%;height: 65%;top: 20%;">
                        <el-text size="large" truncated style="width: 100%;font-size: 16px;font-weight: 800;">{{ this.rightPapers[i-1].name }}</el-text>
                    </div>
                    <div style="position: relative;width: 100%;height: 35%;top: 0%;">
                        <el-text size="small" truncated style="width: 100%;font-size: 12px;font-weight: 400;">{{ this.rightPapers[i-1].author }}</el-text>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
import { Hotspots } from '@/api/record';

export default{
    props:{

    },
    data(){
        return{
            leftPapers:[],
            rightPapers:[],
        }
    },
    methods:{
        jump(id){
            this.$router.push({name:'PaperDetail', query:{workId : id} });
        }
    },
    mounted(){
        var promise=Hotspots();
        promise.then((result) => {
            if(result.code==200){
                for(var i=0;i<4;i++){
                    this.leftPapers.push({"name":result.data[i].name, "author": result.data[i].author, "id": result.data[i].id});
                }
                for(var i=4;i<8;i++){
                    this.rightPapers.push({"name":result.data[i].name, "author": result.data[i].author, "id": result.data[i].id});
                }
            }
        })
    }
}

</script>

<style scoped>
.paper{
    position: relative;
    width: 90%;
    height: 90%;
    left: 5%;
    top: 0%;

}
.paperCard{
    position: relative;
    width: 100%;
    height: 100%;
}
.middle{
    position: absolute;
    width: 50%;
    height: 75%;
    left: 0%;
    top: 20%;
    border-right: 1px solid silver;
}
.top-left{
    position: absolute;
    width: 2%;
    height: 10%;
    left: 0%;
    top: 0%;
    border-bottom-right-radius: 100px;
    border-right: 40px solid #B1D182;
    border-bottom: 40px solid #B1D182;

}
.leftLine{
    position: absolute;
    width: 45%;
    height: 10%;
    left: 0%;
    top: 0%;
    border-bottom: 5px solid #B1D182;
    border-bottom-left-radius: 50px;
}
.rightLine{
    position: absolute;
    width: 45%;
    height: 10%;
    left: 55%;
    top: 0%;
    border-bottom: 5px solid #B1D182;
    border-bottom-right-radius: 50px;
}
.paperTitle{
    position: absolute;
    width: 10%;
    height: 10%;
    left: 45%;
    top: 5%;
    text-align: center;
    font-size: 24px;
    font-weight: 900;

}
.left{
    position: absolute;
    width: 45%;
    height: 80%;
    top: 15%;
    left: 2%;
}
.right{
    position: absolute;
    width: 45%;
    height: 80%;
    top: 15%;
    left: 53%;
}
.paperItem{
    position: relative;
    height: 20%;
    width: 90%;
    margin-top: 11px;
    margin-left: 5%;
    text-align: left;
    font-style: italic;
    font-size: 20px;
    font-weight: 600;
    border-bottom: 2px solid silver;
    color: #68b0ab;
}
.paperItem:hover{
    cursor: pointer;
}

.back{
    position: relative;
    left: 5%;
    width: 90%;
    height: 100%;
}
.total{
    position: relative;
    width: 53%;
    left: 0%;
    height: 100%;
    top: 0%;
}
.institution{
    position: absolute;
    width: 43%;
    height: 100%;
    left: 55%;
    top: 0%;
    
}
.border{
    position: absolute;
    width: 100%;
    height: 80%;
    top: 10%;
    right: 0%;
    border-right: 1px solid #68b0ab;
}
.title{
    position: relative;
    text-align: left;
    width: 80%;
    height: 6%;
    left: 5%;
    top: 4%;
    font-size: 20px;
    border-bottom: 2px solid #8fc09a;
}
.body{
    position: relative;
    width: 80%;
    height: 85%;
    left: 5%;
    top: 4%;
}
.item{
    position: relative;
    top: 4%;
    width: 100%;
    height: 5%;
    line-height: 10%;
    border-bottom: 1px dashed silver;
}
.itemName{
    position: relative;
    top: 0%;
    left: 0%;
    width: 60%;
    height: 100%;
    line-height: 100%;
    text-align: left;
}
.hotIndex{
    position: absolute;
    top: 0%;
    right: 0%;
    width: 40%;
    height: 100%;
    line-height: 100%;
    text-align: right;
}


</style>