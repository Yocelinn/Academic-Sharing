<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <Personaside></Personaside>
      </el-aside>
      <el-container>
        <el-main>
          <el-row>
            <el-col :span="16" style="padding-right: 10px"><div class="person-passage" />
              <el-card class="card1">
                  <div class="userpassage">
                    <div class="passage1">
                    <p class="username">{{ username }}</p>
                    <p class="useridentity">{{ identity }}</p>
                    <p class="userdescription">{{ persondescription }}</p>
                    </div>
                    <div class="passage2">
                    <div class="email">
                      个人邮箱:<span class="passage">{{ email }}</span>
                    </div>
                    <div class="interest">
                      兴趣方向:<span class="passage">{{ interest1 }};  {{ interest2 }};  {{ interest3 }};</span>
                    </div>
                    <div class="remake"><el-button type="success" :icon="Edit" @click="rewritemessage">修改信息</el-button></div>
                    <el-dialog v-model="dialogFormVisible" title="修改信息">
                      <el-form :model="form">
                        <el-form-item label="用户名称" :label-width="formLabelWidth">
                          <el-input v-model="rewriteusername" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="个人简介" :label-width="formLabelWidth">
                          <el-input v-model="rewritedescription" autocomplete="off" />
                        </el-form-item>
                      </el-form>
                      <template #footer>
                        <span class="dialog-footer">
                          <el-button @click="rewirtepassword">修改密码</el-button>
                          <el-button @click="dialogFormVisible = false">取消</el-button>
                          <el-button type="primary" @click="submitmessage">
                            提交修改信息
                          </el-button>
                        </span>
                      </template>
                    </el-dialog>
                    <el-dialog v-model="dialogPassword" title="修改密码">
                      <el-form :model="form">
                        <el-form-item label="原密码" :label-width="formLabelWidth">
                          <el-input v-model="oldpassword" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="新密码" :label-width="formLabelWidth">
                          <el-input v-model="newpassword" autocomplete="off" />
                        </el-form-item>
                      </el-form>
                      <template #footer>
                        <span class="dialog-footer">
                          <el-button @click="submitpassword">重置密码</el-button>
                          <el-button @click="dialogPassword = false">取消</el-button>
                        </span>
                      </template>
                    </el-dialog>
                    </div>
                    </div>
              </el-card>
            </el-col>
            <el-col :span="8" style="padding-left: 10px;padding-right: 40px;"><div class="grid-content ep-bg-purple-light" />
              <el-card class="card38888" style="height:360px">
                <div id="graph" style="height:360px"></div>
              </el-card>
              <div class="data">
                <el-card class="card4">
                  <div class="dataheader">
                  <header>个人门户</header>
                  </div>
                  <div class="passage3">
                  <div class="identity">学术身份：<span class="passage2">{{ identity }}</span></div>
                  <div class="indexed">您是学者？<span class="passage2">点击这里</span></div>
                  <el-button class="identitybutton" @click="jump" type="primary">学术门户</el-button>
                  </div>
                </el-card>
              </div>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Personaside from '@/components/Personaside.vue';
