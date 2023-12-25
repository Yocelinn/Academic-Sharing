<template>
  <div class="outer" v-loading="loading">
    <el-container>
      <el-aside>
        <el-affix :offset="100">
          <el-card class="box-card">
            <img :src="img_src"
            class="img">
            <el-divider />
            <el-link href="#author">机构主要作者</el-link>
            <el-divider />
            <el-link href="#journal">主办刊物</el-link>
            <el-divider />
            <el-link href="#project">重点学科</el-link>
            <el-divider />
            <el-link href="#article">机构文献</el-link>
            <el-divider />
            <el-link href="#inst">下属及相关机构</el-link>
            <el-divider />
          </el-card>
        </el-affix>
      </el-aside>
      <el-main>
        <div class="top-margin"></div>
        <h1>{{instName}}</h1>
        <el-divider />

        <div id="author">
          <h2>机构主要作者</h2>
          <el-divider />
          <div class="authorList">
            <!-- <ul>
              <li v-for="item in mainAuthor" :key="item" style="text-align: left;">
                <a href="/">{{item.name}}</a>
                <b>{{`(${item.num})`}}</b>
                <span class="affi">{{`${item.title};`}}</span>
                <span class="orgn">{{item.fileds.join(';')+";"}}</span>
              </li>
            </ul>
            <ul class="other"  style="text-align: left;">
              <li v-for="item in otherAuthor" :key="item">
                <a href="/">{{item.name}}</a>
                <b>{{`(${item.num})`}}</b>
              </li>
            </ul> -->
            <ul>
              <li v-for="item in authors" :key="item" style="text-align: left;">
                <el-link :href="item.id" style="font-weight: bold;" target="_blank">{{item.display_name}}</el-link>
                <span class="affi">{{`发表了${item.works_count}篇学术成果;`}}</span>
                <span class="orgn">{{`共被引用${item.cited_by_count}次;`}}</span>
              </li>
            </ul>
          </div>
        </div>

        <div id="journal">
          <h2>主办刊物</h2>
          <el-divider />
          <p>未找到相关结果</p>
        </div>
        

        <div id="project">
          <h2>重点学科</h2>
          <el-divider />
          <net :wordData="projects" v-if="!loading"></net>
        </div>

        <div id="article">
          <h2>机构文献</h2>
          <el-divider />
          <h5>最高被引</h5>
          <el-table :data="papers" style="width: 100%; margin-bottom: 20px" :show-header="false" v-loading="paper_loading">
            <el-table-column type="index" width="50" />
            <el-table-column prop="title" width="400" />
            <el-table-column prop="authors" width="300" />
            <el-table-column prop="field"/>
            <el-table-column prop="date" />
            <el-table-column prop="cited_by_count" />
          </el-table>
        </div>

        <div id="inst">
          <h2>下属及相关机构</h2>
          <el-divider />

          <p v-if="nodes.length==0">未找到相关结果</p>
          <relation-net v-if="nodes.length!=0" :nodes="nodes" :edges="edges"></relation-net>
        </div>

        <div class="bottom-margin"></div>
        <el-backtop :right="100" :bottom="100" />
      </el-main>
    </el-container>
    <el-footer></el-footer>
  </div>
</template>

