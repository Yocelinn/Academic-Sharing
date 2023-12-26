<template>
  <div id="my_relation_chart" :style="{width: '100%', height: '500px'}" ></div>
</template>

<script>
import echarts from "echarts";
import "echarts-wordcloud/dist/echarts-wordcloud";
import "echarts-wordcloud/dist/echarts-wordcloud.min";
  export default {
    name: "VueRalation",
    props: {
      nodes: Array,
      edges: Array
    },
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
      }
    },
    mounted(){
      this.initChart();
    },
    methods: {
      randomColor(){
        var colors = ['#c8d5b9', '#8fc0a9', "#68b0ab", "#4a7c59", "#B1D182"];
        return colors[parseInt(Math.random() * 5)];
      },
      initChart() {
        this.chart = this.$echarts.init(document.getElementById("my_relation_chart"));
        const option = {
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
            // 连接两个关系对象的线上的标签
            // edgeLabel: {
            //   normal: {
            //     show: true,
            //     textStyle: {
            //         // fontSize: 14
            //     },
            //     // 标签内容
            //     formatter: function(param) {
            //         return param.data.category;
            //     }
            //   }
            // },
            // data: [{
            //     name: "总企业",
            //     draggable: true, // 节点是否可拖拽，只在使用力引导布局的时候有用。
            //     symbolSize: [80, 80], // 关系图节点标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10。
            //     itemStyle: {
            //         color: '#28463C'
            //     },
            // }, {
            //     name: "企业1",
            //     draggable: true,
            //     symbolSize: [50, 50],
            //     itemStyle: {
            //         color: this.randomColor()
            //     },
            // }, {
            //     name: "企业2",
            //     draggable: true,
            //     symbolSize: [50, 50],
            //     itemStyle: {
            //         color: this.randomColor()
            //     },
            // }, {
            //     name: "企业3",
            //     draggable: true,
            //     symbolSize: [50, 50],
            //     itemStyle: {
            //         color: this.randomColor()
            //     },
            // }, {
            //     name: "企业4",
            //     draggable: true,
            //     symbolSize: [50, 50],
            //     itemStyle: {
            //         color: this.randomColor()
            //     },
            // }],
            // 节点分类的类目，可选。如果节点有分类的话可以通过 data[i].category 指定每个节点的类目，类目的样式会被应用到节点样式上。图例也可以基于categories名字展现和筛选。
            // categories: [{
            //     // 类目名称，用于和 legend 对应以及格式化 tooltip 的内容。
            //     name: "企业分析"
            // }, {
            //     name: "入驻"
            // }, {
            //     name: "培育"
            // }, {
            //     name: "申报"
            // }, {
            //     name: "产教融合"
            // }],
            // 节点间的关系数据
            data: this.nodes,
            links: this.edges,
            // links: [{
            //     target: "企业1",
            //     source: "总企业",
            //     // 关系对象连接线上的标签内容
            // }, {
            //     target: "企业2",
            //     source: "总企业",
            // }, {
            //     target: "企业3",
            //     source: "总企业",
            // }, {
            //     target: "企业4",
            //     source: "总企业",
            // }]
          }]
        };
        this.chart.setOption(option);
        // this.chart.on("click", (params) => {
        //   if(params.data.node_id!=null){
        //     window.open(`http://localhost:8080/institution?id=${params.data.node_id}`)
        //   }
        //   // this.$router.push({
        //   //   name: 'institution',
        //   //   query: {id: params.data.node_id}
        //   // })
        // });
      },
    }
  }
</script>