<!-- 动态快讯类型结果展示 -->
<template>
    <div >
        <el-card type="primary" class="card" shadow="hover"> 
            <div class="result">
                <div class="info">
                <div class="title"><span v-html="paper.title"></span></div>
                <div class="authors" v-if="paper.author && paper.author.length!=0">
                  
                  <el-icon color=var(--primary-color) class="author-icon"><UserFilled /></el-icon>
                  <!-- <span class="alias-info">发明人</span> -->
                  <span v-html="paper.author.join(', ')"></span>
                  </div>
                <div class="date">
                  <span class="alias-info" v-if="paper.date">发布时间:</span> <span v-html="paper.date"></span>
                  <span class="alias-info" v-if="paper.serverName"> 所属服务:</span> <span v-html="paper.serverName"></span>
                </div>
               
                <div class="abstract-container" :id="`abstract-container_${paper.id}`">
                   <div class="abstract" v-if="paper.abstracts">
                    <span class="alias-info"> 摘要: </span><span v-html="paper.abstracts"></span>
                    </div>
                   
                </div>
                <div class="button-block" v-if="paper.abstracts">
                  <button class="expand-button" @click="toggleText(paper.id)">
                      <el-icon v-if="displayAll"><ArrowDown /></el-icon>
                      <el-icon v-else><ArrowUp /></el-icon>{{displayAll?'显示全部':'收起'}}
                    </button>
                </div>
                <div class="paper-link" v-if="paper.orignal_url">
                    <!-- <span class="alias-info">原文链接: </span> -->
                    <span class="link-tag" >
                      <a :href="paper.orignal_url" target="_blank" style="text-decoration: none;">
                      <el-button > 原文链接</el-button>
                      &ensp;
                    </a>
                    </span>
                   
                </div>
  
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
  