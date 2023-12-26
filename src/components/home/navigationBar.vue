<template>
    <div id="navigationBar">
        <div class="logo">
            <el-image :src="require('@/assets/home/logo3.jpg')" style="height: 100%;" />
        </div>
        <div id="home" class="address" style="width: 5%;left: 20%;" @click="this.jumpToHome()">首页</div>
        <div id="person" class="address" style="width: 7%;left: 25%;" @click="this.jumpToPerson()">个人主页</div>
        <div id="findDoor" class="address" style="width: 7%;left: 32%;" @click="this.jumpToFindDoor()">查找门户</div>
        <div v-if="!this.$store.state.isHome" class="searchBlock">
            <searchBox width=100 color="white" :isClassVisible=false  :isLargeModel = false></searchBox>
        </div>
        <div v-if="this.$store.state.userInfo.isLogin" class="button" style="width: 15%;right: 2%;">
            <Loggedin></Loggedin>
        </div>
        <div v-else id="" class="button" style="width: 10%;right: 10%;">
            <LoinAndRegister width="75px" height="38px" font-size="16px"></LoinAndRegister>
        </div>
    </div>
</template>

<script>
import LoinAndRegister from '@/components/user/LoinAndRegister.vue';
import Loggedin from '../user/Loggedin.vue';
import searchBox from '../searchBox.vue';
import router from '@/router';

export default {
    props:{
        page: {
            type: Number,
            default: 0
        }
    },
    components:{
        LoinAndRegister,
        Loggedin,
        searchBox,
    },
    data(){
        return{
            idList:["home","person","findDoor"],
            currentPage: 0,
        }
    },
    methods:{
        setPage(){
            for(var i=0;i<this.idList.length;i++){
                var tmp=document.getElementById(this.idList[i]);
                tmp.className="address";
            }
            if(this.currentPage!=0){
                var tmp=document.getElementById(this.idList[this.currentPage-1]);
                tmp.className="choose";
            }
        },
        jumpToHome(){
            this.$router.push("/");
        },
        jumpToPerson(){
            this.$router.push("/person");
        },
        jumpToFindDoor(){
            this.$router.push("/findDoor");
        }
    },
    mounted(){
        var path=this.$route.path;
        if(path==="/"){
           this.currentPage=1;
        } else if(path==="/person"){
            this.currentPage=2;
        } else if(path==="/findDoor"){
            this.currentPage=3;
        } else{
            this.currentPage=0;
        }
        this.setPage();
        router.beforeEach((to, from, next) => {
            if(to.path==="/"){
                this.currentPage=1;
            } else if(to.path==="/person"){
                this.currentPage=2;
            } else if(to.path==="/findDoor"){
                this.currentPage=3;
            } else{
                this.currentPage=0;
            }
            this.setPage();
            next();
        })
    }
}

</script>

<style scoped>
#navigationBar{
    position: relative;
    width: 100%;
    min-width: 1200px;
    height: 50px;
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
.button{
    position: absolute;
    display: grid;
    place-items: center;
    height: 100%;
    font-size: large;
    color: #cdd0e5;
    top: 0%;
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
    /* border-bottom: 5px solid #ff9c00; */
}
.searchBlock{
    position: absolute;
    height: 100%;
    width: 42%;
    left: 40%;
    top: 5px;
}

</style>