import * as echarts from 'echarts';
import { reactive,onMounted ,ref} from 'vue';
import {post,get} from "../api/api.js"
import { GetUserInformation,UpdateUserInformation,ChangePasswd} from "../api/loginAndRegister.js"
import {GetData} from "../api/record.js"
import store from '@/store';
import router from "@/router";
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus';
export default {
  components: {
    Personaside,
  },
  methods:{
    IDidentity(){
      this.$store.dispatch('Reidentity');
      this.Reidentity()
    },
    rewritemessage(){
      this.dialogFormVisible = true;
      this.rewriteusername = this.username;
      this.rewritedescription = this.persondescription;
    },
    submitmessage(){
      var promise=UpdateUserInformation(this.rewriteusername,this.rewritedescription)
      promise.then((response)=>{
        if(response.code==200){
          ElNotification({
            title:'修改成功',
            message:'个人信息已更新',
            type:'success',
          })
        this.username=response.data.nick_name;
        this.persondescription=response.data.person_description;
        }
      })
      this.dialogFormVisible = false;
    },
    rewirtepassword(){
      this.dialogFormVisible = false;
      this.dialogPassword = true;
    },
    submitpassword(){
      var promise=ChangePasswd(this.oldpassword,this.newpassword);
      promise.then((response=>{
        if(response.code==200){
          ElNotification({
            title:'修改密码成功',
            message:'请重新登录',
            type:'success',
          })
        }else if(response.code==1003){
            ElNotification({
              title:'修改密码失败',
              message:'原密码错误',
              type:'fail',
            })
          }
      }))
      this.oldpassword=''
      this.newpassword=''
      this.dialogPassword = false;
    },
    jump(){
      if(this.identity=='普通用户')
      {
      router.push(`/findDoor`);
      }
    }
  },
  setup(){
    const dialogFormVisible = ref(false)
    const dialogPassword = ref(false)
    const username=ref('')
    const rewriteusername=ref('')
    const rewritephone=ref('')
    const rewriteemail=ref('')
    const rewritedescription=ref('')
    const persondescription = ref('只是一名路过的假面骑士罢了')
    const identity=ref('普通用户')
    const Reidentity = () =>{
      identity.value = '学者'
    }
    let name=ref('测试')
    const userid='北京 中国'
    const phone='1234578910'
    const email=ref('')
    const zone='计算机'
    const interest1=ref('')
    const interest2=ref('')
    const interest3=ref('')
    const textdata='149'
    const indexed='1039'
    const index='1103'
    const patent='4'
    const oldpassword=ref('')
    const newpassword=ref('')
    onMounted(()=>{
      var promise=GetUserInformation();
      promise.then((response)=>{
        console.log(store.state.token);
        console.log(response);
        username.value = response.data.nick_name;
        email.value = response.data.email;
        persondescription.value = response.data.person_description;
      })
      let echarts1option = {
        title: {
              text: '学术成果关键词'
            },
        series:[
          {
            type: 'pie',
            data:[]
          }
        ]
        }
        var promise2 = GetData()
        promise2.then((response=>{
          console.log(response.data)
          echarts1option.series[0].data=response.data
          if(response.data!=null){
          console.log(response.data)
          interest1.value=response.data[0].name;
          interest2.value=response.data[1].name;
          interest3.value=response.data[2].name;
          console.log(echarts1option.series)
          const echart1 = echarts.init(document.getElementById('graph'))
          echart1.setOption(echarts1option)
          }
          else if(response.data==null){
            interest1.value='兴趣关键词1';
            interest2.value='兴趣关键词2';
            interest3.value='兴趣关键词3';
          }
        }))
    })
    return{
      dialogFormVisible,
      dialogPassword,
      username,
      identity,
      name,
      phone,
      email,
      zone,
      interest1,
      interest2,
      interest3,
      userid,
      textdata,
      indexed,
      index,
      patent,
      rewriteusername,
      rewritephone,
      rewriteemail,
      oldpassword,
      newpassword,
      persondescription,
      rewritedescription,
      Reidentity
    }
  },
}
</script>
<style>

.passage1{
  border-bottom: 1px solid;
  text-align: left;
}

.passage2{
  text-align: left;
  margin-left: 30px;
}

.passage3{
  text-align: left;
  margin-left: 30px;
}
.user{
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-right: 40px;
}

.username{
  font-size: 32px;
  margin-bottom: 20px;
  margin-left: 30px;
}

.userdescription{
  margin-left: 30px;
}

.header1{
  font-size: 24px;
  margin-top: 0px;
  border-bottom: 1px solid;
}
.dataheader{
  font-size: 24px;
  margin-top: 0px;
  border-bottom: 1px solid;
}
.useridentity{
  color: #999999;
  margin-left: 30px;
}
.id1{
  color: #999999;
}

.realpassage{
  text-align: left;
}

.text {
  font-size: 14px;
}

.zone{
  margin-bottom:24px;
  margin-top: 24px;
}
.realname{
  margin-top: 24px;
  margin-bottom: 24px;
}
.phone{
  margin-bottom: 24px;
}
.item {
  margin-bottom: 24px;
}
.textdata{
  margin-top: 32px;
  margin-bottom: 24px;
}
.indexed{
  margin-bottom: 24px;
  margin-left: 28px;
}
.index{
  margin-bottom: 24px;
}

.card1 {
  margin-top: 40px;
  width: 960px;
  border-radius:5px;
  box-shadow: color='688f4e';
  height: 480px;
  border-top-color: #688f4e;
  border-top-width: 10px;
}

.card2{
  margin-top: 40px;
  width: 960px;
  height: 240px;
}
.card38888{
  margin-top: 40px;
}
.card4{
  margin-top: 40px;
  height: 200px;
}
.passage{
  margin-left: 80px;
}
.passage2{
  margin-left: 70px;
}
.P6assage{
  margin-left: 55px;
}
.userid{
  color: #999999;
}
.id1{
  color: #000;
  margin-left: 20px;
}
.interest{
  margin-top: 24px;
}
.remake{
  margin-top: 175px;
}
.email{
  margin-top: 24px;
}
.identitybutton{
  margin-left: 105px;
}
.identity{
  margin-top: 24px;
  margin-bottom: 24px;
  margin-left: 28px;
}
</style>
