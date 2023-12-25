<template>
    <div class="back">
        <span class="first">制作团队: Little Genius</span>
        <span class="firstDiver"></span>
        <span class="second">技术支持邮箱: q5fbet8w@duck.com</span>
        <span class="secondDiver"></span>
        <span class="third">违法与不良信息举报: medicine_melancholy@tutanota.com</span>
        <span class="administrator" @click="this.administratorClick()">管理员入口<el-icon style="position: relative;top: 10%;"><Right /></el-icon></span>
    </div>
</template>

<script>

export default {
    data(){
        return{
            open: false,
            
        }
    },
    methods:{
        administratorClick(){

        }
    },
}
</script>

<style scoped>
.back{
    position: relative;
    width: 100%;
    height: 50px;
    bottom: 0;
    font-size: 16px;
    color: white;
    background-color: #2b463c;
}
.first{
    position: relative;
    height: 50%;
    top: 25%;
    left: 20%;
}
.firstDiver{
    position: relative;
    top: 25%;
    left: 21%;
    border-right: 2px solid silver;
}
.second{
    position: relative;
    height: 50%;
    top: 25%;
    left: 22%;
}
.secondDiver{
    position: relative;
    top: 25%;
    left: 23%;
    border-right: 2px solid silver;
}
.third{
    position: relative;
    height: 50%;
    top: 25%;
    left: 24%;
}
.administrator{
    position: absolute;
    height: 50%;
    width: 10%;
    right: 2%;
    top: 25%;
    text-align: right;
    color: silver;
    font-size: 14px;
}
.administrator:hover{
    cursor: pointer;
    color: white;
}
</style>