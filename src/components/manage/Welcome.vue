<template>
    <h1>Welcome!</h1>
    <h1>处理进度如下：</h1>
    <div id="main" :style="{width: '80%', height: '80%'}" class="chart-container"></div>
    <el-button type="primary" @click="logout">登出</el-button>
</template>
  
<script>
import store from '@/store';
// import AuthorRelationNet from "../AuthorRelationNet.vue"
  import {GetNum} from '../../api/report.js'
  import * as echarts from 'echarts/core';
  import { GaugeChart } from 'echarts/charts';
  import { CanvasRenderer } from 'echarts/renderers';
  export default {
    // components: { AuthorRelationNet },
    data() {
      return {
        scholarAll: 3,
        scholarFinish: 1,
        paperAll: 5,
        paperFinish: 2,
        commmentAll: 4,
        commentFinish: 1,
        // authors: [
        //   {
        //       "name": "Cory Merow"
        //   },
        //   {
        //       "name": "Matthew J. Smith"
        //   },
        //   {
        //       "name": "Thomas C. Edwards"
        //   },
        //   {
        //       "name": "Antoine Guisan"
        //   },
        //   {
        //       "name": "Sean M. McMahon"
        //   },
        //   {
        //       "name": "Signe Normand"
        //   },
        //   {
        //       "name": "Wilfried Thuiller"
        //   },
        //   {
        //       "name": "Rafael O. Wüest"
        //   },
        //   {
        //       "name": "Niklaus E. Zimmermann"
        //   },
        //   {
        //       "name": "Jane Elith"
        //   }
        // ],
        // name: "Cory Merow"
      }
    },
    mounted() {
      document.documentElement.scrollTop = 0;
      var promise = GetNum()
      promise.then((result =>{
        this.scholarAll = result.data.totalRelate
        this.scholarFinish = result.data.sucRelate
        this.paperAll = result.data.totalWorkReport
        this.paperFinish = result.data.sucWorkReport
        this.commmentAll = result.data.totalCommentReport
        this.commentFinish = result.data.sucCommentReport
        this.initChat()
      }))
    },
    methods: {
      logout() {
        store.state.administratorInfo.isLogin = false;
        store.state.administratorInfo.token = "";
        window.sessionStorage.removeItem("saveAdministrator")
        this.$router.push('/')
      },
      initChat(){
        var chartDom = document.getElementById('main');
        var myChart = echarts.init(chartDom);
        var option;
        const gaugeData = [
          {
            value: Math.trunc(100.0 * this.scholarFinish / this.scholarAll),
            name: '待处理门户审核',
            label: 'scholar',
            title: {
              offsetCenter: ['0%', '-30%']
            },
            detail: {
              valueAnimation: true,
              offsetCenter: ['0%', '-20%']
            }
          },
          {
            value: Math.trunc(100.0 * this.paperFinish / this.paperAll),
            name: '待处理学术成果',
            label: 'paper',
            title: {
              offsetCenter: ['0%', '0%']
            },
            detail: {
              valueAnimation: true,
              offsetCenter: ['0%', '10%']
            }
          },
          {
            value: Math.trunc(100.0 * this.commentFinish / this.commmentAll),
            name: '待处理评论',
            label: 'comments',
            title: {
              offsetCenter: ['0%', '30%']
            },
            detail: {
              valueAnimation: true,
              offsetCenter: ['0%', '40%']
            }
          }
        ];
        option = {
          series: [
            {
              type: 'gauge',
              startAngle: 90,
              endAngle: -270,
              pointer: {
                show: false
              },
              progress: {
                show: true,
                overlap: false,
                roundCap: true,
                clip: false,
                itemStyle: {
                  borderWidth: 1,
                  borderColor: '#464646'
                }
              },
              axisLine: {
                lineStyle: {
                  width: 40
                }
              },
              splitLine: {
                show: false,
                distance: 0,
                length: 10
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                show: false,
                distance: 50
              },
              data: gaugeData,
              title: {
                fontSize: 14
              },
              detail: {
                width: 50,
                height: 14,
                fontSize: 14,
                color: 'inherit',
                borderColor: 'inherit',
                borderRadius: 20,
                borderWidth: 1,
                formatter: '{value}%'
              }
            }
          ]
        };
        option && myChart.setOption(option);
        myChart.on("click", (params) => {
          var routerPath = '/manage/'+params.data.label
          window.sessionStorage.setItem('activePath', routerPath)
          this.$router.push({
              path: routerPath
          })
        });
      },
    }
  }
</script>
  
<style scoped>
.chart-container {
  margin: auto;
  display: block;
}
</style>