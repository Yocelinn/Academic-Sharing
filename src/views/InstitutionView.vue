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
      institutions: [
      ],
      authors: [
      ],
      papers: [
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

<style scoped>
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