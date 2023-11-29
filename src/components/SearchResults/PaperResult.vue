<template>
    <div >
        <el-card type="primary" class="card" shadow="hover"> 
            <div class="result">
                <div class="info">
                <div class="title">{{ paper.title }}</div>
                <div class="authors">
                  <el-icon color=var(--primary-color) class="author-icon"><UserFilled /></el-icon>
                  {{ paper.author.join(', ') }}</div>
                <div class="date">{{ paper.date }}</div>
               
                <div class="abstract-container" :id="`abstract-container_${paper.id}`">
                   <div class="abstract">
                    摘要:{{  paper.abstracts}} 
                    </div>
                   
                </div>
                <div class="button-block">
                  <button class="expand-button" @click="toggleText(paper.id)">
                      <el-icon v-if="displayAll"><ArrowDown /></el-icon>
                      <el-icon v-else><ArrowUp /></el-icon>{{displayAll?'显示全部':'收起'}}
                    </button>
                </div>
                
                <div class="keywords">
                  <p>关键词：{{ paper.keywords.join('  ') }}</p>
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
import { defineComponent,ref } from "vue"

  export default defineComponent({
    props: {
      paper: Object,
    },
    setup(){
      var displayAll=ref(true)

      function toggleText(id) {
        displayAll.value=!displayAll.value;
        const cid='abstract-container_'+id;
        console.log(cid)
        // var textContainer = document.querySelector('.abstract-container');
        var textContainer=document.getElementById(cid);
        // var paragraphText = textContainer.querySelector('.abstract');
    
        
        console.log(textContainer)
        if (textContainer.style.maxHeight) {
            textContainer.style.maxHeight = null;
        } else {
            textContainer.style.maxHeight = textContainer.scrollHeight + 'px';
            console.log(textContainer.scrollHeight)
        }
       
        console.log(displayAll.value)

    }
    return {toggleText,displayAll}
    }
  })
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
    font-size: 20px;
    font-weight: bolder;
    color:var(--green-dark)
  }
  
  .authors {
    font-size:16px;
    font-weight:900;
    margin: 20px 0;
  }
  .author-icon{
    margin-right:5px;
    inline-size: none;
  }
  .date{
    font-size:15px;
    color:gray
  }
  .abstract-container{
    overflow: hidden;
    max-height: 110px; /* 设置初始最大高度，显示三行文本 */
    position: relative;
    transition: max-height 0.5s ease; /* 添加渐变效果 */
  }
  
  .abstract {
    /* margin-top: 6px;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical; */
    margin-bottom: 10px; /* 确保按钮不会与文本重叠 */

  }
  .button-block{
    display: flex;
    justify-content: space-between;
  }
  .expand-button{
    /* position: absolute; */
    bottom: 0;
    right: 0;
    /* margin-top:10px; */

    flex:1;
    align-self:flex-end;
    text-align: end;
    background-color:transparent;
    /* border: 1px solid #ccc; */
    border:none;
    padding: 5px 10px;
    cursor: pointer;
    color:var(--green-dark);
    font-size:13px;
    font-weight:700;
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
  