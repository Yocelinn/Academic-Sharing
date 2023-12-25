  <template>
    <div class="page-container">
      <div class="nav-container">
        <nav class="vertical-nav">
            <ul><div class="nav-label"><el-icon><Position /></el-icon>导航信息</div>
            <li><div class="section-text" :class="{ 'active': selectedSection === 'section1' }" @click="scrollToSection('#section1')">专利基本信息</div></li>
            <li><div class="section-text" :class="{ 'active': selectedSection === 'section2' }" @click="scrollToSection('#section2')">相关内容推荐</div></li>
            <li><div class="section-text" :class="{ 'active': selectedSection === 'section3' }" @click="scrollToSection('#section3')">交流评论</div></li>
            </ul>
        </nav>
      </div>
      <div class="main-content">
        <section id="section1">
            <el-card shadow="never" class="detail-card">
                <div class="title">
                    <h1 class="paper-title">{{ detailInfo.title }}</h1>
                </div>
                <div class="person-container" v-if="detailInfo.title != ''">
                <div class="author"><div class="author-title">
                  发明人：</div>
                  <div class="author-item" v-for="(item, index) in detailInfo.inventors" :key="index">
                    {{ item }} <div v-if="index < detailInfo.inventors.length-1"> , </div>
                  </div> 
                  </div>
                <div class="author"><div class="author-title">申请人：</div>
                  <div class="author-item" v-for="(item, index) in detailInfo.applicants" :key="index" > {{ item }}</div>
                </div>

                <div class="detail">
                    <div class="content-container">
                        <div class="little-title">摘要：</div>
                        <div class="content" > {{ detailInfo.abstracts }}</div>
                    </div>
                    <div class="content-container">
                        <div class="little-title">专利内容：</div>
                        <div class="content" v-html="detailInfo.claim"></div>
                    </div>
                
                    <div class="content-container">
                        <div class="little-title">申请日：</div>
                        <div class="content"> {{ detailInfo.apply_date }} </div>
                    </div>
                    <div class="content-container">
                        <div class="little-title">申请号：</div>
                        <div class="content"> {{ detailInfo.apply_number }} </div>
                    </div>
                    <div class="content-container">
                        <div class="little-title">公开日：</div>
                        <div class="content"> {{ detailInfo.issue_date }}</div>
                    </div>
                    <div class="content-container">
                        <div class="little-title">公开号：</div>
                        <div class="content"> {{ detailInfo.issue_number }} </div>
                    </div>
                    <div class="content-container">
                        <div class="little-title">IPC分类号：</div>
                        <div class="number-list"  v-for="(item, index) in detailInfo.ipc_number" :key="index"> 
                          {{ item }} <div v-if="index < detailInfo.ipc_number.length-1"> , </div>
                        </div>
                    </div>
                </div>
              </div>
              <el-skeleton v-else  animated :rows="4"> 
              </el-skeleton>
            </el-card>
            
        </section>
        <section id="section2">
          <div class="recommend-card">
            <div>
                <h2 class="recommend-title" >相关内容推荐</h2> 
            </div>
            <ol class="paper-list" v-if="patentList.length > 1">
              <li class="list-item" v-for="(item, index) in patentList" :key="index">
                <div class="recommend-papar-name"> {{ item.name }} </div>
                <div class="detail-list" >
                  <div class="detail-item" v-for="(person, index) in item.authors" :key="index"> {{ person }}. </div>
                </div>
                <div class="detail-list"> {{ item.resource }} </div>
              </li>
            </ol>
            <el-skeleton v-else  animated :rows="3"> 
                </el-skeleton>
          </div>
        </section>
        <section id="section3">    
          <div class="comment-card">
            <div class="comment-label" >评论区</div> 
            <div class="comment-container">
                <div class="comment-title" v-if="comments.length == 0">
                  还没有评论
                </div>
                <div class="comment-title" v-else>
                  评论 {{comments.length}}
                </div>
                <div class="comment-input"><textarea id="commentBox" class="reply-box" placeholder="我的评论"></textarea><button @click="postComment()" class="reply-button">发布</button></div>
                <div class="replys" v-if="comments.length == 0">还没有评论</div>
                <div v-else class="comment-list" v-for="(item, index) in comments" :key="index">
                  <div class="comment-user">{{ item.userName }}</div>
                  <div class="comment-content">{{ item.content }}</div>
                  <div class="comment-time">{{ item.time }}</div>
                </div>
             </div>
          </div>
        
        </section>
       </div>
        <el-col :span="6">
            <el-card shadow="hover" class="other-info-card">
              <!-- <div class="info-box">
                <div class="info-title"><el-icon><Link /></el-icon>文章来源</div>
                
                <div class="button-container">
                  <div class="button-list"><el-icon><Reading /></el-icon>去往来源</div>
                </div> 
              </div> -->
              <div class="info-box">
                
                <div class="info-title"><el-icon><Operation /></el-icon>常用操作</div>
                <div class="button-container">
                  <div class="button-list" @click="collect()"><el-icon><Star /></el-icon>收藏</div>
                  <div class="button-list"><el-icon><Promotion /></el-icon>推荐</div>
                </div>
              </div>
              <div class="info-box">

                <div class="info-title"><el-icon><Edit /></el-icon>问题反馈</div>
                <div class="button-container">
                  <div class="button-list" @click="reportError()"><el-icon><Warning /></el-icon>数据错误</div>
                  <div class="button-list" @click="reportRevoke()"><el-icon><Remove /></el-icon>撤稿申请</div>
                </div>
              </div>
            </el-card>

        </el-col>
        <el-backtop :right="100" :bottom="100" color="#8fc0a9"/>

        <el-dialog v-model="dialogVisible" :title="dialog.title" width="40%" center>
        <div class="input-container" v-if="!successVisible">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="申请信息" style="width:500px;">
              <el-input v-model="formInline.content" placeholder="请填写申请信息" type="textarea" clearable >
                </el-input>
            </el-form-item>
            <!-- <el-form-item label="联系方式" style="width:500px;">
              
            </el-form-item> -->
          </el-form>
        </div>
        <el-result icon="success" title="提交成功" sub-title="感谢您的反馈！" v-else>
          <template #extra>
            <el-button type="primary" @click="closeDialog">关闭</el-button>
          </template>
        </el-result>
        <template #footer v-if="!successVisible">
          <span class="dialog-footer" >
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="onSubmit">
              提交
            </el-button>
          </span>
        </template>
      </el-dialog>
      <el-dialog v-model="alertLogVisible" title="提示" width="30%" center>
        <el-form-item>
          <span style="width: 100%;text-align: center;font-weight: 600;font-size: 15px;">  您还未登录，请先登录 </span>
        </el-form-item>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="alertLogVisible = false">
              好
            </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
        
  </template>
  
  <script>
  import { onMounted,ref,reactive } from 'vue';
  import { useRoute } from 'vue-router';
  import * as PatentApi from '../../api/patent';
  import moment from 'moment'; 
  import axios from 'axios';
  import store from '@/store';
  import {ElNotification} from 'element-plus';
  
  export default {
    name: 'PatentDetail',
    setup() {
      const patentList = ref([
        { id: '', name: '', authors:[], resource: ''},
      ]);
      var patentId = useRoute().query.patentId;
      const comments = ref([{
        content: '',
        userId: 0,
        workId: '',
        time: '',
      }]);
      const dialogVisible = ref(false);
      const dialog = ref({
        title: '',
        content: '',
      })
      const formInline = reactive({
        content: '',
        contact:'',
        date: '',
      })
      const successVisible = ref(false)
      const alertLogVisible = ref(false)
      const detailInfo = ref({
        title: '',
        inventors: '',
        issue_date: '',
        issue_number: '',
        apply_date: '',
        apply_number: '',
        claim: '',
        ipc_number:'',
        id: '',   /*这个id是和patentId对应 */
        abstract: '',
        links: '',
      });
      var title = '';


      onMounted(async () => {
        try{
          await getDetailInfo();
          getComments();
        } catch{
          console.log("getDetailInfo error!")
        }
        
        getPaperList();
      })

      async function getDetailInfo() {
        if(patentId == null){
          patentId = '2ce8e8808848041f175895139ff8795a';
        }
        let flag = 0;
        PatentApi.GetPatentById(patentId)
        .then((response) => {
            detailInfo.value = response;
            title = response.title;
            
        })

        console.log("^_^ call get paper!")
        console.log(detailInfo)
      }

      function getPaperList() {
        console.log(title)
        // console.log(JSON.stringify(title.t))

        PatentApi.GetPatentRecommendById(title)
        .then((response) => {

            patentList.value = response;
            console.log(patentList.value)
           
        })
      }
      function getComments() {
        PatentApi.GetCommentByWorkIdAndType(patentId)
        .then((response) => {
          console.log(response)
          // comments.value = response;
          // if(response.code == 200) {
            comments.value = response;
            for(var i=0; i < comments.value.length; i++) {
              comments.value[i].time = moment(comments.value[i].time).utcOffset(8).format('YYYY/MM/DD HH:mm:ss')

            }

          // } else {
          //   console.log(response.code)
          // }
        })
      }

      function postComment() {
        var textarea = document.getElementById('commentBox');

        // 获取 textarea 的值（文本内容）
        var content = textarea.value;
        const commentData = ref({
          "content": '',
          "workId": 0,
        })
        // 现在还是测试数据，故userId和workId都不确定
        commentData.value.content  = content
        PatentApi.PostComment(commentData.value, patentId)
        .then((response) => {
          console.log("postComment result:" + response)
          if(response) {
              textarea.value = '';
              ElNotification({
                  message: "评论发布成功！",
                  type: 'success',
                  showClose: true,
                  position: 'top-right',
                  duration: 2000,
              });
              getComments();
            }
        })
      }

      function reportError() {
        if(store.state.userInfo.isLogin){
          dialog.value.title = "报告数据错误"
          dialogVisible.value = true;
        } else {
          alertLogVisible.value = true;
        }
      }
      function reportRevoke() {
        if(store.state.userInfo.isLogin){
          dialog.value.title = "提交撤稿申请"
          dialogVisible.value = true;
        } else {
            alertLogVisible.value = true;
        }
      }
      

      const onSubmit = () => {
        successVisible.value = true;
        console.log('submit!')
      }
      const closeDialog = () => {
        dialogVisible.value = false;
        successVisible.value = false;
      }
      const collect = () => {
        ElNotification({
            message: "收藏成功！",
            type: 'success',
            showClose: true,
            position: 'top-right',
            duration: 2000,
        });
      }
      const promote = () => {
        ElNotification({
            message: "推荐成功！",
            type: 'success',
            showClose: true,
            position: 'top-right',
            duration: 2000,
        });
      }

      return {
        patentList,
        comments,
        detailInfo,
        dialogVisible,
        dialog,
        formInline,
        successVisible,
        alertLogVisible,
        title,

        postComment,
        reportError,
        reportRevoke,
        onSubmit,
        closeDialog,
        collect,
        promote,
      };

      
    },
    data() {
      return {
        selectedSection: 'section1',
        authors:[ 'K·C·舍尔姆' ,'C·利希特瑙' ,'M·克莱因' ,'S·佩尔' ,'P·莱伯'],
      };
    },
    watch: { // 监听，当路由发生变化的时候执行
        $route(to, from){
            // console.log(from.path); // 从哪来
            // console.log(to.path); // 到哪去
            location.reload()
        },
    },
    methods: {
      scrollToSection(selector) {
        const targetElement = document.querySelector(selector);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
          this.selectedSection = selector.slice(1); // 更新选中项
        }
      },
      handleIntersection(entries) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // entry.target 是当前进入视口的元素
            this.selectedSection = entry.target.id;
          }
        });
      },
      gotoPaper(patentId) {
        var patentId = String(patentId)
        this.$router.push({name:'PatentDetail', query:{patentId} });
        console.log(patentId)
      }
    }
  }
  </script>

  <style scoped>
  .page-container {
    display: flex;
    position: relative;
  }
  /* 导航栏布局*/
  nav {
    padding: 20px;
  }
  .nav-label {
    border-radius: 4px;
    box-shadow: 0 1px 3px  #89998f;
    padding: 8px 5px;
    margin-bottom: 10px;
    align-items: center;
    display: flex;
  }
  .nav-container {
    position: relative;
    top: 0;
  }
  .vertical-nav {
    position: absolute;
    width: 120px; /* 调整导航的宽度 */
    position: sticky;
    top:10px;
  }
  .active {
    color: rgb(63, 115, 70) !important; /* 选中项的背景色 */
    background-color: rgb(238, 247, 243);
    border-radius: 3px;
  }
  ul {
    list-style-type: none;
    padding: 0 10px;
    border-right: #bac1bd 1px solid;
  }
  li {
    margin-bottom: 10px; /* 调整导航项之间的间距 */
  }

  /*setion的布局*/
  .main-content {
    flex: 1;
  }
  section {
    margin-bottom: 30px; /* 调整各个 section 之间的间距 */
  }
  .section-text {
    display: block;
    padding: 10px 0;
    cursor: pointer;
    font-size: 15px;
    color: #89998f;
  }

  /* 作品信息布局*/
  .detail-card {
    margin: 20px;
    /*padding: 10px;
    box-shadow: 0 0.0625rem 0.125rem #0000004d;*/
  }
  
  .divider {
    height: 5px;
  }
  .paper-title {
    border-bottom: solid 2px rgb(196, 190, 190);
    padding-bottom: 10px;
    color: #55ab8b;
    text-align: left;
    padding: 10px;
  }
  .person-container {
    text-align: left;

  }
  .detail {
    padding: 10px;
    text-align: left;
  }
  .author {
    padding: 10px;
    font-weight: 600;
    margin-right: 6px;
    font-size: 16px;
    display: flex;
    
  }
  .author-title {
    width: 85px;
    text-align: left;
  }
  .author-item {
    margin-right: 8px;
    text-align: left;
    cursor: pointer;
    border-bottom: white 1px solid;
    display: flex;
  }
  .author-item:hover {
    /* border-bottom: #45bc82 1px dotted; */
    background-color: #e8f3ee;
  }
  
  .little-title {
    font-weight: 600;
    margin-right: 6px;
    font-size: 15px;
    width: 85px;
    color: gray;
  }
  .content-container {
    display: flex;
    padding-bottom: 20px;
  }
  .content {
    /* word-wrap: break-word; */
    flex: 1;
    font-size: 15px;
    /* align-items: center;
    flex-wrap: wrap;
    display: flex; */
  }
  .number-list{
    font-size: 15px;
    display: flex;
  }
  .button-list {
    margin-right: 20px;
    padding: 5px 8px;
    background-color: rgb(224, 239, 239);
    border-radius: 5px;
    display: block;
    border: none;
    box-shadow: 0 0.0625rem 0.125rem #0000004d;
    align-items: center;
    display: flex;

  }
  /* 相关文献推荐 */
  .recommend-card {
    margin: 20px;
  }
  .recommend-title {
    
    border-bottom: solid 2px #d1d1d1; 
    padding: 5px 10px;
    text-align: left;
    background-color: rgba(56, 168, 64, 0.7);
    border-radius: 5px;
    color:rgb(251, 251, 251);
    font-weight: 500;
    font-size: 21px;
  }
  .paper-list {
    text-align: left;
  }
  .list-item {
    font-weight: 500;
    margin: 10px 0 0 0;
  }
  .recommend-papar-name {
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
  }
  .recommend-papar-name:hover {
    color: #45bc82;
  }
  .detail-list {
    display: flex;
    font-size: 14px;
    color: #989d9a;
    margin-top: 5px;
  }
  .detail-item {
    margin-right: 5px;
  }
  /* 评论区内容 */
  .comment-card {
    margin: 20px;
  }
  .comment-label {
     border-bottom: solid 2px #d1d1d1; 
     /* padding-bottom: 10px; */ 
    padding: 5px 10px;
    text-align: left;
    background-color: rgba(56, 168, 64, 0.7);
    border-radius: 5px;
    color:white;
    font-weight: 500;
    font-size: 21px;
    margin-bottom: 20px;
  }
  .comment-container {
    border-radius: 4px;
    border: 1px #d2d0d0 solid;
    
  }
  .comment-title {
    text-align: left;
    padding: 10px;
    margin: 5px 10px 0;
    font-weight: 600;
    font-size: 18px;
    border-bottom: 1px #bebaba solid;
  }
  .comment-input {
    margin: 20px;
    /* min-height: 50px; */
    /* max-height: 200px; */
    /* resize: vertical; 允许垂直调整大小 */
    display: flex;
    align-items: center;
    border-radius: 5px;
    background-color: #f3f6f3;
  } 
  .reply-box{
    width: 100%;
    padding: 0 10px;
    border: 1px solid var(--Ga1);
    border-radius: 6px;
    background-color: var(--bg3);
    font-family: inherit;
    line-height: 40px;
    min-height: 40px;
    max-height: 200px; 
    color: var(--text1);
    resize: vertical;
    outline: none;
  }
  .replys {
    height: 300px;
  }
  .reply-button {
    height: 30px;
    background-color: #c2e8d6;
    border: none;
    width: 80px;
    border-radius: 10px;
  }
  .comment-list {
    text-align: left;
    border-bottom: #5dd39a 1px solid;
    margin:10px 30px;
    padding: 5px 10px;
  }
  .comment-user {
    font-weight: 600;
  }
  .comment-content {
    font-weight: normal;
    margin-left: 10px;
    padding: 10px;
  }
  .comment-time {
    color: grey;
    margin-left: 20px;
    font-size: 14px;
  }

  /* 更多信息布局*/
  .other-info-card {
    height: 600px;
    width: 300px;
    margin: 20px;
    background-color: #ebf6f1;
  }
  .info-box {
    border-bottom: #55ab8b 1px solid;
    padding: 10px;
  }
  .info-title {
    display: flex;
    font-weight: 500;
    margin: 5px 0 20px 0 ;
    align-items: center;
  }
  .button-container {
    display: flex;
    align-items: center;
    font-size: 15px;
  }
  :deep(.el-backtop) {
    color: #69a57b;
  }

  /*一些全局信息*/
  :deep(.el-icon)  {
    margin-right: 3px;
  }
  :deep(.el-textarea__inner)  {
    height: 250px;
  }
  :deep(.el-skeleton__p.is-first) {
      width: 100%;
  }
  :deep(.el-skeleton__p.is-last) {
      width: 100%;
  }
  </style>
  