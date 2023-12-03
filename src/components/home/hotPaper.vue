<template>
    <div class="back">
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
        <div class="month">
            <div class="border"> </div>
            <div class="title">
                热度月榜
            </div>
            <div class="body">
                
            </div>
        </div>
        <div class="journals">
            <div class="title">
                热门期刊
            </div>
        </div>
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
.back{
    position: relative;
    left: 15%;
    width: 70%;
    height: 100%;
}
.total{
    position: relative;
    width: 35%;
    left: 0%;
    height: 100%;
}
.month{
    position: absolute;
    width: 35%;
    height: 100%;
    left: 35%;
    top: 0%;
    
}
.journals{
    position: absolute;
    width: 30%;
    height: 100%;
    left: 70%;
    top: 0%;
    
}
.border{
    position: absolute;
    width: 100%;
    height: 80%;
    top: 10%;
    right: 5%;
    border-right: 1px solid #68b0ab;
}
.title{
    position: relative;
    text-align: left;
    width: 70%;
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
    height: 10%;
}
.itemName{
    position: relative;
    top: 0%;
    left: 0%;
    width: 60%;
    height: 100%;
    text-align: left;
}
.hotIndex{
    position: absolute;
    top: 0%;
    right: 0%;
    width: 40%;
    height: 100%;
    text-align: right;
}

</style>