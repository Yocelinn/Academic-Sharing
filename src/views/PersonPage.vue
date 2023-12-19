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
                      <p class="userid"><span class="id1">{{ userid }}</span></p>
                      </div>
                      <div class="passage2">
                      <div class="realname">真实姓名:<span class="passage">{{ name }}</span></div>
                      <div class="phone">联系电话:<span class="passage">{{ phone }}</span></div>
                      <div class="address">联系邮箱:<span class="passage">{{ email }}</span></div>
                      <div class="zone">
                        研究领域:<span class="passage">{{ zone }}</span>
                      </div>
                      <div class="interest">
                        兴趣方向:<span class="passage">{{ interest }}</span>
                      </div>
                      <div class="remake"><el-button type="success" :icon="Edit" @click="rewritemessage">修改信息</el-button></div>
                      <el-dialog v-model="dialogFormVisible" title="修改信息">
                        <el-form :model="form">
                          <el-form-item label="真实姓名" :label-width="formLabelWidth">
                            <el-input v-model="username" autocomplete="off" />
                          </el-form-item>
                          <el-form-item label="联系电话" :label-width="formLabelWidth">
                            <el-input v-model="phone" autocomplete="off" />
                          </el-form-item>
                          <el-form-item label="联系邮箱" :label-width="formLabelWidth">
                            <el-input v-model="email" autocomplete="off" />
                          </el-form-item>
                        </el-form>
                        <template #footer>
                          <span class="dialog-footer">
                            <el-button @click="dialogFormVisible = false">取消</el-button>
                            <el-button type="primary" @click="submitmessage">
                              提交修改信息
                            </el-button>
                          </span>
                        </template>
                      </el-dialog>
                      </div>
                      </div>
                </el-card>
                <el-card class="card2">

                </el-card>
              </el-col>
              <el-col :span="8" style="padding-left: 40px;padding-right: 40px;"><div class="grid-content ep-bg-purple-light" />
                <el-card style="height:360px">
                  <div id="echarts1" style="height:360px"></div>
                </el-card>
                <div class="data">
                  <el-card class="card4">
                    <div class="dataheader">
                    <header>个人数据</header>
                    </div>
                    <div class="passage3">
                    <div class="textdata">总成果数：<span class="passage">{{ textdata }}</span></div>
                    <div class="indexed">被引指数：<span class="passage">{{ indexed }}</span></div>
                    <div class="index">引用文献：<span class="passage">{{ index }}</span></div>
                    <div class="patent">专利引用次数：<span class="P6assage">{{ patent }}</span></div>
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
      },
      rewritemessage(){
        this.dialogFormVisible = true;
        this.rewriteusername = this.username;
        this.rewriteemail = this.email;
        this.rewritephone = this.phone;
      },
      submitmessage(){
        this.dialogFormVisible = false;
        var data={
          
        }
        post('/user/update',data).then((response)=>{
          this.dialogFormVisible = false;
        })
      }
    },
    setup(){
      const dialogFormVisible = ref(false)
      const username='沃兹基·弁德'
      const rewriteusername=ref('')
      const rewritephone=ref('')
      const rewriteemail=ref('')
      const identity=ref('某著名科学研究院')
      const Reidentity = () =>{
        identity.value = '学者'
      }
      let name=ref('测试')
      const userid='北京 中国'
      const phone='1234578910'
      const email='123456789@qq.com'
      const zone='计算机'
      const interest='数据库 架构 数据库系统'
      const textdata='149'
      const indexed='1039'
      const index='1103'
      const patent='4'
      onMounted(()=>{
      const getusermessage =() =>{
        get('/user/getinform/?id=1').then((response)=>{
            console.log(response.data)

        })
      }
      const echart1 = echarts.init(document.getElementById('echarts1'))
      const echarts1option = {
        title: {
              text: '学术成果关键词'
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
        dialogFormVisible,
        username,
        identity,
        name,
        phone,
        email,
        zone,
        interest,
        userid,
        textdata,
        indexed,
        index,
        patent,
        rewriteusername,
        rewritephone,
        rewriteemail,
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

  .userid{
    color: #999999;
    margin-left: 10px;
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
  }
  .index{
    margin-bottom: 24px;
  }
  
  .card1 {
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
  
  .card4{
    margin-top: 40px;
    height: 370px;
  }
  .passage{
    margin-left: 80px;
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
  
  .remake{
    margin-top: 40px;
  }
  
  .identitybutton{
    margin-left: 20px;
    margin-top: 35px;
  }
  </style>
  