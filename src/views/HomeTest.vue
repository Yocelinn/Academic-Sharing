<!-- 
  1. 学科分类: 有哪些类别是在前端还是后端?
  2. 热点: 要展示哪些类别?展示的形式? 
-->
<template>
  <div class="peripheral-1">
    检索模块
  </div>
  <div class="peripheral-2">
    <div class="middle-block" style="position: relative;background-color: aqua;width: 20%;left: 10%;top: -65px;">
      <div style="background-color: white;height: 60px;border-bottom: 2px solid wheat;">
        学科分类
      </div>
      <div style="background-color: white;height: 450px;">

      </div>
    </div>
    <div class="middle-block" style="background-color: rgb(255, 0, 55);width: 38%;left: 31%;top: -65px;">
      <div style="background-color: white;height: 60px;border-bottom: 2px solid wheat;">
        时下热点
      </div>
    </div>
    <div class="middle-block" style="background-color: rgb(0, 255, 38);width: 20%;left: 70%;top: -65px;">
      <div style="background-color: white;height: 60px;border-bottom: 2px solid wheat;">
        常用功能
      </div>
    </div>
  </div>
  <div class="peripheral-3">
    <div style="height: 10px;"></div>
    <div style="position: relative;">
      <div class="" style="position: relative;background-color: aqua;width: 35%;left: 10%;top: 0px;">
        <div style="background-color: white;height: 450px;">

        </div>
      </div>
      <div class="" style="position: absolute;;background-color: rgb(255, 0, 55);width: 44%;left: 46%;top: 0px;">
        <div style="background-color: white;height: 450px;">

        </div>
      </div>
    </div>
    <div style="height: 10px;"></div>
  </div>
  <div class="peripheral-4">
    <div class="" style="position: relative;background-color: aqua;width: 20%;left: 10%;top: 5px;">
      <div style="background-color: white;height: 50px;border-bottom: 2px solid rgb(57, 132, 164);">
        1
      </div>
      <div style="background-color: white;height: 150px;">

      </div>
    </div>
    <div class="" style="position: absolute;background-color: rgb(255, 0, 55);width: 38%;left: 31%;top: 5px;">
      <div style="background-color: white;height: 50px;border-bottom: 2px solid rgb(57, 132, 164);">
        2
      </div>
    </div>
    <div class="" style="position: absolute;background-color: rgb(0, 255, 38);width: 20%;left: 70%;top: 5px;">
      <div style="background-color: white;height: 50px;border-bottom: 2px solid rgb(57, 132, 164);">
        3
      </div>
    </div>
  </div>
</template>
<<<<<<< HEAD

<style scoped>
.peripheral-1{
  background-color: rgb(60, 176, 238);
  height: 300px;
  min-width: 1200px;
  position: relative;
}
.peripheral-2{
  background-color: rgb(210, 219, 225);
  min-width: 1200px;
  position: relative;
}
.peripheral-3{
  min-width: 1200px;
  position: relative;
}
.peripheral-4{
  background-color: rgb(110, 108, 106);
  min-width: 1200px;
  position: relative;
}
.middle-block{
  border-top: 5px solid rgb(138, 167, 231);
  border: 2px solid white;
  position: absolute;
}
.middle-block:hover{
  border-top: 5px solid rgb(206, 90, 41);
}

</style>

<script>

