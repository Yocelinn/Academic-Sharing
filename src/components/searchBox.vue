<template>
  <div class="container">
    <div class="searchDiv">
      <div class="selectContainer" v-if="radio != 10">
        <select class="select" v-model="titleList[radio]">
          <option
            v-for="(item, index) in options[radio]"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :selected="index === 0"
          >
            {{ item.label }}
          </option>
        </select>
      </div>
      <div class="inputContainer">
        <el-input
          v-model="input"
          placeholder="中文文献、外文文献"
          class="input"
        />
      </div>
      <el-button type="primary" style="position: absolute;left: 700px;top: 15px;" @click="test"
          >搜索</el-button
        >
    </div>
    <div class="classDiv" >
      <div class="top" style="padding-bottom: 0px">
        <el-radio-group v-model="radio">
          <el-radio :label="0">学术期刊</el-radio>
          <el-radio :label="1">学术论文</el-radio>
          <el-radio :label="2">会议</el-radio>
          <el-radio :label="3">报纸</el-radio>
          <el-radio :label="4">年鉴</el-radio>
          <el-radio :label="5">专利</el-radio>
          <el-radio :label="6">标准</el-radio>
          <el-radio :label="7">成果</el-radio>
          <el-radio :label="8">图书</el-radio>
          <el-radio :label="9">学术辑刊</el-radio>
          <el-button type="info" style="height: 25px;" plain @click="cancelRadio">取消</el-button>
        </el-radio-group>
      </div>
    </div>
  </div>
</template>
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
      input : '',
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
