<!-- 动态快讯类型结果展示 -->
<template>
    <div >
        <el-card type="primary" class="card" shadow="hover"> 
            <div class="result">
                <div class="info">
                <div class="title">{{ paper.title }}</div>
                <div class="authors">
                  
                  <el-icon color=var(--primary-color) class="author-icon"><UserFilled /></el-icon>
                  <!-- <span class="alias-info">发明人</span> -->
                  {{ paper.author.join(', ') }}</div>
                <div class="date">
                  <span class="alias-info">发布时间:</span> {{ paper.date }}
                  <span class="alias-info"> 所属服务:</span> {{ paper.serverName }}
                </div>
               
                <div class="abstract-container" :id="`abstract-container_${paper.id}`">
                   <div class="abstract">
                    <span class="alias-info"> 摘要: </span>{{  paper.abstracts}} 
                    </div>
                   
                </div>
                <div class="button-block">
                  <button class="expand-button" @click="toggleText(paper.id)">
                      <el-icon v-if="displayAll"><ArrowDown /></el-icon>
                      <el-icon v-else><ArrowUp /></el-icon>{{displayAll?'显示全部':'收起'}}
                    </button>
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
        var textContainer=document.getElementById(cid);
        // var paragraphText = textContainer.querySelector('.abstract'); 
        console.log(textContainer)
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
  