<template>
    <div>
        <!-- <div class="top-doctype">
            检索类型筛选
            <div class="doctype-menu">
                <li v-for="doctype in doctypes" :key="doctype.id" >
                    {{ doctype.type }}
                    <br>
                    {{ doctype.num }}
                </li>     
            </div>
        </div> -->
        <div class="sr-body">
            <!-- 检索结果页面主体 -->
            <div class="sr-left-aside" >
              <div class="sr-left-contain">
                <div class="sr-left-contain-header">
                  <el-icon><Filter /></el-icon>
                  分类浏览
                </div>
                <!-- 左侧分类筛选 -->

                <el-collapse class="sr-left-classfier" v-model="activeNames" @change="handleChange">
                    <el-collapse-item v-for="thing in grouptype" :key="thing.id" 
                    :title="thing.title" :name="thing.id" class="sr-collapse-item">
                        <el-checkbox-group v-model="checkList" class="sr-check-group">
                            <el-checkbox v-for="option in thing.select" :key="option.id" :label="option.value">
                                
                            </el-checkbox>
                        </el-checkbox-group>    
                    </el-collapse-item>
               
                </el-collapse>
              </div>
            </div>
            <div class="sr-main">
                <div class="sr-classifier">
                  <el-tabs
                    v-model="active_sr_classifier"
                    type="card"
                    class="demo-tabs"
                    @tab-click="handleClick"
                    stretch="true"
                  >
                    <div v-for="item in academyTypes" :key="item.id" @click="changeCurAcademyType(item)">
                      <el-tab-pane :label=item.type>
                        <div class="sr-toolbar">
                          <!-- 统计数、排序等结果展示处理工具 -->
                          <div class="sr-statistic">
                              共{{ papers.total }}条结果
                          </div>
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
                <div class="sr-paper-results">
                    <!-- <el-table :data="papers" stripe style="width: 100%"  class="sr-form-header" >
                        <el-table-column prop="title" label="标题" width="350" header-align="center" />
                        <el-table-column prop="authors" label="作者" width="150" align="center"  />
                        <el-table-column prop="source" label="来源" width="150" align="center" />
                        <el-table-column prop="date" label="发表时间" width="150" align="center" />
                        <el-table-column prop="db" label="数据库" align="center" />
                    </el-table> -->
                    <!-- 学术成果列表项 -->
                    <div class="sr-form-item">
                        <div v-for="paper in papers.content" :key="paper.id">
                            <paper-result :paper="paper" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </template>
  
  <script>
  import PaperResult from "@/components/SearchResults/PaperResult.vue";
  import { defineComponent,ref,h, onMounted } from "vue";
  import {post,get} from "../api/api.js"
  export default defineComponent ({
    components: {
      PaperResult,
    },
    props:{
      type,//学术成果类型
      strategy,//搜索框标签
      query,//搜索框内容
      page,//第几页
      aggregation//分类选择条件
    },
    setup(){
      onMounted(()=>{
        getResults();
        // getGroupClassifier();

      })
        var aggregations=ref();//当前类别下选中的过滤关键词，每次改变curAcademyType时会被清空
        const active_sr_classifier=ref();
        const sizePerPage=ref(6);
        const timeRange=ref("时间范围");
        const TimeRangeOptions=[{value:'current',label:'今年'},{value:'3years',label:'近三年'},{value:'5years',label:'近五年'},{value:'10years',label:"近十年"}]
        const RankingMethod=ref("综合排序");
        const RankingOptions=[{value:'comprehensive',label:"综合排序"},{value:'reletive',label:"相关排序"},{value:'time',label:"时间排序"}]
        var count=ref(0);
        var papers=ref({
          // num:10,
          // contents:[{
          //   id: 1,
          //   title: "Joining of SiC ceramics using high-silicon aluminum alloy fillers assisted by laser cladding",
          //   authors: ["作者1", "作者2"],
          //   source: "xxx",
          //   date:"2023-09-01",
          //   db:"xxx",
          //   abstract:"xxxxxxxxxxxxxxxxx"
          // },
          // {
          //   id: 2,
          //   title: "论文标题2",
          //   authors: ["作者3", "作者4"],
          //   source: "xxx",
          //   date:"2023-09-01",
          //   db:"xxx",
          //   abstract:"xxxxxxxxxxxxxxxxx"
          // },
          // {
          //   id: 3,
          //   title: "论文标题2",
          //   authors: ["作者3", "作者4"],
          //   source: "xxx",
          //   date:"2023-09-01",
          //   db:"xxx",
          //   abstract:"xxxxxxxxxxxxxxxxx"
          // },
          // {
          //   id: 2,
          //   title: "论文标题2",
          //   authors: ["作者3", "作者4"],
          //   source: "xxx",
          //   date:"2023-09-01",
          //   db:"xxx",
          //   abstract:"xxxxxxxxxxxxxxxxx"
          // },
          // {
          //   id: 2,
          //   title: "论文标题2",
          //   authors: ["作者3", "作者4"],
          //   source: "xxx",
          //   date:"2023-09-01",
          //   db:"xxx",
          //   abstract:"xxxxxxxxxxxxxxxxx"
          // },],
          // // 可以添加更多虚拟论文数据
        
      })
        const academyTypes=ref([{id:1,type:"论文",key:"articles"},
                            {id:2,type:"专利",key:"patents"},
                            {id:4,type:"快报",key:"bulletins"},
                            {id:5,type:"动态快讯",key:"reports"},
                            {id:6,type:"科学数据",key:"sciencedata"},
                            {id:7,type:"图书",key:"books"},
                        ])  
        var curAcademyType=ref() //当前选中的成果类别，保存的是academyTypes的key
        const grouptype=ref([{id:1,title:"学科",select:[{id:1,value:"生物学"},{id:2,value:"物理学"}]},
                             {id:2,title:"发表年度",select:[{id:1,value:"2023年"},{id:2,value:"2022年"},{id:3,value:"2021年"},{id:2,value:"2020年"}]},
                             {id:3,title:"作者"}])
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
        const checkList=ref([])
        function handleTimeRangeChange(){
          console.log(timeRange)
        }
        function handleRankingChange(){
          console.log(RankingMethod)
        }
        function changeCurAcademyType(item){
          curAcademyType=item.key;
          // getResults();
        }
        function getResults(){
            post(":8089/api/search/`{curAcademyType}`",{"page":1,"size":sizePerPage,"order_field":"date","aggregations":aggregations})
            .then(response=>{
              papers.value.total=response.total;
              papers.value.content=response.content;
              console.log(papers.value)
            })
        }
        function getGroupClassifier(){
          post(":8089/api/search/`{curAcademyType}`/aggregation",{"page":1,"size":sizePerPage,"order_field":"date"})
          .then(response=>{
              
          })
        }


        return {
            papers,academyTypes,grouptype,activeNames,checkList,active_sr_classifier,timeRange,RankingMethod,
            TimeRangeOptions,RankingOptions,handleTimeRangeChange,handleRankingChange,getResults,
            count,getGroupClassifier,curAcademyType,changeCurAcademyType,aggregations,sizePerPage
          }
    },
   
  })
  </script>
  
  <style scoped>
  
  .top-doctype {
    background-color: #047bca;
    display: flex;
    height: 60px;;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    color: #fff;
    padding: 10px;
    text-align: center;
    
  }
  .doctype-menu{
    margin-left: 30px;
    margin-right:30px;
    font-family: "Microsoft yahei";
    white-space: nowrap;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); /* 让每列宽度相等 */
    grid-auto-flow: column;
    grid-gap: 10px; /* 可选的列之间的间距 */
    list-style: none; /* 移除列表默认样式 */
    padding: 0;
    text-align: center;
  }
  .doctype-menu li:first-child{
    font-size:larger;
    font-weight:1000;
    font-family: "Microsoft yahei";
    white-space: nowrap;

  }
  .doctype-menu li {

  display: block;
  color: #fff;
  width: 70px;

  padding: 20px ;
  transition: background-color 0.3s; /* 添加渐变效果 */
}

.doctype-menu li:hover {
  background-color: #fff; /* 鼠标悬停时的背景颜色 */
  color:#047bca;
}

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
.sr-check-group{
    display: flex;
    flex-direction: column;
}

.sr-main{
    width:80%;
    padding:0 20px;
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
font-size:17px;

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
  