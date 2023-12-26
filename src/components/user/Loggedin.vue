<template>
    <div class="loggedinBlock">
        <div class="userChoose">
            <el-dropdown>
                <el-button type='warning' link="true" size="large">
                    <el-icon><Tools /></el-icon>
                </el-button>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="this.logOutClick()">退出登录</el-dropdown-item>
                        <el-dropdown-item >
                            <el-popconfirm title="确定注销该账户吗?" @confirm="this.logOff()">
                                <template #reference>
                                    注销账户
                                </template>
                            </el-popconfirm>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
        <div class="first">你好，</div>
        <div class="nickName">{{ this.$store.state.userInfo.showName }}</div>
    </div>
    
</template>

<script>
import store from '@/store';
import { ElNotification } from 'element-plus';
import { Logoff } from '@/api/loginAndRegister';
import { match } from 'path-to-regexp';

export default{
    props: {
        
    },
    data() {
        return{
            nickName: "",
            pathList:["/", "/searchResults", "/allInstitution", "/institution", "/paper/detail/:workId?", "/patent/detail/:patentId?", "/program/detail/:funderId?"],
        }
    },
    methods:{
        logOutClick(){
            var path=this.$route.path;
            var isPush=true;
            for(var i=0;i<this.pathList.length;i++){
                if(match(this.pathList[i])(path)){
                    isPush=false;
                    break;
                }
            }
            if(isPush){
                this.$router.push("/");
            }
            ElNotification({
                message: "再见，尊敬的"+store.state.userInfo.nickName,
                type: 'success',
                showClose: true,
                position: 'top-right',
                duration: 2000,
            })
            store.commit("logout");
        },
        logOff(){
            var promise=Logoff();
            promise.then((result) => {
                if(result.code==200){
                    var path=this.$route.path;
                    var isPush=true;
                    for(var s in this.pathList){
                        if(match(s)(path)){
                            isPush=false;
                            break;
                        }
                    }
                    if(isPush){
                        this.$router.push("/");
                    }
                    ElNotification({
                        message: "注销成功，期待您的再次到来",
                        type: 'success',
                        showClose: true,
                        position: 'top-right',
                        duration: 2000,
                    })
                    store.commit("logout");
                } else{
                    ElNotification({
                        message: result.info,
                        type: 'warning',
                        showClose: true,
                        position: 'top-right',
                        duration: 2000,
                    })
                }
            })
        },
        test(){
            var promise=GetTsPs();
            promise.then((result) => {
                console.log(result);
            })
        }
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