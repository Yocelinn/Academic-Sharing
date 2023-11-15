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
                  </div>
                </el-card>
              </el-col>
              <el-col :span="16" style="padding-left: 40px;padding-right: 40px;"><div class="grid-content ep-bg-purple-light" />
                <el-card style="height:640px">
                  <el-table :data="history" style="width: 100%">
                    <el-table-column prop="date" label="浏览时间" width="150" />
                    <el-table-column prop="name" label="学术成果名称" width="180" />
                    <el-table-column prop="id" label="ID" width="120" />
                    <el-table-column prop="zone" label="领域" width="120" />
                    <el-table-column prop="writer" label="作者" width="145" />
                    <el-table-column fixed="right" label="操作" width="120">
                      <template #default>
                        <el-button link type="primary" size="small" @click="handleClick"
                          >删除</el-button
                        >
                        <el-button link type="primary" size="small">收藏</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-card>
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
  export default {
    components: {
      Personaside,
    },
    setup(){
      const username='Z-ARC'
      const identity='普通用户'
      const name='测试'
      const phone='1234578910'
      const email='123456789@qq.com'
      const zone='计算机'
      const userid='1'
      const interest='数据库 架构 数据库系统'
      const history = [
        {
          "date":"2023-09-02T12:47:13.219Z",
          "name":"地底人会梦见螺旋星系吗",
          "id": 1,
          "zone": "科学",
          "writer": "我也不知道",
        },
        {
          "date":"2023-09-02T12:47:13.219Z",
          "name":"调休打败了中秋国庆",
          "id": 2,
          "zone": "玄幻",
          "writer": "我也不知道",
        },
        {
          "date":"2023-09-02T12:47:13.219Z",
          "name":"我为什么会做这样的梦",
          "id": 3,
          "zone": "伦理",
          "writer": "我也不知道",
        },
      ]
      return{
        username,
        identity,
        userid,
        name,
        phone,
        email,
        zone,
        interest,
        history
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
  
  .userid{
    color: #999999;
  }
  .id1{
    color: #000;
    margin-left: 20px;
  }
  </style>
  