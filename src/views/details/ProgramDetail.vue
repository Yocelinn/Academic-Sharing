<template>
    <div class="page-container">
      <div class="nav-container">
        <nav class="vertical-nav">
            <ul><div class="nav-label"><el-icon><Position /></el-icon>导航信息</div>
            <li><div class="section-text" :class="{ 'active': selectedSection === 'section1' }" @click="scrollToSection('#section1')">基金信息</div></li>
            <li><div class="section-text" :class="{ 'active': selectedSection === 'section2' }" @click="scrollToSection('#section2')">基金文献推荐</div></li>
            
            </ul>
        </nav>
      </div>
        <div class="main-content">
            <section id="section1">
                <el-card shadow="never" class="detail-card">
                    <div class="title">
                        <h1 class="paper-title" v-html="detailInfo.name"></h1>

                    </div>
                    
                    <div class="detail">
                        <!-- <div class="content-container">
                            <div class="little-title">译名：</div>
                            <div class="content">{{ detailInfo.translatedName }}</div>
                        </div> -->
                        
                        <div class="content-container" v-if="detailInfo.country != ''">
                            <div class="little-title">国别：</div>
                            <div class="content">{{ detailInfo.country }}</div>
                        </div>

                        <div class="content-container" v-if="detailInfo.description != ''">
                            <div class="little-title">简介：</div>
                            <div class="content">{{ detailInfo.description }}</div>
                        </div>
                    
                        <div class="content-container" v-if="detailInfo.homepage != ''">
                            <div class="little-title">官方网站：</div>
                            <div class="content">{{ detailInfo.homepage }}</div>
                        </div>
                    </div>
                </el-card>
            </section>
            <section id="section2">
            <div class="recommend-card">
                <div>
                    <h2 class="recommend-title" >基金文献</h2> 
                </div>
                <ol class="paper-list">
                <li class="list-item" v-for="(item, index) in detailInfo.relateWorks" :key="index">
                    <div class="recommend-papar-name" @click="gotoPaper(item.workID)" v-html=" item.name "></div>
                    <!--因为v-html，有的文章标题是有格式的
                    <div class="recommend-papar-name" @click="gotoPaper(item.workId)"> {{ item.workName }} </div> -->
                    <!-- <div class="detail-list" >
                    <div class="detail-item" v-for="(person, index) in item.authors" :key="index"> {{ person }}. </div>
                    </div> -->

                    <!-- <div class="detail-list"> {{ item.info }}</div> -->
                    <!-- <div class="detail-list"> {{ item }}</div> -->

                </li>
                </ol>
                <el-divider><el-icon><star-filled /></el-icon></el-divider>
            </div>
            </section>
        </div>
    </div>
</template>

<script>
import { onMounted,ref,watch } from 'vue';
import { useRoute } from 'vue-router';
import * as ProgramApi from '../../api/program';
import moment from 'moment'; 

