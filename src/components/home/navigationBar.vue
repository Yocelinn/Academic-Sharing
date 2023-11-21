<template>
    <div id="navigationBar">
        <div class="logo">
            <el-image :src="require('@/assets/home/logo3.jpg')" style="height: 100%;" />
        </div>
        <div id="home" class="address" style="width: 5%;left: 20%;" @click="">首页</div>
        <div id="personPage" class="address" style="width: 7%;left: 25%;" @click="">个人主页</div>
        <div id="" class="address" style="width: 7%;left: 32%;" @click="">网站介绍</div>
        <div id="" class="address" style="width: 10%;right: 10%;">
            <LoinAndRegister width="80px" height="50px" font-size="16px"></LoinAndRegister>
        </div>
    </div>
</template>

<script>
import LoinAndRegister from '@/components/user/LoinAndRegister.vue';

export default {
    props:{
        page: {
            type: Number,
            default: 0
        }
    },
    components:{
        LoinAndRegister,
    },
    data(){
        return{
            idList:["home","personPage"]
        }
    },
    methods:{
        setPage(){
            for(var i=0;i<this.idList.length;i++){
                var tmp=document.getElementById(this.idList[i]);
                tmp.className="address";
            }
            if(this.page!=0){
                var tmp=document.getElementById(this.idList[this.page-1]);
                tmp.className="choose";
            }
        },
    },
    mounted(){
        this.setPage();
    }
}

</script>

<style scoped>
#navigationBar{
    position: relative;
    width: 100%;
    min-width: 1200px;
    height: 70px;
    background-color: #688f4e;
}
.logo{
    position: relative;
    width: 10%;
    height: 100%;
    left: 10%;
}
.address{
    position: absolute;
    display: grid;
    place-items: center;
    height: 100%;
    font-size: large;
    color: #cdd0e5;
    top: 0%;
}
.address:hover{
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(255, 255, 255, 0.3);
    color: white;
}
.choose{
    position: absolute;
    display: grid;
    place-items: center;
    height: 100%;
    font-size: large;
    color: white;
    top: 0%;
}
.choose::after{
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(255, 255, 255, 0.3);
    border-bottom: 5px solid #ff9c00;
}

</style>