<script>
import {GetInstitutionInfo, GetInstitustionWorks} from '../api/institution.js'
import Net from '../components/Net.vue';
import RelationNet from '../components/RelationNet.vue';
export default {
  components: { Net , RelationNet},
  data() {
    return{
      instName: "",
      mainAuthor:[
        {
          name: "张怀武",
          num: 777,
          title: "教授",
          fileds: ["电力工业", "无线电电子学", "电信技术"]
        },
        {
          name: "向勇",
          num: 709,
          title: "教授",
          fileds: ["电力工业","金属学及金属工艺","无线电电子学"]
        },
        {
          name: "刘永",
          num: 645,
          title: "教授",
          fileds: ["仪器仪表工业","无线电电子学","计算机软件及计算机应用"]
        },
        {
          name: "王华",
          num: 604,
          title: "教授",
          fileds: ["地质学","石油天然气工业","无线电电子学"]
        }
      ],
      otherAuthor:[
        {
          name:"唐小我",
          num: 596
        },
        {
          name:"许文波",
          num: 579
        },
        {
          name:"张勇",
          num: 569
        },
        {
          name:"于军胜",
          num: 541
        },
        {
          name:"孔令讲",
          num: 527
        },
        {
          name:"邱昆",
          num: 524
        },
      ],
      project:[
        {name:"电信技术",num:39359},{name:"电信技术",num:39359},{name:"无线电",num:27025},{name:"电力工业",num:15203},
        {name:"自动化技术",num:12999},{name:"企业经济",num:7170},{name:"电子学物理学",num:5882},{name:"互联网技术",num:5116}
      ],
      popularPaper: [
        {
          title:"卷积神经网络研究综述",
          authors:["李彦冬", "郝宗波", "雷航"],
          journal: "计算机应用",
          time:"2016(09)",
          num: 2195,
        },
        {
          title:"知识图谱构建技术综述,",
          authors:["刘峤", "李杨", "段宏", "刘瑶", "秦志光"],
          journal: "计算机研究与发展",
          time:"2016(03)",
          num: 2029,
        },
        {
          title:"有限元网格划分的基本原则",
          authors:["杜平安"],
          journal: "机械设计与制造",
          time:"2000(01)",
          num: 1623,
        },
        {
          title:"知识图谱技术综述",
          authors:["徐增林","盛泳潘","贺丽荣","王雅芳"],
          journal: "电子科技大学学报",
          time:"2016(04)",
          num: 1234,
        },
        {
          title:"政治关联能改善民营企业的经营绩效吗",
          authors:["邓建平", "曾勇"],
          journal: "中国工业经济",
          time:"2009(02)",
          num: 1072,
        }
      ],
      downloadPaper: [

      ],
      institutions: [

      ],
      authors: [
        {
          display_name: "Yufeng",
          works_count: 1868,
          cited_by_count: 36489,
        },
        {
          display_name: "Guodong",
          works_count: 1868,
          cited_by_count: 36489,
        },
        {
          display_name: "Wenbin",
          works_count: 1868,
          cited_by_count: 36489,
        },
      ],
      papers: [
      {
            "id": "https://openalex.org/W1993378267",
            "title": "Piezoelectric Nanogenerators Based on Zinc Oxide Nanowire Arrays",
            "date": "2006(04)",
            "authors": "[Zhong Lin Wang, Jinhui Song]",
            "field": "Piezoelectricity",
            "cited_by_count": 6603
        },
        {
            "id": "https://openalex.org/W2607129810",
            "title": "GEPIA: a web server for cancer and normal gene expression profiling and interactive analyses",
            "date": "2017(04)",
            "authors": "[Zefang Tang, Chenwei Li, Boxi Kang, Ge Gao, Cheng Li]",
            "field": "Profiling (computer programming)",
            "cited_by_count": 6342
        },
        {
            "id": "https://openalex.org/W2100439220",
            "title": "Trastuzumab in combination with chemotherapy versus chemotherapy alone for treatment of HER2-positive advanced gastric or gastro-oesophageal junction cancer (ToGA): a phase 3, open-label, randomised controlled trial",
            "date": "2010(08)",
            "authors": "[Yung Jue Bang, Éric Van Cutsem, A. Feyereislova, Hyun Cheol Chung, Lin Shen]",
            "field": "Trastuzumab",
            "cited_by_count": 5701
        },
        {
            "id": "https://openalex.org/W2109631166",
            "title": "A Large and Persistent Carbon Sink in the World’s Forests",
            "date": "2011(08)",
            "authors": "[Yude Pan, Richard A. Birdsey, Jingyun Fang, Richard A. Houghton, Pekka E. Kauppi]",
            "field": "Sink (geography)",
            "cited_by_count": 5263
        },
        {
            "id": "https://openalex.org/W2014886338",
            "title": "Global prevalence of dementia: a Delphi consensus study",
            "date": "2005(12)",
            "authors": "[Cleusa P. Ferri, Martin Prince, Carol Brayne, Henry Brodaty, Laura Fratiglioni]",
            "field": "Dementia",
            "cited_by_count": 4632
        }
      ],
      projects: [],
      nodes: [],
      edges: [],
      loading: true,
      paper_loading: true,
      institutionId: "",
      img_src: "",
    }
  },
  created() {
    console.log(this.$route.query.id)
    this.institutionId = this.$route.query.id
    var promise = GetInstitutionInfo(this.institutionId)
    promise.then((result =>{
      this.instName = result.data.display_name
      this.authors = result.data.authors
      for(let item of result.data.x_concepts){
        var p = {
          id : item.wikidata,
          name: item.display_name,
          value: item.score*10
        }
        this.projects.push(p)
      }
      this.img_src = result.data.image_url
      this.nodes.push({
        name: this.instName,
        draggable: true,
        symbolSize: 80,
        itemStyle: {
            color: this.randomColor()
        },
      })
      for(let item of result.data.associated_institutions){
        var n = {
          name: item.display_name,
          draggable: true,
          symbolSize: item.relationship=="child"?50:80,
          node_id: item.id,
          itemStyle: {
              color: this.randomColor()
          },
        }
        var e = {
          target: item.display_name,
          source: this.instName,
        }
        this.nodes.push(n)
        this.edges.push(e)
      }
      this.loading = false
    }))
    var p2 = GetInstitustionWorks(this.institutionId)
    p2.then((result =>{
      this.papers = result.data
      this.paper_loading = false
    }))
  },
  methods: {
    randomColor(){
      var colors = ['#c8d5b9', '#8fc0a9', "#68b0ab", "#4a7c59", "#2B463C"];
      return colors[parseInt(Math.random() * 5)];
    }
  }
}
</script>

<style>
  .outer {
    width: 100%;
    background-image: linear-gradient(to top, #c1dfc4 0%, #deecdd 100%);
  }
  .el-aside{
    width: 25%;
  }
  .el-main{
    width: 60%;
    margin: 25px 50px 20px 0;
    text-align: left;
    padding-left: 20px;
    padding-right: 20px;
    background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
  }
  h1,h2{
    text-align: left;
  }
  h1,h2, h5{
    width: 100%;
    margin: 0 auto;
  }
  p{
    text-align: left
  }
  ul{
    padding-left: 10px;
    list-style: none;
  }
  li{
    line-height: 30px;
  }

  .other li{
    display: inline;
    margin-right: 24px;
  }
  .affi, .orgn{
    margin-left: 14px;
  }
  .project{
    line-height: 30px;
    padding-bottom: 20px;
  }
  .top-margin{
    height: 10px;
  }
  .bottom-margin{
    height: 50px;
  }
  .el-footer{
    background-color: #2b463c;
  }

  .el-table, .el-table__expanded-cell{
    background: transparent;
  }
  
  .el-table th,
  .el-table tr,
  .el-table td {
    background: transparent;
  }

  .box-card{
    height: auto;
    width: 280px;
    margin: 10px 0px 20px 50px;
  }

  .img {
    width: 200px;
    object-fit: cover;
  }


  

</style>