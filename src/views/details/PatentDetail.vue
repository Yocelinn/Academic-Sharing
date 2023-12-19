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
                    <h1 class="paper-title">动态算法选择</h1>
                </div>
                <div class="author"><div class="author-title">
                  发明人：</div>
                  <div class="author-item" v-for="(item, index) in authors" :key="index">
                    {{ item }} 
                  </div> 
                  </div>
                <div class="author"><div class="author-title">申请人：</div>
                  <div class="author-item"> 国际商业机器公司</div>
                </div>
                <div class="detail">
                  <div class="content-container">
                    <div class="little-title">关键词：</div>
                    <div class="content"> 知识图谱; 语义网; 信息检索; 语义搜索引擎; 自然语言处理;</div>
                    
                  </div>
                    <div class="content-container">
                        <div class="little-title">摘要：</div>
                        <div class="content">本发明涉及动态算法选择。通过以下操作动态选择乘法算法：接收操作数A和B，确定A与B之间的差值，如果所述差值低于阈值，则选择第一乘法算法，
                          如果所述差值等于或超过所述阈值，则选择第二乘法算法，对所述操作数进行预缩放，计算所述经缩放的操作数的商，使用所述选择的算法将所述商反向相乘，产生乘积，从操作数A减去所述乘积，产生余数，并且提供所述余数作为输出。</div>
                    </div>
                
                    <div class="content-container">
                        <div class="little-title">申请日：</div>
                        <div class="content">2023-02-21</div>
                    </div>
                    <div class="content-container">
                        <div class="little-title">申请号：</div>
                        <div class="content"> CN202310142919.3 </div>
                    </div>
                    <div class="content-container">
                        <div class="little-title">公开日：</div>
                        <div class="content"> 2023-08-29</div>
                    </div>
                    <div class="content-container">
                        <div class="little-title">公开号：</div>
                        <div class="content">  CN116661747A </div>
                    </div>
                    <div class="content-container">
                        <div class="little-title">IPC分类号：</div>
                        <div class="content">   G06F8/30 , G06F7/72 , G06F7/46</div>
                    </div>
                </div>
                <!-- <div class="button-list">
                    <el-button>收藏</el-button>
                    <el-button>预览</el-button>
                    <el-button>去往来源</el-button>
                </div> -->
            </el-card>
            
        </section>
        <section id="section2">
          <div class="recommend-card">
            <div>
                <h2 class="recommend-title" >相关内容推荐</h2> 
            </div>
            <ol class="paper-list">
              <li class="list-item" v-for="(item, index) in paperList" :key="index">
                <div class="recommend-papar-name"> {{ item.name }} </div>
                <div class="detail-list" >
                  <div class="detail-item" v-for="(person, index) in item.authors" :key="index"> {{ person }}. </div>
                </div>
                <div class="detail-list"> {{ item.resource }} </div>
              </li>
            </ol>
          </div>
        </section>
        <section id="section3">    
          <div class="comment-card">
            <div class="comment-label" >评论区</div> 
            <div class="comment-container">
                <div class="comment-title">
                  还没有评论/ 评论 108
                </div>
                <div class="comment-input"><textarea class="reply-box"> 我的评论 </textarea>  </div>
                <div class="replys">还没有评论</div>
             </div>
          </div>
        
        </section>
       </div>
        <el-col :span="6">
            <el-card shadow="hover" class="other-info-card">
              <div class="info-box">
                <div class="info-title"><el-icon><Link /></el-icon>文章来源</div>
                
                <div class="button-container">
                  <div class="button-list"><el-icon><Reading /></el-icon>去往来源</div>
                </div>
              </div>
              <div class="info-box">
                
                <div class="info-title"><el-icon><Operation /></el-icon>常用操作</div>
                <div class="button-container">
                  <div class="button-list"><el-icon><Star /></el-icon>收藏</div>
                  <div class="button-list"><el-icon><Promotion /></el-icon>推荐</div>
                </div>
              </div>
              <div class="info-box">

                <div class="info-title"><el-icon><Edit /></el-icon>问题反馈</div>
                <div class="button-container">
                  <div class="button-list"><el-icon><Warning /></el-icon>数据错误</div>
                  <div class="button-list"><el-icon><Remove /></el-icon>撤稿申请</div>
                </div>
              </div>
            </el-card>

        </el-col>
        <el-backtop :right="100" :bottom="100" color="#8fc0a9"/>
    </div>
        
  </template>
  
  <script>
import { onMounted,ref } from 'vue';
  
  export default {
    name: 'PaperDetail',
    setup() {
      const paperList = ref([
        { id: '', name: '', authors:[], resource: ''},
      ]);
      
      onMounted( () => {
        getPaperList();
      })

      function getPaperList() {
        paperList.value = [
          { 
            name:  '基于深度学习的食品安全风险知识图谱构建方法[J]. ',
            authors: ['袁刚','郭爽','唐琦','许入文','王金国','韩春晓','温圣军','张文通'],
            resource: '质量安全与检验检测,2023(05)'
          },
          { 
            name: '主流知识图谱存储系统试验对比[J]',
            authors: ['葛唯益','王振宇','王羽','陆辰','姜晓夏'],
            resource: '指挥信息系统与技术,2019(05)'
          },
          { 
            name: '面向档案的知识图谱构建方法研究[J]', 
            authors: ['王电化','钱涛','钱立新','盛琦','夏春梅'],
            resource: '湖北科技学院学报,2020(01)'
          },
          { 
            name: '知识图谱可视化查询技术综述[J]',
            authors: ['王鑫','傅强','王林','徐大为','王昊奋'],
            resource: '计算机工程,2020(06)'
          },
          { 
            name: '知识图谱学习和推理研究进展[J]',
            authors: ['吴运兵','杨帆','赖国华','林开标'],
            resource: '小型微型计算机系统,2016(09)'
          }
        ];
      }

      return {
        paperList
      };

      
    },
    data() {
      return {
        selectedSection: null,
        authors:[ 'K·C·舍尔姆' ,'C·利希特瑙' ,'M·克莱因' ,'S·佩尔' ,'P·莱伯'],
      };
    },
    methods: {
      scrollToSection(selector) {
        const targetElement = document.querySelector(selector);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
          this.selectedSection = selector.slice(1); // 更新选中项
        }
      },
      
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
    width: 80px;
    text-align: left;
  }
  .author-item {
    margin-right: 8px;
    text-align: left;
    cursor: pointer;
    border-bottom: white 1px solid;
  }
  .author-item:hover {
    border-bottom: #45bc82 1px dotted;
    background-color: #d1e9de;
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
    word-wrap: break-word;
    flex: 1;
    font-size: 15px;
    align-items: center;
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
    background-color: #5dd39a;
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
    background-color: #8fc0a9;
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
    height: 50px;
    border-radius: 5px;
    background-color: #f3f6f3;
  } 
  .reply-box{
    width: 100%;
    height: 100%;
    padding: 0 10px;
    border: 1px solid var(--Ga1);
    border-radius: 6px;
    background-color: var(--bg3);
    font-family: inherit;
    line-height: 50px;
    color: var(--text1);
    resize: none;
    outline: none;
  }
  .replys {
    height: 300px;
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
  </style>
  