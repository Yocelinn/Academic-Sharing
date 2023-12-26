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
                    <el-table-column label="浏览时间" width="175" >
                      <template #default="scope">
                        {{ scope.row.time }}
                      </template>
                    </el-table-column>  
                    <el-table-column label="学术成果名称" width="200" >
                      <template #default="scope">
                        {{ scope.row.name }}
                      </template>
                    </el-table-column>
                    <el-table-column label="ID" width="120" >
                      <template #default="scope">
                        {{ scope.row.searchID }}
                      </template>
                    </el-table-column>
                    <el-table-column label="领域" width="250" >
                      <template #default="scope">
                        {{ scope.row.conceptDis[0].name }} 
                        {{ scope.row.conceptDis[1].name }}
                      </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="140">
                      <template #default="scope">
                        <el-button link type="primary" size="small" @click="historydelete(scope.row)"
                          >删除</el-button
                        >
                        <el-button link type="primary" size="small">查看</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-card>
              </el-col>
              <el-col :span="8" style="padding-right: 10px"><div class="person-passage" />
                <el-card class="card114514">
                    <div class="findhistory">
                      <el-input v-model="input" placeholder="输入你需要查找的历史记录" class="historyinput" />
                      <el-button class="historybutton" type="success" @click="searchhistorys">搜索</el-button>
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
  import { onMounted,ref} from 'vue';
  import {post,get} from "../api/api.js"
  import {GetHistory,DeleteHistory,SearchHistory,GetData}from "../api/record.js"
  import { moment } from 'moment';
  export default {
    components: {
      Personaside,
    },
    methods:{
    },
    setup(){
      const input=ref('')
      const username='Z-ARC'
      const identity='普通用户'
      const name='测试'
      const phone='1234578910'
      const zone='计算机'
      const email='123456789@qq.com'
      const userid='1'
      const interest='数据库 架构 数据库系统'
      const history = ref([])
      const searchhistorys=()=>{
        var promise=SearchHistory(input.value)
        promise.then((response=>{
          console.log(response.data)
          history.value = response.data
          console.log(history.value)
        }))
      }
      const historydelete=(row)=>{
        var promise=DeleteHistory(row.searchID)
        promise.then((response=>{
          console.log(response.data)
          var promise2 = GetHistory()
          promise2.then((response=>{
          console.log(response.data),
          history.value = response.data
        }))
        }))
      }
      onMounted(()=>{
        var promise = GetHistory()
        promise.then((response=>{
          console.log(response.data),
          history.value = response.data
          for(var i=0;i<history.value.length;i++){
            history.value[i].time=moment(history.value[i].time).utcOffset(8).format('YYYY/MM/DD HH:mm:ss')
          }
        }))
        let echarts1option = {
        title: {
              text: '历史浏览成果领域分布'
            },
        series:[
          {
            type: 'pie',
            data:[
            {
              value: 1,
              name: '欢迎您的使用'
            },
            ]
          }
        ]
        }
        var promise2 = GetData()
        promise2.then((response=>{
          console.log(response.data)
          console.log(echarts1option.series)
          if(response.data.length!=0){
          echarts1option.series[0].data=response.data
          }
          const echart1 = echarts.init(document.getElementById('graph'))
          echart1.setOption(echarts1option)
        }))
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
        history,
        input,
        searchhistorys,
        historydelete
      }
    },
  }
  </script>
  <style>
  .card114514{
    margin-top: 40px;
    height: 120px;
  
  }
  
  .passage1{
    align-items: c
  }
  .historycard{
    margin-top: 40px;
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
  