<template>
    <el-button type="success" plain @click="this.enterDialog()" id="enterButton">
        登录
    </el-button>
    <el-dialog v-model="this.open.login" width="25%" style="min-width: 500px;">
        <div class="dialogBack">
            <div class="title">
                <el-image class="titleBack" :src="require('@/assets/home/001.jpg')" fit="fill"></el-image>
                <!-- <el-button class="titile-login" text :type="this.loginButtonType" @click="this.switchToLoginForm()">登录</el-button>
                <el-button class="titile-register" text :type="this.registerButtonType" @click="this.switchToRegisterForm()">注册</el-button> -->
            </div>
            <div class="login" v-if="this.formType==0">
                <el-form class="loginForm" ref="loginRef" :model="this.login" :rules="this.loginRules">
                    <el-form-item prop="email">
                        <el-input class="input" type="text" v-model="this.login.email" placeholder="邮箱" maxlength="25" prefix-icon="Message"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input class="input" type="password" v-model="this.login.password" placeholder="密码" maxlength="25" prefix-icon="Lock"></el-input>
                    </el-form-item>
                    <el-button class="loginButton" type="success" @click="this.loginClick()">登录</el-button>
                    <el-button class="loginToRegister" text="true" @click="this.switchToRegisterForm()">注册新用户</el-button>
                    <el-button class="forgetButton" text="true" @click="this.switchToForgetPassword()">忘记密码</el-button>
                </el-form>
            </div>
            <div class="register" v-if="this.formType==1">
                <el-button class="returnToLogin" type="success" text="true" @click="this.switchToLoginForm()"><el-icon><Back /></el-icon>已注册</el-button>
                <el-form class="registerForm" ref="registerRef" :model="this.register" :rules="this.registerRules">
                    <el-form-item prop="username">
                        <el-input class="input" type="text" v-model="this.register.username" placeholder="昵称" maxlength="25" prefix-icon="User"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input class="input" type="password" v-model="this.register.password" placeholder="密码" maxlength="25" prefix-icon="Lock"></el-input>
                    </el-form-item>
                    <el-form-item prop="confirmPassword">
                        <el-input class="input" type="password" v-model="this.register.confirmPassword" placeholder="再次输入密码" maxlength="25" prefix-icon="Lock"></el-input>
                    </el-form-item>
                    <el-form-item prop="email">
                        <el-input class="input" type="text" v-model="this.register.email" placeholder="您的邮箱" maxlength="25" prefix-icon="Message"></el-input>
                    </el-form-item>
                    <el-form-item prop="vercode">
                        <el-input class="input" type="text" v-model="this.register.vercode" placeholder="请输入4位验证码" maxlength="6" style="width: 80%;" prefix-icon="ElementPlus"></el-input>
                        <el-button class="input" type="success"  @click="this.sendVerCode()" style="width: 20%;font-size: 14px;">获取验证码</el-button>
                    </el-form-item>
                    <el-button class="registerButton" type="success" @click="this.registerClick()">注册</el-button>
                </el-form>
            </div>
            <div class="forgePassword" v-if="this.formType==2">
                <el-button class="returnToLogin" type="success" text="true" @click="this.switchToLoginForm()"><el-icon><Back /></el-icon>登录页面</el-button>
                <el-form class="forgetPasswordForm" ref="forgetPasswordRef" :model="this.forgetPassword" :rules="this.forgetPasswordRules">
                    <el-form-item prop="email">
                        <el-input class="input" type="text" v-model="this.forgetPassword.email" placeholder="您的邮箱" maxlength="25" prefix-icon="Message"></el-input>
                    </el-form-item>
                    <el-form-item prop="vercode">
                        <el-input class="input" type="text" v-model="this.forgetPassword.vercode" placeholder="请输入4位验证码" maxlength="6" style="width: 80%;" prefix-icon="ElementPlus"></el-input>
                        <el-button class="input" type="success"  @click="this.sendVerCodeForForgetPassword()" style="width: 20%;font-size: 14px;">获取验证码</el-button>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input class="input" type="password" v-model="this.forgetPassword.password" placeholder="密码" maxlength="25" prefix-icon="Lock"></el-input>
                    </el-form-item>
                    <el-button class="registerButton" type="success" @click="this.forgetPasswordClick()">重置密码</el-button>
                </el-form>
            </div>
        </div>
    </el-dialog>
