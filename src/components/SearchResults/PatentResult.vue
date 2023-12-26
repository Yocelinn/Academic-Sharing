<!-- 专利类型结果展示 -->
<template>
  <div >
      <el-card type="primary" class="card" shadow="hover"> 
          <div class="result">
              <div class="info">
              <div class="title" @click="jumpToPatent(paper.id)"><div v-html="paper.title"></div></div>
              <div class="authors" v-if="paper.inventors&&paper.inventors.length!=0">
                
                <el-icon color=var(--primary-color) class="author-icon"><UserFilled /></el-icon>
                <!-- <span class="alias-info">发明人</span> -->
                <span v-html="paper.inventors.join(', ')"></span>
                <!-- {{ paper.inventors.join(', ') }} -->
              </div>
              <div class="date">
                <span class="alias-info" v-if="paper.apply_date">申请日:</span> <span v-html="paper.apply_date"> </span>
                <span class="alias-info" v-if="paper.apply_number"> 申请号:</span>  <span v-html="paper.apply_number"> </span>
              </div>
             
              <div class="abstract-container" :id="`abstract-container_${paper.id}`">
                 <div class="abstract" v-if="paper.abstracts">
                  <span class="alias-info">摘要:</span><span v-html="paper.abstracts"></span>
                  </div>
                 
              </div>
              <div class="button-block" v-if="paper.abstracts">
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
    function jumpToPatent(id){

        // this.$router.push(`/paper/detail/${id}`,"_blank");
        // this.$router.push(`/paper/detail/${id}`).then(() => {
      // After the route has been pushed successfully, open a new window or tab
      // window.open(`/paper/detail/${id}`, '_blank');
      // this.$router.push()
      let routerJump = this.$router.resolve({ 
                    path: "/patent/detail/",
                    query: {patentId:id } 
                });
                window.open(routerJump.href, '_blank');
        }
  return {toggleText,displayAll,jumpToPatent}
  }
})
</script>

<style scoped>
@import "./paperResult.css"
</style>
