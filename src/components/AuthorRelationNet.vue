<template>
  <div id="author_relation_chart" :style="{width: '100%', height: '500px'}" ></div>
</template>

<script>
import echarts from "echarts";
import "echarts-wordcloud/dist/echarts-wordcloud";
import "echarts-wordcloud/dist/echarts-wordcloud.min";
import { GetAuthorsByAuthor } from "../api/authorRelation.js"
  export default {
    name: "VueRalation",
    props: {
      authors: Array,
      name: String
    },
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        data: [{
          name: this.name,
          draggable: true,
          symbolSize: 80,
          itemStyle: {
              color: this.randomColor()
          },
        }],
        links: [],
      }
    },
    mounted(){
      for(let item of this.authors){
        if(item.name!=this.name){
          this.data.push({
            name: item.name,
            draggable: true,
            symbolSize: 50,
            itemStyle: {
                color: this.randomColor()
            },
          })
          this.links.push({
            target: item.name,
            source: this.name,
          })
        }
      }
      this.initChart();
      
    },
    methods: {
      randomColor(){
        var colors = ['#c8d5b9', '#8fc0a9', "#68b0ab", "#F4F1E9", "#B1D182"];
        return colors[parseInt(Math.random() * 5)];
      },
      initChart() {
        this.chart = this.$echarts.init(document.getElementById("author_relation_chart"));
        const option = {
          title: {
            text: this.name,
            x: "center"
          },
          tooltip: {
            show: true
          },
          legend: {
            show: false,
          },
          xAxis: {
            show: false
          },
          yAxis: {
            show: false
          },
          grid: {
            top: '80px'
          },
          series: [{
            type: "graph",
            // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
            roam: true,
            // 是否在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点。[ default: false ]
            focusNodeAdjacency: true,
            // 力引导布局相关的配置项，力引导布局是模拟弹簧电荷模型在每两个节点之间添加一个斥力，每条边的两个节点之间添加一个引力，每次迭代节点会在各个斥力和引力的作用下移动位置，多次迭代后节点会静止在一个受力平衡的位置，达到整个模型的能量最小化。
            force: {
                // 力引导布局的结果有良好的对称性和局部聚合性，也比较美观。
                // [ default: 50 ]节点之间的斥力因子(关系对象之间的距离)。支持设置成数组表达斥力的范围，此时不同大小的值会线性映射到不同的斥力。值越大则斥力越大
                repulsion: 200,
                // [ default: 30 ]边的两个节点之间的距离(关系对象连接线两端对象的距离,会根据关系对象值得大小来判断距离的大小)，
                edgeLength: [120, 100]
                    // 这个距离也会受 repulsion。支持设置成数组表达边长的范围，此时不同大小的值会线性映射到不同的长度。值越小则长度越长。如下示例:
                    // 值最大的边长度会趋向于 10，值最小的边长度会趋向于 50      edgeLength: [10, 50]
            },
            // 图的布局。[ default: 'none' ]
            layout: "force",
            // 'none' 不采用任何布局，使用节点中提供的 x， y 作为节点的位置。
            // 'circular' 采用环形布局;'force' 采用力引导布局.
            // 标记的图形
            symbol: 'circle',
            // 关系边的公用线条样式。其中 lineStyle.color 支持设置为'source'或者'target'特殊值，此时边会自动取源节点或目标节点的颜色作为自己的颜色。
            normal: {
              lineStyle: {
                // 线的颜色[ default: '#aaa' ]
                color: '#fff',
                // 线宽[ default: 1 ]
                width: 1,
                // 线的类型[ default: solid实线 ]   'dashed'虚线    'dotted'
                type: 'solid',
                // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。[ default: 0.5 ]
                opacity: 0.5,
                // 边的曲度，支持从 0 到 1 的值，值越大曲度越大。[ default: 0 ]
                curveness: 0.5
              }
            },
              // 关系对象上的标签
            label: {
              normal: {
                // 是否显示标签
                show: false,
                // 标签位置:'top''left''right''bottom''inside''insideLeft''insideRight''insideTop''insideBottom''insideTopLeft''insideBottomLeft''insideTopRight''insideBottomRight'
                position: "inside",
                // 文本样式
                textStyle: {
                    fontSize: 16,
                    color: 'grey'
                }
              }
            },
            data: this.data,
            links: this.links
          }]
        };
        this.chart.setOption(option);
        // this.chart.on("click", (params) => {
        //   this.$router.push({
        //     name: 'institution',
        //     query: {id: params.data.node_id}
        //   })
        // });
      },
    }
  }
</script>