</template>

<script>
import { Login, Register, SendVerifyCode, ForgotPassword, SendForgotEmail } from '@/api/loginAndRegister';
import store from '@/store';
import { ElNotification } from 'element-plus';

export default {
    name: 'LoginAndRegister',
    components:{
        

    },
    props: {
        width:{
            type: String,
            default: "100%"
        },
        height:{
            type: String,
            default: "50px"
        },
        fontSize:{
            type: String,
            default: "large"
        },
    },
    data() {
        return{
            open: {
                login: false,
            },
            formType: 0,  //0为登录，1为注册，2为忘记密码
            loginButtonType: 'success',
            registerButtonType: 'info',
            login: {
                email: '',
                password: '',
            },
            register: {
                username: '',
                password: '',
                confirmPassword: '',
                email: '',
                vercode: '',
            },
            forgetPassword:{
                email: '',
                password: '',
                vercode: '',
            },
            loginRules: {
                email: [{
                    validator: (rule, value, callback)=>{
                        if(value===''){
                            callback(new Error("请输入邮箱"));
                        } else{
                            callback();
                        }
                    }, type: 'string', trigger: 'blur'}],
                password: [{
                    validator: (rule, value, callback)=>{
                        if(value===''){
                            callback(new Error("请输入密码"));
                        } else{
                            callback();
                        }
                    }, type: 'string', trigger: 'blur'}]    
            },
            registerRules: {
                username: [{
                    validator: (rule, value, callback)=>{
                        if(value===''){
                            callback(new Error("请输入用户名"));
                        } else{
                            callback();
                        }
                    }, type: 'string', trigger: 'blur'}],
                password: [{
                    validator: (rule, value, callback)=>{
                        if(value===''){
                            callback(new Error("请输入密码"));
                        } else{
                            callback();
                        }
                    }, type: 'string', trigger: 'blur'}],
                confirmPassword: [{
                    validator: (rule, value, callback)=>{
                        if(value===''){
                            callback(new Error("请再次输入密码"));
                        } else if(value===this.register.password){
                            callback();
                        }
                        else{
                            callback(new Error("两次密码不一致"))
                        }
                    }, type: 'string', trigger: 'blur'}],
                email: [{
                    validator: (rule, value, callback)=>{
                        if(value===''){
                            callback(new Error("请输入邮箱"));
                        } else{
                            callback();
                        }
                    }, type: 'string', trigger: 'blur'}],
                vercode: [{
                    validator: (rule, value, callback)=>{
                        if(value===''){
                            callback(new Error("请输入验证码"));
                        } else{
                            callback();
                        }
                    }, type: 'string', trigger: 'blur'}],
            },
            forgetPasswordRules: {
                password: [{
                    validator: (rule, value, callback)=>{
                        if(value===''){
                            callback(new Error("请输入密码"));
                        } else{
                            callback();
                        }
                    }, type: 'string', trigger: 'blur'}],
                email: [{
                    validator: (rule, value, callback)=>{
                        if(value===''){
                            callback(new Error("请输入邮箱"));
                        } else{
                            callback();
                        }
                    }, type: 'string', trigger: 'blur'}],
                vercode: [{
                    validator: (rule, value, callback)=>{
                        if(value===''){
                            callback(new Error("请输入验证码"));
                        } else{
                            callback();
                        }
                    }, type: 'string', trigger: 'blur'}],
            },
        }
    },
    methods: {
        enterDialog(){
            this.login.email='';
            this.login.password='';
            this.register.username='';
            this.register.password='';
            this.register.confirmPassword='';
            this.register.email='';
            this.register.vercode='';
            this.forgetPassword.email='';
            this.forgetPassword.password='';
            this.forgetPassword.vercode='';
            this.open.login=true;
        },
        switchToLoginForm(){
            this.login.email='';
            this.login.password='';
            this.loginButtonType='success';
            this.registerButtonType='info';
            this.formType=0;
        },
        switchToRegisterForm(){
            this.register.username='';
            this.register.password='';
            this.register.confirmPassword='';
            this.register.email='';
            this.register.vercode='';
            this.loginButtonType='info';
            this.registerButtonType='success';
            this.formType=1;
        },
        switchToForgetPassword(){
            this.forgetPassword.email='';
            this.forgetPassword.password='';
            this.forgetPassword.vercode='';
            this.formType=2;
        },
        loginClick(){
            this.$refs.loginRef.validate((valid) => {
                if(valid){
                    var promise=Login(this.login.email, this.login.password);
                    promise.then((result)=>{
                        if(result.code==200){
                            store.commit("login", {"token" : result.data.token, "nickName" : result.data.nickName });
                            ElNotification({
                                message: "欢迎回来",
                                type: 'success',
                                showClose: true,
                                position: 'top-right',
                                duration: 2000,
                            });
                            this.open.login=false;
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
        registerClick(){
            this.$refs.registerRef.validate((valid) => {
                if(valid){
                    var promise=Register(this.register.username, this.register.email, this.register.password, this.register.vercode);
                    promise.then((result)=>{
                        if(result.code==200){
                            ElNotification({
                                message: '欢迎您的到来，我的朋友',
                                type: 'success',
                                showClose: true,
                                position: 'top-right',
                                duration: 2000,
                            });
                            this.switchToLoginForm();
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
        forgetPasswordClick(){
            this.$refs.forgetPasswordRef.validate((valid) => {
                if(valid){
                    var promise=ForgotPassword(this.forgetPassword.email, this.forgetPassword.password, this.forgetPassword.vercode);
                    promise.then((result)=>{
                        if(result.code==200){
                            ElNotification({
                                message: '重置成功',
                                type: 'success',
                                showClose: true,
                                position: 'top-right',
                                duration: 2000,
                            });
                            this.switchToLoginForm();
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
        sendVerCodeForForgetPassword(){
            this.$refs.forgetPasswordRef.validateField('email', (valid)=>{
                if(valid){
                    var promise=SendForgotEmail(this.forgetPassword.email);
                    promise.then((result)=>{
                        if(result.code==200){
                            ElNotification({
                                message: result.data,
                                type: 'success',
                                showClose: true,
                                position: 'top-right',
                                duration: 2000,
                            });
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
        sendVerCode(){
            this.$refs.registerRef.validateField('email', (valid)=>{
                if(valid){
                    var promise=SendVerifyCode(this.register.email);
                    promise.then((result)=>{
                        if(result.code==200){
                            ElNotification({
                                message: result.data,
                                type: 'success',
                                showClose: true,
                                position: 'top-right',
                                duration: 2000,
                            });
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
    mounted(){
        var tmp=document.getElementById("enterButton");
        tmp.style.width=this.width;
        tmp.style.height=this.height;
        tmp.style.fontSize=this.fontSize;
    }
}

</script>

<style scoped>
.dialogBack{
    position: relative;
    width: 100%;
    height: 375px;
    left: 0%;
    top: 0%;
}
.title{
    position: absolute;
    width: 90%;
    left: 5%;
    top: -40px;
}
.titile-login{
    position: relative;
    left: 5px;
    text-align: center;
    font-size: 3ch;
}
.titile-register{
    position: relative;
    left: 5px;
    text-align: center;
    font-size: 3ch;
}
.login{
    position: relative;
    width: 90%;
    left: 5%;
    top: 25%;
    /* border-right: 2px solid rgb(138, 167, 231); */
}
.register{
    position: relative;
    width: 90%;
    left: 5%;
    top: 17%;
}
.forgePassword{
    position: relative;
    width: 90%;
    left: 5%;
    top: 25%;
}
.loginForm{
    position: relative;
    width: 100%;
    height: 100%;
    left: 0%;
    top: 0%;
}
.registerForm{
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
.loginToRegister{
    position: relative;
    width: 20%;
    height: 30px;
    left: -25%;
    top: 28px;
}
.forgetButton{
    position: relative;
    width: 20%;
    height: 30px;
    left: 25%;
    top: 28px;
}
.registerButton{
    position: relative;
    width: 90%;
    height: 40px;
    left: 0%;
    top: 7px;
    font-size: larger;
}
.returnToLogin{
    position: absolute;
    width: 20%;
    height: 25px;
    left: -5%;
    top: -40px;
    font-size: 16px;
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