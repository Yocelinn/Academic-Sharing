<template>
    <div class="loggedinBlock">
        <div class="userChoose">
            <el-dropdown>
                <el-button type='warning' link="true" size="large">
                    <el-icon><ArrowDownBold /></el-icon>
                </el-button>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="this.logOutClick()">退出登录</el-dropdown-item>
                        <el-dropdown-item @click="">注销账户</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
        <div class="first">你好，</div>
        <div class="nickName">Jeruisi</div>
    </div>
</template>

<script>
import store from '@/store';

export default{
    props: {
        
    },
    data() {

    },
    methods:{
        logOutClick(){
            store.commit("logout");
        },
        
    },
    mounted(){

    },
}

</script>

<style scoped>
.loggedinBlock{
    position: relative;
    width: 100%;
    height: 30px;
    left: 0%;
    top: 0%;
}
.userChoose{
    position: relative;
    width: 10%;
    height: 100%;
    left: 0%;
    top: 20%;
}
.first{
    position: absolute;
    width: 28%;
    height: 100%;
    line-height: 100%;
    left: 10%;
    top: 20%;
    font-size: 16px;
    font-style: italic;
    text-align: left;
    color: #ffffff;
}
.nickName{
    position: absolute;
    width: 52%;
    height: 100%;
    line-height: 100%;
    left: 38%;
    top: 20%;
    font-size: 16px;
    font-style: italic;
    text-align: left;
    color: #000000;
}

</style>