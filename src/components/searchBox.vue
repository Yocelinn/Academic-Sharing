<template>
  <div class="container" :style="{ width: width ,backgroundColor : color}">
    <div class="searchDiv" :style="{ width: width }">
      <div class="selectContainer" v-if="radio != 10">
        <select class="select" v-model="titleList[radio]">
          <option v-for="(item, index) in options[radio]" :key="item.value" :label="item.label" :value="item.value"
            :selected="index === 0">
            {{ item.label }}
          </option>
        </select>
      </div>
      <div class="inputContainer">
        <el-input placeholder="中文文献、外文文献" class="input" v-model="localQuery" @input="updateQuery" />
      </div>
      <el-button type="primary" style="position: relative;margin-left:5%;top: 15px;" @click="emitSearch">搜索</el-button>
    </div>
    <div class="classDiv" :style="{ width: width }" v-if="isClassVisible">
      <div class="top" style="padding-bottom: 0px" v-if="isClassVisible">
        <el-radio-group v-model="radio">
          <el-radio :label="0">论文</el-radio>
          <el-radio :label="1">专利</el-radio>
          <el-radio :label="2">快报</el-radio>
          <el-radio :label="3">动态快讯</el-radio>
          <el-radio :label="4">科学数据</el-radio>
          <el-radio :label="5">图书</el-radio>
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
  flex-direction: column;
  /* 垂直方向排列 */
  align-items: center;
  /* 垂直居中对齐 */
  width: 800px;
  left: 300px;
}

.classDiv {
  position: relative;
  display: flex;
  flex-direction: column;
  /* 垂直方向排列 */
  align-items: center;
  /* 垂直居中对齐 */
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
  box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color)) inset;
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
  width: 60%;
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
  width: 8%;
  border-style: solid;
  border-left: 0;
  border-top: 0;
  border-bottom: 0;
  border-right-width: 2px;
  border-right-color: #b1b3b8;
}

.searchDiv {
  flex-direction: column;
  /* 垂直方向排列 */
  align-items: center;
  /* 垂直居中对齐 */
  height: 60px;
  width: 850px;
  border-radius: 5px;
  box-shadow: 2px 2px 5px #42b983;
}

.select {
  outline: none;
  height: 30px;
  width: 100%;
  border: 0;
  position: relative;
  display: flex;
  appearance: none;
  padding-top: 10px;
}
</style>

<script>
export default {
  props: {
    color : {
      type : String,
      default : 'white',
    },
    width: {
      type: String,
      default: '800px' // 默认值
    },
    isClassVisible: {
      type: Boolean,
      default: true // 默认值
    },
    searchQuery: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      localQuery: this.searchQuery,
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
      input: '',
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
      console.log(isClassVisible);

    },
    updateQuery(value) {
      // 发射一个自定义事件来通知父组件更新数据
      this.$emit('update:searchQuery', value);
    },
    emitSearch() {
      let map = new Map();
      map.set(0, "articles");
      map.set(1, "patents");
      map.set(2, "bulletins");
      map.set(3, "reports");
      map.set(4, "sciencedata");
      map.set(5, "books");
      var a = map.get(this.radio);
        this.$emit('search', { query: this.localQuery, option: this.titleList[this.radio],class : a });
    }
  },
  watch: {
    // 确保响应父组件传递的 prop 更改
    searchQuery(newVal) {
      this.localQuery = newVal;
    }
  }
};
</script>
