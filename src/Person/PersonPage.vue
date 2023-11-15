<template>
    <div class="common-layout">
      <el-container>
        <el-aside width="200px">
          <Personaside></Personaside>
        </el-aside>
        <el-container>
          <el-main>
            <el-row>
              <el-col :span="8" style="padding-right: 10px"><div class="person-passage" />
                <el-card class="card1">
                    <div class="userpassage">
                      <img src="../assets/1.png" class="user">
                      <div class="passage1">
                      <p class="username">{{ username }}</p>
                      <p class="useridentity">{{ identity }}</p>
                      <p class="userid">id:<span class="id1">{{ userid }}</span></p>
                      </div>
                      <div class="identitybutton"><el-button type="primary" :icon="Edit" @click="IDidentity">身份认证</el-button></div>
                    </div>
                </el-card>
                <el-card class="card2" style="height: 390px;"> 
                  <p class="header1">个人信息</p>
                  <div class="realpassage">
                    <p>真实姓名:<span class="passage">{{ name }}</span></p>
                    <p>联系电话:<span class="passage">{{ phone }}</span></p>
                    <p>联系邮箱:<span class="passage">{{ email }}</span></p>
                    <div class="zone">
                      研究领域:<span class="passage">{{ zone }}</span>
                    </div>
                    <div class="interest">
                      兴趣方向:<span class="passage">{{ interest }}</span>
                    </div>
                    <div class="remake"><el-button type="primary" :icon="Edit">修改信息</el-button></div>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="16" style="padding-left: 40px;padding-right: 40px;"><div class="grid-content ep-bg-purple-light" />
                <el-card style="height:360px">
                  <div id="echarts1" style="height:360px"></div>
                </el-card>
                <div class="graph">
                  <el-card style="height:260px">
                    <div id="echarts2"></div>
                  </el-card>
                  <el-card style="height:260px">
                    <div id="echarts3"></div>
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
  import { onMounted ,ref} from 'vue';
  import {
    Check,
    Delete,
    Edit,
    Message,
    Search,
    Star,
  } from '@element-plus/icons-vue'
  export default {
    components: {
      Personaside,
    },
    methods:{
      IDidentity(){
        this.$store.dispatch('Reidentity');
        this.Reidentity()
      }
    },
    setup(){
      const username='Z-ARC'
      const identity=ref('普通用户')
      const Reidentity = () =>{
        identity.value = '学者'
      }
      let name=ref('测试')
      const userid='1'
      const phone='1234578910'
      const email='123456789@qq.com'
      const zone='计算机'
      const interest='数据库 架构 数据库系统'
      onMounted(()=>{
      const echart1 = echarts.init(document.getElementById('echarts1'))
      const echart2 = echarts.init(document.getElementById('echarts2'))
      const echart3 = echarts.init(document.getElementById('echarts3'))
      const echarts1option = {
        title: {
              text: '检索成果领域分布'
            },
        series:[
          {
            type: 'pie',
            data:[
            {
              value: 20,
              name: '建筑'
            },
            {
              value: 27,
              name: '能源'
            },
            {
              value: 33,
              name: '物理'
            },
            {
              value: 15,
              name: '数学'
            },
            {
              value: 5,
              name: '文学'
            }
            ]
          }
        ]
      }
      echart1.setOption(echarts1option)
      })
      return{
        username,
        identity,
        name,
        phone,
        email,
        zone,
        interest,
        userid,
        Reidentity
      }
    },
  }
  </script>
  <style>
  .userpassage {
    display: flex;
    align-items: center;
  }
  
  .passage1{
    align-items: c
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
  }
  
  .header1{
    font-size: 24px;
    margin-top: 0px;
    border-bottom: 1px solid;
  }
  
  .useridentity{
    color: #999999;
  }
  
  .realpassage{
    text-align: left;
  }
  
  .text {
    font-size: 14px;
  }
  
  .zone{
    margin-bottom: 32px;
    margin-top: 32px;
  }
  
  .item {
    margin-bottom: 32px;
  }
  
  .card1 {
    width: 480px;
  }
  
  .card2{
    width: 480px;
    margin-top: 64px;
  }
  
  .passage{
    margin-left: 80px;
  }
  
  .graph{
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  .graph .el-card{
    width: 48%;
  }
  .userid{
    color: #999999;
  }
  .id1{
    color: #000;
    margin-left: 20px;
  }
  
  .remake{
    margin-top: 40px;
    margin-left:320px;
  }
  
  .identitybutton{
    margin-left: 20px;
    margin-top: 35px;
  }
  </style>
  