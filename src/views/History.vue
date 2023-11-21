<template>
    <div class="common-layout">
      <el-container>
        <el-aside width="200px">
          <Personaside></Personaside>
        </el-aside>
        <el-container>
          <el-main>
            <el-row>
              <el-col :span="16" style="padding-right: 40px;"><div class="grid-content ep-bg-purple-light" />
                <el-card style="height:640px" class="historycard">
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
              <el-col :span="8" style="padding-right: 10px"><div class="person-passage" />
                <el-card class="card114514">
                    <div class="findhistory">
                      <el-input v-model="input" placeholder="输入你需要查找的历史记录" class="historyinput" />
                      <el-button class="historybutton" type="success">搜索</el-button>
                    </div>
                </el-card>
                <el-card class="historycard2" style="height: 390px;"> 
                  <div id="graph" style="height: 390px;"></div>
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
  import { onMounted } from 'vue';
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
          "zone": "历史",
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
      onMounted(()=>{
        const echart1 = echarts.init(document.getElementById('graph'))
        const echarts1option = {
        title: {
              text: '历史浏览成果领域分布'
            },
        series:[
          {
            type: 'pie',
            data:[
            {
              value: 1,
              name: '科学'
            },
            {
              value: 1,
              name: '历史'
            },
            {
              value: 1,
              name: '伦理'
            },
            ]
          }
        ]
      }
      echart1.setOption(echarts1option)
      })
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
  .card114514{
    height: 120px;
  
  }
  
  .passage1{
    align-items: c
  }
  .historycard{
    border-top-color: #688f4e;
    border-top-width: 10px ;
  }
  .historycard2{
    margin-top: 140px;
  }
  .historybutton{
    margin-top: 20px;
    color: #ffffff;
  }
  .historyinput{
    width: 240px;
    margin-right: 20px;
    margin-top: 20px;
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
  