<!--  论文类型结果展示 -->
<template>
    <div >
        <el-card type="primary" class="card" shadow="hover"> 
            <div class="result">
                <div class="info">
                <div class="title" v-if="paper.title">{{ paper.title }}</div>
                <div class="authors" v-if="paper.author">
                  <el-icon color=var(--primary-color) class="author-icon"><UserFilled /></el-icon>
                  {{ paper.author.join(' ') }} </div>
                <div class="date">
                  <span class="alias-info">日期: </span>
                  {{ paper.date }}
                </div>
                <div class="keywords" v-if="paper.keywords">
                  <span class="alias-info">关键词: </span>
                  <el-tag class="keywords-tag" v-for="key in paper.keywords" :key="key" type="primary">
                    {{ key }}
                    </el-tag>
                     &nbsp;
                </div>
                <div class="abstract-container" :id="`abstract-container_${paper.id}`" >
                   <div class="abstract" :style="{'-webkit-line-clamp': displayAll?'3':'100'}">
                    <span class="alias-info">摘要: </span>{{  paper.abstracts}} 
                    </div>
                   
                </div>
                <div class="button-block">
                  <button class="expand-button" @click="toggleText(paper.id)">
                      <el-icon v-if="displayAll"><ArrowDown /></el-icon>
                      <el-icon v-else><ArrowUp /></el-icon>{{displayAll?'显示全部':'收起'}}
                    </button>
                </div>
                <div class="paper-link" v-if="paper.links">
                    <span class="alias-info">原文链接: </span>
                    <span class="link-tag" v-for="item in paper.links" :key="item">
                      <a :href="item.url" target="_blank" style="text-decoration: none;">
                      <el-button >{{ item.name }}</el-button>
                      &ensp;
                    </a>
                    </span>
                   
                </div>
                
            </div>
            <!-- <div class="operate">
                <div class="op">下载</div>
                <div class="op">HTML阅读</div>
                <div class="op">收藏</div>
                <div class="op">引用</div>
               
            </div> -->
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
          // console.log(cid)
          // var textContainer = document.querySelector('.abstract-container');
          var textContainer=document.getElementById(cid)
          var abstractContainer=textContainer.getElementsByClassName('abstract');
          // console.log(textContainer)
          // console.log(abstractContainer)
          if (textContainer.style.maxHeight) {
              textContainer.style.maxHeight = null;
          } else {
              textContainer.style.maxHeight = textContainer.scrollHeight + 'px';
              // console.log(textContainer.scrollHeight)
          }
          // console.log(displayAll.value)
      }
      return {toggleText,displayAll}
      }
    })
   </script>
    
  
  <style scoped>
  @import "./paperResult.css"
  
  </style>
  