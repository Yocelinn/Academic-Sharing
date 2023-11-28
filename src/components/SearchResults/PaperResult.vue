<template>
    <div >
        <el-card type="primary" class="card" shadow="hover"> 
            <div class="result">
                <div class="info">
                <div class="title">{{ paper.title }}</div>
                <div class="authors">
                  <el-icon color=var(--primary-color) class="author-icon"><UserFilled /></el-icon>
                  {{ paper.authors.join(', ') }}</div>
                <div class="date">{{ paper.date }}</div>
                <div class="abstract">
                    <p>摘要:{{ paper.abstract }}</p>
                </div>
            </div>
            <div class="operate">
                <div class="op">下载</div>
                <div class="op">HTML阅读</div>
                <div class="op">收藏</div>
                <div class="op">引用</div>
               
            </div>
            </div>
            
        </el-card>
   
    </div>
  </template>
  
  <script>
  export default {
    props: {
      paper: Object,
    },
  };
  </script>
  
  <style scoped>
  .card{
    padding: 10px 10px;
    margin:0 0 20px 0;
  }
  .result {
   
    text-align: left;
    display: flex;

  }
  .info{
    width:80%;
    border-right: 1px solid #ddd; padding-right: 10px;
  }
  .title {
    font-size: 17px;
    font-weight: bolder;
    color:var(--green-dark)
  }
  
  .authors {
    font-size:14px;

    margin: 20px 0;
  }
  .author-icon{
    margin-right:5px;
    inline-size: none;
  }
  .date{
    font-size:13px;
    color:gray
  }
  .abstract {
    margin-top: 10px;
  }
  .operate{
    
    padding:30px 35px;
    ;
    text-align: center;
  }
  .op{
    font-size: 13px;
    margin:10px 0;
    cursor:pointer;
  }
  </style>
  