<template>
    <div>
        <div class="sr-body">
            <!-- 检索结果页面主体 -->
            <div class="sr-left-aside" >
              <div class="sr-left-contain">
                <div class="sr-left-contain-header">
                  <el-icon><Filter /></el-icon>
                  分类浏览
                </div>
                <!-- 左侧分类筛选 -->
               
                <el-collapse class="sr-left-classfier" v-model="activeNames" >
                  <el-skeleton :loading="sr_loading" animated style="text-align: start;">
                    <el-collapse-item v-for="thing in grouptype" :key="thing.tag" 
                    :title="thing.content.alias" :name="thing.tag" class="sr-collapse-item">
                   
                        <el-checkbox-group v-model="aggregations[thing.tag]" class="sr-check-group" @change="handleClassfierChange" >
                            <el-checkbox class="sr-check-item" v-for="option in thing.content.aggregations" :key="option.value" :label="option.origin_key">
                            </el-checkbox>
                        </el-checkbox-group>    
                    </el-collapse-item>
                  </el-skeleton>
                </el-collapse>
                
              </div>
            </div>
            <div class="sr-main">
                <div class="sr-classifier">
                  <el-tabs
                    v-model="curAcademyType"
                    type="card"
                    class="demo-tabs"
                    @tab-change="changeCurAcademyType()"
                    stretch="true"
                  >
                    <div v-for="item in academyTypes" :key="item.id">
                      <el-tab-pane :label=item.type :name="item.key">
                        <div class="sr-toolbar">
                          <!-- 统计数、排序等结果展示处理工具 -->
                          <el-skeleton :loading="loading" animated style="text-align: start;">
                          <div class="sr-statistic">
                              共<span class="sr-num">&ensp;{{ papers_total }}&ensp;</span>条结果
                          </div>
                        </el-skeleton>
                          <el-select v-model="timeRange" placeholder="时间范围" @change="handleTimeRangeChange">
                            <el-option
                              v-for="item in TimeRangeOptions"
                              :key="item.value"
                              :label="item.label"
                              :value="item"
                            />
                          </el-select>
                          <el-select v-model="RankingMethod" placeholder="综合排序" @change="handleRankingChange">
                            <el-option
                              v-for="item in RankingOptions"
                              :key="item.value"
                              :label="item.label"
                              :value="item"
                            />
                          </el-select>
                      </div>
                    </el-tab-pane>
                    </div>
                </el-tabs>
              </div>
              <!-- <el-skeleton :rows="5" :loading="loading" animated style="text-align: start;"> -->
                <div class="sr-paper-results"  ref="srPaperResultsRef">
                    <!-- 学术成果列表项 -->
                    <div class="sr-form-item" >
                      <div v-if="curAcademyType==='articles'" >
                        <div v-for="paper in articles.content" :key="paper.id">
                            <!-- <article-result :paper="paper" /> -->
                            <article-result :paper="paper" />
                            <el-skeleton  :rows="5" :loading="loading" animated style="text-align: start;">
                                <!-- 骨架屏内容 -->
                            </el-skeleton>
                        </div>
                      </div>
                      <div v-else-if="curAcademyType==='patents'">
                        <div v-for="paper in patents.content" :key="paper.id">
                            <patent-result :paper="paper" />
                        </div>
                      </div>
                      <div v-else-if="curAcademyType==='bulletins'">
                        <div v-for="paper in bulletins.content" :key="paper.id">
                            <bulletin-result :paper="paper" />
                        </div>
                      </div>
                      <div v-else-if="curAcademyType==='reports'">
                        <div v-for="paper in reports.content" :key="paper.id">
                            <report-result :paper="paper" />
                        </div>
                      </div>
                      <div v-else-if="curAcademyType==='sciencedata'">
                        <div v-for="paper in sciencedata.content" :key="paper.id">
                            <sciencedata-result :paper="paper" />
                        </div>
                      </div>
                      <div v-else-if="curAcademyType==='books'">
                        <div v-for="paper in books.content" :key="paper.id">
                            <book-result :paper="paper" />
                        </div>
                      </div>
                      
                    </div>
                    <el-divider v-if="isLastPage===true">
                        <el-icon><star-filled /></el-icon>
                      </el-divider>
                </div>
                <!-- </el-skeleton> -->
            </div>
        </div>
    </div>
  </template>
  
  <script>
  import ArticleResult from "@/components/SearchResults/ArticleResult.vue";
  import PatentResult from "@/components/SearchResults/PatentResult.vue";
  import BulletinResult from "@/components/SearchResults/BulletinResult.vue";
  import ReportResult from "@/components/SearchResults/ReportResult.vue";
  import SciencedataResult from "@/components/SearchResults/ScienceResult.vue";
  import BookResult from "@/components/SearchResults/BookResult.vue"
  import { defineComponent,ref,h, onMounted,onUnmounted,computed } from "vue";
  import {post,get} from "../api/api.js"
  export default defineComponent ({
    components: {
      ArticleResult,PatentResult,BulletinResult,ReportResult,SciencedataResult,BookResult
    },
    // props:{
    //   type,//学术成果类型
    //   strategy,//搜索框标签
    //   query,//搜索框内容
    //   page,//第几页
    //   aggregation//分类选择条件
    // },
    setup(){
      onMounted(async ()=>{
      try{
          loading.value=true;
          sr_loading.value=true;
          await getResults();
          await getGroupClassifier();
          await new Promise(resolve => setTimeout(resolve, 2000));
          const srPaperResultsElement = srPaperResultsRef.value;
          // console.log("addScrollListener")
          // console.log(srPaperResultsElement)
          if (srPaperResultsElement) {
            srPaperResultsElement.addEventListener('scroll', handleScroll);
            // console.log("addScrollListener")
          }
          // await new Promise(resolve => setTimeout(resolve, 100));
          // loading.value=false;
        }
        catch(error){
          console.log("ERROR:onMOUNTED INIT pagedata")
        }
      });
      onUnmounted(() => {
        const srPaperResultsElement = srPaperResultsRef.value;
        console.log("removeScrollListener")
        if (srPaperResultsElement) {
          srPaperResultsElement.removeEventListener('scroll', handleScroll);
        }
      });
      
      //————————————————————————————————一些调用接口用的全局变量————————————————————————————
        var aggregations=ref({});//当前类别下选中的过滤关键词，每次改变curAcademyType时会被清空
        var curAcademyType=ref("articles") //当前选中的成果类别，保存的是academyTypes的key
        const sizePerPage=ref(6);
        var curPage=ref(1);
        var loading=ref(false);
        var sr_loading=ref(false);
      //——————————————————————————————————————...——————————————————————————————————————  
      var isLastPage=ref(false)
      const articlesWithSkeleton = computed(() => {
            const loadedContent = articles.value.content || [];
            const skeletonCount = loading.value ? sizePerPage.value : 0;
            const skeletonArray = new Array(skeletonCount).fill({ isContent: false });
            // 将已加载的内容与骨架屏合并，并添加 isContent 属性标记
            return loadedContent.map(content => ({ ...content, isContent: true })).concat(skeletonArray);
        });

 
      const srPaperResultsRef = ref(null);  
       const handleScroll = () => {
          const element = srPaperResultsRef.value;
          // console.log(element)
          if (element) {
            const scrollTop = element.scrollTop;
            const scrollHeight = element.scrollHeight;
            const clientHeight = element.clientHeight;
            if(isLastPage.value===true){
              console.log("It's lastPage")
            }
            else if ((scrollTop + clientHeight >= scrollHeight - 100)) {
              // You can adjust the threshold (100 in this example) based on your preference
              papersLoad();
            }
          }
        };
        async function papersLoad(){
          curPage.value++;
          loading.value=true;
          await getResults();
          await getGroupClassifier();
          // console.log("page:"+curPage.value)
          loading.value=false;
        }
       const timeRange=ref("时间范围");
        const TimeRangeOptions=[{value:'current',label:'今年'},{value:'3years',label:'近三年'},{value:'5years',label:'近五年'},{value:'10years',label:"近十年"}]
        const RankingMethod=ref("综合排序");
        const RankingOptions=[{value:'comprehensive',label:"综合排序"},{value:'reletive',label:"相关排序"},{value:'time',label:"时间排序"}]
        var count=ref(0);
        var articles=ref({}),patents=ref({}),bulletins=ref({}),reports=ref({}),sciencedata=ref({}),books=ref({})
        var papers_total=ref()
        async function init(){
          // aggregations.value={};
          curPage.value=1;
          articles.value={};
          patents.value={};
          bulletins.value={};
          reports.value={};
          sciencedata.value={};
          books.value={};
          // console.log("init "+curPage.value)

        }
        //默认六种学术成果类型
        const academyTypes=ref([{id:1,type:"论文",key:"articles"},
                            {id:2,type:"专利",key:"patents"},
                            {id:4,type:"快报",key:"bulletins"},
                            {id:5,type:"动态快讯",key:"reports"},
                            {id:6,type:"科学数据",key:"sciencedata"},
                            {id:7,type:"图书",key:"books"}
                        ])  
        
        var grouptype=ref({})
        // var groupClassifier=ref([{id:1,"type": {}},
        //                           {id:2,"subject":{}},
        //                           {id:3,"year": {}},
        //                           {id:4,"source": {}},
        //                           {id:5,"collection": {}},
        //                           {id:6,"lang": {}},
        //                           {id:7,"funding": {}},
        //                           {id:8,"institution": {}},
        //                           {id:9,"license": {}}
        //                         ]
        //                        )
        const activeNames = ref(['1'])
        const checkList=ref({})
        
        function handleTimeRangeChange(){
          console.log(timeRange)
        }
        function handleRankingChange(){
          console.log(RankingMethod)
        }
       async function handleClassfierChange(){
        console.log("ClassiferChanged")
          console.log(aggregations.value);
          // curPage.value=1;
          await init();
          // console.log(curPage.value)
          loading.value=true;
          sr_loading.value=true;
          await getResults();
          await getGroupClassifier();
          await new Promise(resolve => setTimeout(resolve, 300));
          // loading.value=false;
        }
        async function changeCurAcademyType(){
          // console.log("Type Changed")
          // curAcademyType=active_sr_classifier
          // console.log(curAcademyType.value)
          aggregations.value={};
          await init();
          loading.value=true;
          sr_loading.value=true;
          await getResults();
          await getGroupClassifier();
          // await new Promise(resolve => setTimeout(resolve, 300));
          
        }
        async function getResults(){
          const aObject = JSON.parse(JSON.stringify(aggregations.value))
          const jsonString={};
          for (const key in aObject) {
            if (aObject.hasOwnProperty(key)) {
              jsonString[key] = aObject[key].join(', ');
            }
          }
          // console.log("searchPage"+curPage.value)
          post(`/search/${curAcademyType.value}`,{"page":curPage,"size":sizePerPage,"order_field":"date","aggregations":jsonString})
          .then(response=>{
            // console.log(response)
            papers_total.value=response.total
            isLastPage.value=response.is_last;
            // if(curPage.value===1 ||JSON.stringify(articles.value)=="{}"||JSON.stringify(patents.value)=="{}"||JSON.stringify(bulletins.value)=="{}"||JSON.stringify(reports.value)=="{}"||JSON.stringify(sciencedata.value)=="{}"||JSON.stringify(books.value)=="{}"){
              if(curAcademyType.value==="articles"){  JSON.stringify(articles.value)=="{}"?articles.value=response:articles.value.content.push(...response.content);}
              else if(curAcademyType.value==="patents"){ JSON.stringify(patents.value)=="{}"?patents.value=response:patents.value.content.push(...response.content);}
              else if(curAcademyType.value==="bulletins"){  JSON.stringify(bulletins.value)=="{}"?bulletins.value=response:bulletins.value.content.push(...response.content); }
              else if(curAcademyType.value==="reports"){  JSON.stringify(reports.value)=="{}"?reports.value=response:reports.value.content.push(...response.content); }
              else if(curAcademyType.value==="sciencedata"){  JSON.stringify(sciencedata.value)=="{}"?sciencedata.value=response:sciencedata.value.content.push(...response.content);}
              else if(curAcademyType.value==="books"){  JSON.stringify(books.value)=="{}"?books.value=response:books.value.content.push(...response.content);  }
            // }
            // else{
            //   if(curAcademyType.value==="articles"){  articles.value.content.push(...response.content);}
            //   else if(curAcademyType.value==="patents"){ patents.value.content.push(...response.content);}
            //   else if(curAcademyType.value==="bulletins"){ bulletins.value.content.push(...response.content); }
            //   else if(curAcademyType.value==="reports"){  reports.value.content.push(...response.content); }
            //   else if(curAcademyType.value==="sciencedata"){  sciencedata.value.content.push(...response.content);}
            //   else if(curAcademyType.value==="books"){  books.value.content.push(...response.content);  }
            // }
            loading.value=false;
            
          })
        }
        async function getGroupClassifier(){
          const aObject = JSON.parse(JSON.stringify(aggregations.value))
          const jsonString={};
          // console.log(aggregations.value)
          for (const key in aObject) {
            if (aObject.hasOwnProperty(key)) {
              jsonString[key] = aObject[key].join(', ');
            }
          }
          // console.log(jsonString)
          post(`/search/${curAcademyType.value}/aggregations`,{"page":curPage,"size":sizePerPage,"order_field":"date","aggregations":jsonString})
          .then(response=>{
            console.log("getClassifier")
              grouptype.value=response;
              // aggregations.value.push()
              console.log(grouptype.value)
              sr_loading.value=false;
          })
          .catch(error => {
            console.error("Error fetching data:", error);
          });
        }
        return {
            articles,patents,bulletins,reports,sciencedata,books,papers_total,
            academyTypes,grouptype,activeNames,checkList,timeRange,RankingMethod,
            TimeRangeOptions,RankingOptions,handleTimeRangeChange,handleRankingChange,getResults,handleClassfierChange,
            count,getGroupClassifier,curAcademyType,changeCurAcademyType,aggregations,sizePerPage,curPage,loading,sr_loading,
            init,papersLoad,srPaperResultsRef ,handleScroll,articlesWithSkeleton,isLastPage
          }
    },
   
  })
  </script>
  
  <style scoped>
