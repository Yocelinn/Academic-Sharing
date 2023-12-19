<template>
    <el-button type="success" plain @click="this.enterDialog()" id="enterButton">
        登录
    </el-button>
    <el-dialog v-model="this.open.login" width="50%" style="min-width: 800px;">
        <div class="title">
            <el-button class="titile-login" text :type="this.loginButtonType" @click="this.switchLoginForm()">登录</el-button>
            <el-button class="titile-register" text :type="this.registerButtonType" @click="this.switchRegisterForm()">注册</el-button>
        </div>
        <div class="login">
            <el-form v-if="!this.switchForm" class="loginForm" ref="loginRef" :model="this.login" :rules="this.loginRules">
                <el-form-item label="邮箱" prop="email">
                    <el-input type="text" v-model="this.login.email" maxlength="25"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="this.login.password" maxlength="25"></el-input>
                </el-form-item>
                <el-button class="loginButton" type="success" @click="this.loginClick()">登录</el-button>
                <el-button class="forgetButton" type="success" text="true">忘记密码?</el-button>
            </el-form>
            <el-image v-else :src="require('@/assets/LoginAndRegister/register.jpg')" fit="fill"/>
        </div>
        <div class="register">
            <el-form v-if="this.switchForm" class="registerForm" ref="registerRef" :model="this.register" :rules="this.registerRules">
                <el-form-item label="用户名" prop="username" label-width="20%">
                    <el-input type="text" v-model="this.register.username" maxlength="25"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" label-width="20%">
                    <el-input type="password" v-model="this.register.password" maxlength="25"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="confirmPassword" label-width="20%">
                    <el-input type="password" v-model="this.register.confirmPassword" maxlength="25"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email" label-width="20%">
                    <el-input type="text" v-model="this.register.email" maxlength="25"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="vercode" label-width="20%">
                    <el-input type="text" v-model="this.register.vercode" maxlength="6" style="width: 65%;"></el-input>
                    <el-button type="success"  @click="this.sendVerCode()">获取验证码</el-button>
                </el-form-item>
                <el-button class="registerButton" type="success" @click="this.registerClick()">注册</el-button>
            </el-form>
            <el-image v-else class="registerImage" :src="require('@/assets/LoginAndRegister/login.jpg')" fit="fill"/>
        </div>
    </el-dialog>
</template>

<script>
import { Login, Register, SendVerifyCode } from '@/api/loginAndRegister';

export default {
    name: 'LoginAndRegister',
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
            switchForm: false,  //false为登录，true为注册
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
            this.open.login=true;
        },
        switchLoginForm(){
            this.switchForm=false;
            this.loginButtonType='success';
            this.registerButtonType='info';
        },
        switchRegisterForm(){
            this.switchForm=true;
            this.loginButtonType='info';
            this.registerButtonType='success';
        },
        loginClick(){
            this.$refs.loginRef.validate((valid) => {
                if(valid){
                    console.log("login");
                    var promise=Login(this.login.email, this.login.password);
                    promise.then((result)=>{
                        console.log(result);
                    })
                }
            })
        },
        registerClick(){
            this.$refs.registerRef.validate((valid) => {
                if(valid){
                    console.log(1);
                    var promise=Register(this.register.username, this.register.email, this.register.password, this.register.vercode);
                    promise.then((result)=>{
                        console.log(result);
                    })
                }
            })
        },
        sendVerCode(){
            this.$refs.registerRef.validateField('email', (valid)=>{
                if(valid){
                    var promise=SendVerifyCode(this.register.email);
                    promise.then((result)=>{
                        console.log(result);
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
.title{
    position: relative;
    width: 95%;
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
    width: 48%;
    height: 340px;
    top: 0px
    /* border-right: 2px solid rgb(138, 167, 231); */
}
.register{
    position: absolute;
    width: 50%;
    left: 49%;
    top: 30%;
}
.loginForm{
    position: relative;
    width: 96%;
    top: 75px;
}
.registerForm{
    width: 96%;
}

.registerImage{
    position: relative;
    top: -47px;
    left: -11px;
    width: 91%;
    height: 91%;
}
.loginButton{
    position: relative;
    width: 100px;
    height: 40px;
    left: 20%;
    font-size: larger;
}
.forgetButton{
    position: relative;
    left: 25%;
    top: 0%;
}
.registerButton{
    position: relative;
    width: 100px;
    height: 40px;
    font-size: larger;
}

</style>