export default{
  
}
</script>
=======
<style scoped>
.top {
  width: 100%;
  height: 30px;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #b1b3b8;
}
.container {
  position: relative;
  display: flex;
  flex-direction: column; /* 垂直方向排列 */
  align-items: center; /* 垂直居中对齐 */
  height: 200px;
  width: 800px;
  left: 300px;
}
.classDiv {
  position: relative;
  display: flex;
  flex-direction: column; /* 垂直方向排列 */
  align-items: center; /* 垂直居中对齐 */
  height: 100px;
  width: 100%;
  margin-top: 40px;
}
.input {
  position: relative;
  display: flex;
  flex: 1;
  width: 550px;
}
:deep(.el-input__wrapper) {
  box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color))
    inset;
  cursor: default;
  .el-input__inner {
    cursor: default !important;
  }
}
.inputContainer {
  position: relative;
  display: flex;
  top: 10px;
  height: 40px;
  width: 450px;
  float: left;
  margin-left: 40px;
  overflow: hidden;
}
.selectContainer {
  float: left;
  position: relative;
  display: flex;
  left: 15px;
  top: 10px;
  height: 40px;
  width: 100px;
  border-style: solid;
  border-left: 0;
  border-top: 0;
  border-bottom: 0;
  border-right-width: 2px;
  border-right-color: #b1b3b8;
}
.searchDiv {
  flex-direction: column; /* 垂直方向排列 */
  align-items: center; /* 垂直居中对齐 */
  height: 60px;
  width: 850px;
  border-radius: 5px;
  box-shadow: 2px 2px 5px #409eff;
}

.select {
  outline: none;
  height: 30px;
  width: 100px;
  border: 0;
  position: relative;
  display: flex;
  appearance: none;
  padding-top: 10px;
}
</style>

