<template>
  <main>
    <h1>{{instName}}</h1>
    <el-divider />
    
    <el-row :gutter="24">
      <el-col :span="7"></el-col>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><a href="#author">机构主要作者</a></el-breadcrumb-item>
        <el-breadcrumb-item><a href="#journal">主办刊物</a></el-breadcrumb-item>
        <el-breadcrumb-item><a href="#project">重点学科</a></el-breadcrumb-item>
        <el-breadcrumb-item><a href="#article">机构文献</a></el-breadcrumb-item>
        <el-breadcrumb-item><a href="#inst">下属及相关机构</a></el-breadcrumb-item>
        <el-breadcrumb-item></el-breadcrumb-item>
      </el-breadcrumb>
		</el-row>
    <el-divider />

    <div id="author">
      <h2>机构主要作者</h2>
      <el-divider />
      <div class="authorList">
        <ul>
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
      <el-row class="project">
        <el-col :span="6" v-for="item in project" :key="item">{{`${item.name}(${item.num})`}}</el-col>
      </el-row>
    </div>

    <div id="article">
      <h2>机构文献</h2>
      <el-divider />
      <h5>最高被引</h5>
      <el-table :data="popularPaper" style="width: 100%; margin-bottom: 20px">
        <el-table-column type="index" width="50" />
        <el-table-column prop="title" width="180" />
        <el-table-column prop="authors" width="180" />
        <el-table-column prop="journal"/>
        <el-table-column prop="time" />
        <el-table-column prop="num" />
      </el-table>
      <h5>最高下载</h5>
      <el-table :data="popularPaper" style="width: 100%; margin-bottom: 20px">
        <el-table-column type="index" width="50" />
        <el-table-column prop="title" width="180" />
        <el-table-column prop="authors" width="180" />
        <el-table-column prop="journal"/>
        <el-table-column prop="time" />
        <el-table-column prop="num" />
      </el-table>
    </div>

    <div id="inst">
      <h2>下属及相关机构</h2>
      <el-divider />
      <p>未找到相关结果</p>
    </div>

    <el-backtop :right="100" :bottom="100" />
  </main>
</template>

<script>
export default {
  data() {
    return{
      instName: "电子科技大学信息与软件工程学院",
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

      ]
    }
  },
  created() {
    console.log(this.$route.query.id)
  }
}
</script>

<style>
  main{
    width: 60%;
    margin: 0 auto;
    text-align: left;
  }
  h1,h2{
    text-align: center;
  }
  h1,h2, h5{
    background-color: white;
    width: 100%;
    margin: 0 auto;
  }
  p{
    text-align: left
  }
  ul{
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

</style>