.sr-body{
    display:flex;
    justify-content: space-between;
    padding:10px 100px;
}
.sr-left-aside{
    width:20%;
    text-align: center;
}
.sr-left-contain{
  background-color: var(--green-light);
  border-radius: 5px;;

}
.sr-left-contain-header{
  padding-top:10px;
  color:var(--green-dark);
  font-size: large;
  font-weight:900;
  letter-spacing: 6px;;
}
.sr-left-classfier{
  padding:10px;
  max-height: 100vh; 
  overflow-y: auto;

}
.sr-left-classfier::-webkit-scrollbar {
  display: none;
}
/* :deep(.el-collapse-item__header) {
    background-color:var(--light-green);
    border-radius: 1px;
    padding:0 10px;
} */

.sr-collapse-item{

  color: #fff; /* 设置文本颜色为白色 */

  border-radius: 5px; /* 设置边框圆角 */
  


}
/* .sr-collapse-item.title{
  position: sticky;
} */

.sr-check-group{
    display: flex;
    flex-direction: column;
    max-height:300px; 
    overflow-y: auto;
    
}
.sr-check-group::-webkit-scrollbar {
  display: none;
}
.sr-check-item{
  margin:10px;

}
.sr-main{
    width:80%;
    padding:0 20px;
   
}