<script>
export default {
  data() {
    return {
      options: [
        [
          {
            value: "主题",
            label: "主题",
          },
          {
            value: "篇关摘",
            label: "篇关摘",
          },
          {
            value: "关键词",
            label: "关键词",
          },
          {
            value: "题名",
            label: "题名",
          },
          {
            value: "全文",
            label: "全文",
          },
          {
            value: "作者",
            label: "作者",
          },
          {
            value: "第一作者",
            label: "第一作者",
          },
          {
            value: "通讯作者",
            label: "通讯作者",
          },
          {
            value: "作者单位",
            label: "作者单位",
          },
          {
            value: "导师",
            label: "导师",
          },
          {
            value: "摘要",
            label: "摘要",
          },
          {
            value: "小标题",
            label: "小标题",
          },
          {
            value: "参考文献",
            label: "参考文献",
          },
          {
            value: "分类号",
            label: "分类号",
          },
          {
            value: "文献来源",
            label: "文献来源",
          },
          {
            value: "DOI",
            label: "DOI",
          },
        ],
        [
          {
            value: "主题",
            label: "主题",
          },
          {
            value: "篇关摘",
            label: "篇关摘",
          },
          {
            value: "关键词",
            label: "关键词",
          },
          {
            value: "题名",
            label: "题名",
          },
          {
            value: "全文",
            label: "全文",
          },
          {
            value: "作者",
            label: "作者",
          },
          {
            value: "第一作者",
            label: "第一作者",
          },
          {
            value: "通讯作者",
            label: "通讯作者",
          },
          {
            value: "作者单位",
            label: "作者单位",
          },
          {
            value: "导师",
            label: "导师",
          },
          {
            value: "摘要",
            label: "摘要",
          },
          {
            value: "小标题",
            label: "小标题",
          },
          {
            value: "参考文献",
            label: "参考文献",
          },
          {
            value: "分类号",
            label: "分类号",
          },
          {
            value: "文献来源",
            label: "文献来源",
          },
          {
            value: "DOI",
            label: "DOI",
          },
        ],
        [
          {
            value: "主题",
            label: "主题",
          },
          {
            value: "篇关摘",
            label: "篇关摘",
          },
          {
            value: "关键词",
            label: "关键词",
          },
          {
            value: "题名",
            label: "题名",
          },
          {
            value: "全文",
            label: "全文",
          },
          {
            value: "作者",
            label: "作者",
          },
          {
            value: "第一作者",
            label: "第一作者",
          },
          {
            value: "通讯作者",
            label: "通讯作者",
          },
          {
            value: "作者单位",
            label: "作者单位",
          },
          {
            value: "导师",
            label: "导师",
          },
          {
            value: "摘要",
            label: "摘要",
          },
          {
            value: "小标题",
            label: "小标题",
          },
          {
            value: "参考文献",
            label: "参考文献",
          },
          {
            value: "分类号",
            label: "分类号",
          },
          {
            value: "文献来源",
            label: "文献来源",
          },
          {
            value: "DOI",
            label: "DOI",
          },
        ],
        [
          {
            value: "主题",
            label: "主题",
          },
          {
            value: "篇关摘",
            label: "篇关摘",
          },
          {
            value: "关键词",
            label: "关键词",
          },
          {
            value: "题名",
            label: "题名",
          },
          {
            value: "全文",
            label: "全文",
          },
          {
            value: "作者",
            label: "作者",
          },
          {
            value: "第一作者",
            label: "第一作者",
          },
          {
            value: "通讯作者",
            label: "通讯作者",
          },
          {
            value: "作者单位",
            label: "作者单位",
          },
          {
            value: "导师",
            label: "导师",
          },
          {
            value: "摘要",
            label: "摘要",
          },
          {
            value: "小标题",
            label: "小标题",
          },
          {
            value: "参考文献",
            label: "参考文献",
          },
          {
            value: "分类号",
            label: "分类号",
          },
          {
            value: "文献来源",
            label: "文献来源",
          },
          {
            value: "DOI",
            label: "DOI",
          },
        ],
        [
          {
            value: "主题",
            label: "主题",
          },
          {
            value: "篇关摘",
            label: "篇关摘",
          },
          {
            value: "关键词",
            label: "关键词",
          },
          {
            value: "题名",
            label: "题名",
          },
          {
            value: "全文",
            label: "全文",
          },
          {
            value: "作者",
            label: "作者",
          },
          {
            value: "第一作者",
            label: "第一作者",
          },
          {
            value: "通讯作者",
            label: "通讯作者",
          },
          {
            value: "作者单位",
            label: "作者单位",
          },
          {
            value: "导师",
            label: "导师",
          },
          {
            value: "摘要",
            label: "摘要",
          },
          {
            value: "小标题",
            label: "小标题",
          },
          {
            value: "参考文献",
            label: "参考文献",
          },
          {
            value: "分类号",
            label: "分类号",
          },
          {
            value: "文献来源",
            label: "文献来源",
          },
          {
            value: "DOI",
            label: "DOI",
          },
        ],
        [
          {
            value: "主题",
            label: "主题",
          },
          {
            value: "篇关摘",
            label: "篇关摘",
          },
          {
            value: "关键词",
            label: "关键词",
          },
          {
            value: "题名",
            label: "题名",
          },
          {
            value: "全文",
            label: "全文",
          },
          {
            value: "作者",
            label: "作者",
          },
          {
            value: "第一作者",
            label: "第一作者",
          },
          {
            value: "通讯作者",
            label: "通讯作者",
          },
          {
            value: "作者单位",
            label: "作者单位",
          },
          {
            value: "导师",
            label: "导师",
          },
          {
            value: "摘要",
            label: "摘要",
          },
          {
            value: "小标题",
            label: "小标题",
          },
          {
            value: "参考文献",
            label: "参考文献",
          },
          {
            value: "分类号",
            label: "分类号",
          },
          {
            value: "文献来源",
            label: "文献来源",
          },
          {
            value: "DOI",
            label: "DOI",
          },
        ],
        [
          {
            value: "主题",
            label: "主题",
          },
          {
            value: "篇关摘",
            label: "篇关摘",
          },
          {
            value: "关键词",
            label: "关键词",
          },
          {
            value: "题名",
            label: "题名",
          },
          {
            value: "全文",
            label: "全文",
          },
          {
            value: "作者",
            label: "作者",
          },
          {
            value: "第一作者",
            label: "第一作者",
          },
          {
            value: "通讯作者",
            label: "通讯作者",
          },
          {
            value: "作者单位",
            label: "作者单位",
          },
          {
            value: "导师",
            label: "导师",
          },
          {
            value: "摘要",
            label: "摘要",
          },
          {
            value: "小标题",
            label: "小标题",
          },
          {
            value: "参考文献",
            label: "参考文献",
          },
          {
            value: "分类号",
            label: "分类号",
          },
          {
            value: "文献来源",
            label: "文献来源",
          },
          {
            value: "DOI",
            label: "DOI",
          },
        ],
        [
          {
            value: "主题",
            label: "主题",
          },
          {
            value: "篇关摘",
            label: "篇关摘",
          },
          {
            value: "关键词",
            label: "关键词",
          },
          {
            value: "题名",
            label: "题名",
          },
          {
            value: "全文",
            label: "全文",
          },
          {
            value: "作者",
            label: "作者",
          },
          {
            value: "第一作者",
            label: "第一作者",
          },
          {
            value: "通讯作者",
            label: "通讯作者",
          },
          {
            value: "作者单位",
            label: "作者单位",
          },
          {
            value: "导师",
            label: "导师",
          },
          {
            value: "摘要",
            label: "摘要",
          },
          {
            value: "小标题",
            label: "小标题",
          },
          {
            value: "参考文献",
            label: "参考文献",
          },
          {
            value: "分类号",
            label: "分类号",
          },
          {
            value: "文献来源",
            label: "文献来源",
          },
          {
            value: "DOI",
            label: "DOI",
          },
        ],
        [
          {
            value: "主题",
            label: "主题",
          },
          {
            value: "篇关摘",
            label: "篇关摘",
          },
          {
            value: "关键词",
            label: "关键词",
          },
          {
            value: "题名",
            label: "题名",
          },
          {
            value: "全文",
            label: "全文",
          },
          {
            value: "作者",
            label: "作者",
          },
          {
            value: "第一作者",
            label: "第一作者",
          },
          {
            value: "通讯作者",
            label: "通讯作者",
          },
          {
            value: "作者单位",
            label: "作者单位",
          },
          {
            value: "导师",
            label: "导师",
          },
          {
            value: "摘要",
            label: "摘要",
          },
          {
            value: "小标题",
            label: "小标题",
          },
          {
            value: "参考文献",
            label: "参考文献",
          },
          {
            value: "分类号",
            label: "分类号",
          },
          {
            value: "文献来源",
            label: "文献来源",
          },
          {
            value: "DOI",
            label: "DOI",
          },
        ],
        [
          {
            value: "123",
            label: "123",
          },
          {
            value: "篇关摘",
            label: "篇关摘",
          },
          {
            value: "关键词",
            label: "关键词",
          },
          {
            value: "题名",
            label: "题名",
          },
          {
            value: "全文",
            label: "全文",
          },
          {
            value: "作者",
            label: "作者",
          },
          {
            value: "第一作者",
            label: "第一作者",
          },
          {
            value: "通讯作者",
            label: "通讯作者",
          },
          {
            value: "作者单位",
            label: "作者单位",
          },
          {
            value: "导师",
            label: "导师",
          },
          {
            value: "摘要",
            label: "摘要",
          },
          {
            value: "小标题",
            label: "小标题",
          },
          {
            value: "参考文献",
            label: "参考文献",
          },
          {
            value: "分类号",
            label: "分类号",
          },
          {
            value: "文献来源",
            label: "文献来源",
          },
          {
            value: "DOI",
            label: "DOI",
          },
        ],
      ],
      radio: 10,
      selectValue: "Option1",
      titleList: [],
    };
  },
  mounted() {
    for (var i = 0; i < this.options.length; i++) {
      this.titleList.push(this.options[i][0].value);
    }
  },
  methods: {
    cancelRadio() {
      this.radio = 10;
    },
    test() {
      console.log(this.selectValue);
      console.log(this.titleList);
      console.log(this.radio);
    },
  },
};
</script>
>>>>>>> yyz
