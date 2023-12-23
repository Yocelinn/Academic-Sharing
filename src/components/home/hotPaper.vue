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

        </el-card>
    </div>
</template>

<script>

export default{
    props:{

    },
    data(){
        return{

        }
    },
    methods:{

    },
    mounted(){

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