  <template>
    <div class="page-container">
        <el-row :gutter="12">
        <el-col :span="18">
            <el-card shadow="never" class="detail-card">
                <div class="title">
                    <h1 class="paper-title">论文标题： 知识图谱构建技术综述</h1>
                    <p>论文作者： 刘峤  李杨  段宏  刘瑶  秦志光</p>
                    <p>论文来源： baidu</p>
                    <p>关键词： 知识图谱; 语义网; 信息检索; 语义搜索引擎; 自然语言处理;</p>
                </div>
                <div class="detail">
                    <div class="content-container">
                        <div class="little-title">摘要：</div>
                        <div class="content">谷歌知识图谱技术近年来引起了广泛关注,由于公开披露的技术资料较少,使人一时难以看清该技术的内涵和价值.从知识图谱的定义和技术架构出发,对构建知识图谱涉及的关键技术进行了自底向上的全面解析.1)对知识图谱的定义和内涵进行了说明,并给出了构建知识图谱的技术框架,按照输入的知识素材的抽象程度将其划分为3个层次:信息抽取层、知识融合层和知识加工层;2)分别对每个层次涉及的关键技术的研究现状进行分类说明,逐步揭示知识图谱技术的奥秘,及其与相关学科领域的关系;3)对知识图谱构建技术当前面临的重大挑战和关键问题进行了总结.</div>
                    </div>
                </div>
                <div class="detail">
                    <div class="content-container">
                        <div class="little-title">发表日期：</div>
                        <div class="content">2016/06/15</div>
                    </div>
                </div>
                <div class="detail">
                    <div class="content-container">
                        <div class="little-title">文献编号：</div>
                        <div class="content">123-12345</div>
                    </div>
                </div>
                <div class="button-list">
                    <el-button>收藏</el-button>
                    <el-button>预览</el-button>
                    <el-button>去往来源</el-button>
                </div>
            </el-card>
            <el-card shadow="never" class="detail-card">
                <div>
                    <h2 class="comment-title" >评论区</h2> 
                 </div>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card shadow="hover" class="other-info-card">
                <h3>引用关系：</h3>
                12345
            </el-card>
            <el-card shadow="hover" class="other-info-card">
                <h3>知识图谱：</h3>
               <router-link to="/">链接</router-link>
            </el-card>
            <el-card shadow="hover" class="other-info-card">
                <h3>下载量：</h3>
                12345
            </el-card>
            <el-card shadow="hover" class="other-info-card">
                <h3>相关搜索： </h3>
                <div>12345 </div>
                <div>12345 </div>
            </el-card>
        </el-col>
        </el-row>
        
    </div>
        
  </template>
  
  <script>
  
  export default {
  }
  </script>

  <style scoped>
  .detail-card {
    margin: 20px;
    padding: 10px;
    box-shadow: 0 0.0625rem 0.125rem #0000004d;
  }
  .other-info-card {
    height: 200px;
    width: 300px;
    margin: 20px;
  }
  .divider {
    height: 5px;
  }
  .paper-title {
    border-bottom: solid 2px rgb(196, 190, 190);
    padding-bottom: 10px;
    margin-bottom: 40px;
  }
  .detail {
    padding: 20px;
    text-align: left;
  }
  .little-title {
    font-size: larger;
    font-weight: 500;
    width: 100px;
    font-family: "黑体", sans-serif;
  }
  .content-container {
    display: flex;
  }
  .content {
    word-wrap: break-word;
    flex: 1;
  }
  .button-list {
    padding: 20px;
    background-color: rgb(224, 239, 239);
    border-radius: 5px;
  }
  .comment-title {
    border-bottom: solid 2px rgb(196, 190, 190);
    padding-bottom: 10px;
    margin-bottom: 40px;
    text-align: left;
  }
  </style>
  