.sr-paper-results{

 max-height: 100vh; 
  overflow-y: auto;
}
.sr-statistic{
  flex:1;
  
     /* height: 34px;
padding: 2px 20px;
line-height: 34px; */

color: #000;
/* clear: both;
border: 1px solid #eee;
border-bottom-color: #d9e0e9;
    text-align: center;; */
    text-align: start;
}
.sr-num{
  font-weight:700;

}
.sr-toolbar{
  display:flex;
  justify-content: flex-end;
    height: 34px;
padding: 2px 20px;
line-height: 34px;
font-size: 12px;
color: #000;
clear: both;
border: 1px solid #eee;
border-bottom-color: #d9e0e9;
text-align: end;
font-size:15px;

}
:deep(.el-collapse-item__content ){
    padding-bottom:0;
}
:deep(.el-collapse-item__header){
  border-left:20px;
}
:deep(.el-collapse) {
--el-collapse-border-color: var(--el-border-color-lighter);
--el-collapse-header-height: 48px;
--el-collapse-header-bg-color: var(--el-fill-color-blank);
--el-collapse-header-text-color: var(--el-text-color-primary);
--el-collapse-header-font-size: 13px;
--el-collapse-content-bg-color: var(--el-fill-color-blank);
--el-collapse-content-font-size: 13px;
--el-collapse-content-text-color: var(--el-text-color-primary);
/* border-top: 1px solid var(--el-collapse-border-color); */
border:none;
/* border-bottom: 1px solid var(--el-collapse-border-color); */
}
:deep(.el-checkbox){
  margin-right:30px;
  margin-left:30px;
}
:deep(.el-collapse-item__header) {
  width: 100%;
  padding: 20px;
  border: none;
  display: flex;
  align-items: center;
  height: 30px;
  line-height: var(--el-collapse-header-height);
  background-color: var(--el-collapse-header-bg-color);
  color: var(--el-collapse-header-text-color);
  cursor: pointer;
  border-bottom: 1px solid var(--el-collapse-border-color);
  font-size: 15px;
  font-weight: 500;
  transition: border-bottom-color var(--el-transition-duration);
  outline: none;
}
:deep(.el-tabs__item.is-active){
  background-color: var(--green-dark);
  color:white;
}
:deep(.el-tabs__header ){
  margin:0;
}
:deep(.el-input__wrapper){
  background-color:var(--primary-color);
  width:80px;
  margin-left:20px;

}
:deep(.el-input__inner){
  color:white;
  font-weight:900;
}
  </style>
  