export default {
    setup() {
        // 通过 useRoute 对象获取路由参数
      var funderId = useRoute().query.funderId;
      const detailInfo = ref({
        name: '',
        funderId: '',
        country: '',
        homepage: '',
        translatedName: '',
        description: '',
        // papers: [''],  //这个是当时用来测试静态样例的
        relateWorks: [{}]
      });
      
      
      onMounted( () => {
        getDetailInfo();
        
      })

      function getDetailInfo() {
        if(funderId == null){
          funderId = 'https://openalex.org/F4320332161';
        }
        ProgramApi.GetFunderByFunderId(funderId)
        .then((response) => {
          // console.log(response)
          if(response.code == 200) {
            detailInfo.value = response.data;
            console.log(detailInfo.value)
          } else {
            console.log(response.code)
          }
        })

      }
    // function getDetailInfo() {
    //     let group = {
    //         title: '国家自然科学基金',
    //         // workId: 'the National Natural Science Foundation of China',
    //         official: 'http://www.nsfc.gov.cn/',
    //         translatedName: 'the National Natural Science Foundation of China',
    //         introduct: '	国家自然科学基金面向全国，是国家创新体系的重要组成部分，主要资助自然科学基础研究和部分应用研究，重点支持具有良好研究条件、研究实力的高等院校中和科研机构中的研究人员，由国家自然科学基金委员会负责实施与管理。 自然科学基金经费主要来源于中央财政科学事业费预算拨款，同时依法接受国内外社会团体、机构和个人的捐赠。 目前自然科学基金的资助结构大体上可以分为"研究项目"和"人才培养体系"两大资助板块（简称"项目板块"和"人才板块"）。 "项目板块" 主要包括：面上项目、重点项目、重大项目、重大研究计划、专项基金项目和国际合作与交流项目等。"人才板块"主要包括：国家杰出青年科学基金、海外青年学者合作研究基金、香港澳门青年学者合作研究基金、创新研究群体科学基金、基础科学人才培养基金、国际合作的两个基地等。自然科学基金会根据需要可以对项目类型进行调整\n \
    //         国家自然科学基金面向全国，是国家创新体系的重要组成部分，主要资助自然科学基础研究和部分应用研究，重点支持具有良好研究条件、研究实力的高等院校中和科研机构中的研究人员，由国家自然科学基金委员会负责实施与管理。 自然科学基金经费主要来源于中央财政科学事业费预算拨款，同时依法接受国内外社会团体、机构和个人的捐赠。 目前自然科学基金的资助结构大体上可以分为"研究项目"和"人才培养体系"两大资助板块（简称"项目板块"和"人才板块"）。 "项目板块" 主要包括：面上项目、重点项目、重大项目、重大研究计划、专项基金项目和国际合作与交流项目等。"人才板块"主要包括：国家杰出青年科学基金、海外青年学者合作研究基金、香港澳门青年学者合作研究基金、创新研究群体科学基金、基础科学人才培养基金、国际合作的两个基地等。自然科学基金会根据需要可以对项目类型进行调整',
    //         papers: ['[1] 中介效应分析:方法和模型发展. 温忠麟;叶宝娟.心理科学进展,2014(05)', '[2] 中国地方官员的晋升锦标赛模式研究. 周黎安.经济研究,2007(07)', '[3] 共同方法偏差的统计检验与控制方法. 周浩,龙立荣.心理科学进展,2004(06)',
    //                 '[4] 无线传感器网络. 任丰原,黄海宁,林闯.软件学报,2003(07)', '[5] 区块链技术发展现状与展望. 袁勇;王飞跃.自动化学报,2016(04)', '[6] 大数据管理:概念、技术与挑战. 孟小峰;慈祥.计算机研究与发展,2013(01)','[7] 我国上市公司财务困境的预测模型研究. 吴世农,卢贤义.经济研究,2001(06)',
    //                 '[8] 地理探测器:原理与展望. 王劲峰;徐成东.地理学报,2017(01)','[9] 深部开采岩体力学研究. 何满潮,谢和平,彭苏萍,姜耀东.岩石力学与工程学报,2005(16)'],
    //     }
    //     detailInfo.value = group
    // }

      return {
        detailInfo,
      }
    },
    data() {
      return {
        selectedSection: 'section1',
        
      };
    },
    mounted() {
        // 添加 Intersection Observer
        const observer = new IntersectionObserver(this.handleIntersection, {
          rootMargin: '-50% 0px -50% 0px', // 根据需要调整
        });

        // 监听每个 section 元素
        document.querySelectorAll('section').forEach((section) => {
          observer.observe(section);
        });
    },
    watch: { // 监听，当路由发生变化的时候执行，这个从paper copy来的，不用就算了
        $route(to, from){
            // console.log(from.path); // 从哪来
            // console.log(to.path); // 到哪去
            // location.reload()
        },
    },
    methods: {
      scrollToSection(selector) {
        const targetElement = document.querySelector(selector);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
          this.selectedSection = selector.slice(1); // 更新选中项
        }
      },
      handleIntersection(entries) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // entry.target 是当前进入视口的元素
            this.selectedSection = entry.target.id;
          }
        });
      },
      gotoPaper(paperId) {
        var workId = String(paperId)
        this.$router.push({name:'PaperDetail', query:{workId} });
        console.log(paperId)
      }
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
    background-color: #effcf2;

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
    /* background-color: rgba(56, 168, 64, 0.7); */
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
  .author-list {
    flex: 1;
    line-height: 18px;
    display: flex;
    flex-wrap: wrap;
  }
  .author-item {
    margin-right: 10px;
    /* word-break: break-all; */
    cursor: pointer;
    border-bottom: white 1px solid;
    display: flex;
  }
  .author-item:hover {
    border-bottom: #45bc82 1px dotted;
  }
  .institution {
    color:#989d9a;
    font-size: 16px;
    border-left: 5px #bec1bf solid;
    padding-left: 10px;
    /* border-radius: 5px; */
    text-align: left;
    margin: 10px ;
    cursor: pointer;
  }
  .little-title {
    /*font-size: larger;
    font-weight: 500;
    
    font-family: "黑体", sans-serif;*/
    font-weight: 600;
    margin-right: 6px;
    font-size: 15px;
    width: 80px;
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
    flex-wrap: wrap;
  }
  .keyword-item {
    border: #45bc82 1px solid;
    border-radius: 15px;
    margin-right: 5px;
    padding: 3px 5px;
    margin-bottom: 5px;
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
    /* background-color: #5dd39a; */
    background-color: #54ac69;
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
  
  </style>
  
