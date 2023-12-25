<template>
    <div class="back">
        <span class="first">制作团队: Little Genius</span>
        <span class="firstDiver"></span>
        <span class="second">技术支持邮箱: q5fbet8w@duck.com</span>
        <span class="secondDiver"></span>
        <span class="third">违法与不良信息举报: medicine_melancholy@tutanota.com</span>
        <span class="administrator" @click="this.administratorClick()">管理员入口<el-icon style="position: relative;top: 10%;"><Right /></el-icon></span>
    </div>
    <el-dialog v-model="this.open" width="25%" style="min-width: 500px;">
        <div class="dialogBack">
            <div class="title">
                <el-image class="titleBack" :src="require('@/assets/home/001.jpg')" fit="fill"></el-image>
            </div>
            <div class="text">
                管理员入口版
            </div>
            <div class="login">
                <el-form class="loginForm" ref="loginRef" :model="this.login" :rules="this.loginRules">
                    <el-form-item prop="username">
                        <el-input class="input" type="text" v-model="this.login.username" placeholder="用户名" maxlength="25" prefix-icon="User"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input class="input" type="password" v-model="this.login.password" placeholder="密码" maxlength="25" prefix-icon="Lock"></el-input>
                    </el-form-item>
                    <el-button class="loginButton" type="success" @click="this.adminLogin()">登录</el-button>
                </el-form>
            </div>
        </div>
    </el-dialog>
</template>

<script>
import store from '@/store';
import { AdminLogin } from '@/api/loginAndRegister';
import { ElNotification } from 'element-plus';

export default {
    data(){
        return{
            open: false,
            login: {
                username: '',
                password: '',
            },
            loginRules: {
                username: [{
                    validator: (rule, value, callback)=>{
                        if(value===''){
                            callback(new Error("输入管理员用户名"));
                        } else{
                            callback();
                        }
                    }, type: 'string', trigger: 'blur'}],
                password: [{
                    validator: (rule, value, callback)=>{
                        if(value===''){
                            callback(new Error("输入管理员密码"));
                        } else{
                            callback();
                        }
                    }, type: 'string', trigger: 'blur'}]    
            },
        }
    },
    methods:{
        administratorClick(){
            if(store.state.administratorInfo.isLogin) this.$router.push('/manage');
            else{
                this.open=true;
                this.login.username='';
                this.login.password='';
            }
        },
        adminLogin(){
            this.$refs.loginRef.validate((valid) => {
                if(valid){
                    var promise=AdminLogin(this.login.username, this.login.password);
                    promise.then((result) => {
                        if(result.code==200){
                            store.commit("administratorLogin", result.data.token);
                            ElNotification({
                                message: "欢迎回来，管理员",
                                type: 'success',
                                showClose: true,
                                position: 'top-right',
                                duration: 2000,
                            });
                            this.open=false;
                            this.$router.push('/manage');
                        } else{
                            ElNotification({
                                message: result.info,
                                type: 'warning',
                                showClose: true,
                                position: 'top-right',
                                duration: 2000,
                            });
                        }
                    })
                }
            })
        },
    },
}
</script>

<style scoped>
.back{
    position: relative;
    width: 100%;
    min-width: 1200px;
    height: 50px;
    bottom: 0;
    font-size: 16px;
    text-align: left;
    color: white;
    background-color: #2b463c;
}
.first{
    position: relative;
    height: 50%;
    top: 25%;
    left: 17%;
}
.firstDiver{
    position: relative;
    top: 25%;
    left: 18%;
    border-right: 2px solid silver;
}
.second{
    position: relative;
    height: 50%;
    top: 25%;
    left: 19%;
}
.secondDiver{
    position: relative;
    top: 25%;
    left: 20%;
    border-right: 2px solid silver;
}
.third{
    position: relative;
    height: 50%;
    top: 25%;
    left: 21%;
}
.administrator{
    position: absolute;
    height: 50%;
    width: 10%;
    right: 2%;
    top: 40%;
    text-align: right;
    color: silver;
    font-size: 14px;
}
.administrator:hover{
    cursor: pointer;
    color: white;
}

.dialogBack{
    position: relative;
    width: 100%;
    height: 300px;
    left: 0%;
    top: 0%;
}
.title{
    position: absolute;
    width: 90%;
    left: 5%;
    top: -40px;
}
.text{
    position: absolute;
    width: 100%;
    top: 40px;
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    color: #69a84f;
}
.login{
    position: relative;
    width: 90%;
    left: 5%;
    top: 25%;
    /* border-right: 2px solid rgb(138, 167, 231); */
}
.loginForm{
    position: relative;
    width: 100%;
    height: 100%;
    left: 0%;
    top: 0%;
}
.loginButton{
    position: relative;
    width: 90%;
    height: 40px;
    left: 0%;
    top: 20px;
    font-size: larger;
}
.input{
    position: relative;
    height: 35px;
    font-size: 16px;
}
.titleBack{
    position: relative;
    width: 40%;
    height: 80px;
    background-image: url('@/assets/home/001.jpg');
}
</style>