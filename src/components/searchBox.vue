<template>
  <seniorSearchBox v-model="isDialoVisibal" :classindex=radio1></seniorSearchBox>
  <div class="mainContainer" :style="{ width: computedWidth }">
    <div class="container" :style="{ width: `${width}px`, backgroundColor: color }">
      <div class="searchDiv" :style="{ width: `${width}px`, backgroundColor: color }">
        <div class="selectContainer" v-if="radio != 10">
          <select class="select" v-model="titleList[radio1]">
            <option v-for="(item, index) in options[radio1]" :key="item.value" :label="item.label" :value="item.value"
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
      <div class="classDiv" :style="{ width: `${width}px` }" v-if="isClassVisible">
        <div class="top" style="padding-bottom: 0px" v-if="isClassVisible">
          <el-radio-group v-model="radio1" style="color: #409EFF;" text-color="red" fill='red' size="large">
            <el-radio :label="0" class="item" fill="red">论文</el-radio>
            <el-radio :label="1" class="item">专利</el-radio>
            <el-radio :label="2" class="item">快报</el-radio>
            <el-radio :label="3" class="item">动态快讯</el-radio>
            <el-radio :label="4" class="item">科学数据</el-radio>
            <el-radio :label="5" class="item">图书</el-radio>
            <el-button type="info" style="height: 25px;" plain @click="cancelRadio">取消</el-button>
          </el-radio-group>
        </div>
      </div>
    </div>
    <span style="position: relative;display: flex;top: 17px;left: 8px;color: white;cursor: pointer;" id="seniorSearchBox"
      @mouseover="mouseOverToChangeSeniorColor('seniorSearchBox')"
      @mouseout="mouseOutToChangeSeniorColor('seniorSearchBox')" @click="isDialoVisibal = true">
      高级搜索
    </span>
  </div>
</template>
<style scoped>
.mainContainer {
  position: relative;
  display: flex;
}

/* 选中后的字体颜色 */
:deep(.el-radio__input.is-checked .el-radio__inner) {
  border-color: #ff9213;
  background-color: #ff9213;
}

:deep(.el-radio__inner:hover) {
  border-color: #ff9213;
}

:deep(.el-radio__input.is-checked+.el-radio__label) {
  color: #fd7624 !important;
}

:deep(.el-radio__input+.el-radio__label) {
  color: #909399 !important;
  font-size: 20px;
  font-weight: 400;
}

:deep(.el-radio__input.is-checked .el-radio__inner) {
  background: #fd7624 !important;
  border-color: #fd7624 !important;
}

.item {
  color: #eebe77;
  font-size: 100px;
}

.top {
  width: 100%;
  height: 30px;
}

.container {
  position: relative;
  display: flex;
  flex-direction: column;
  /* 垂直方向排列 */
  align-items: center;
  width: 1000px;
  /* 垂直居中对齐 */
  border-radius: 2%;
}

.classDiv {
  position: relative;
  display: flex;
  flex-direction: column;
  /* 垂直方向排列 */
  align-items: center;
  /* 垂直居中对齐 */
  height: 50px;
  width: 100%;
  margin-top: 20px;
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
  background-color: white;
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
import seniorSearchBox from '@/components/seniorSearchPage.vue'
import { claimPortal } from "../api/portal.js"
import Vue from 'vue';
import App from '../App.vue';
import store from '../store/index'; // 引入 store
export default {
  components: {
    seniorSearchBox,
  },
  props: {
    color: {
      type: String,
      default: 'white',
    },
    width: {
      type: Number,
      default: 800 // 默认值
    },
    isClassVisible: {
      type: Boolean,
      default: true // 默认值
    },
    searchQuery: {
      type: String,
      default: ''
    },
    classindex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      radio1: 0,
      radio: 0,
      localQuery: this.searchQuery,
      isDialoVisibal: false,
      options: [
        [
          {
            value: "主题",
            label: "主题",
          },
          {
            value: "标题",
            label: "标题",
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
            value: "作者",
            label: "作者",
          },
          {
            value: "机构",
            label: "机构",
          },
          {
            value: "出版物",
            label: "出版物",
          },
          {
            value: "摘要",
            label: "摘要",
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
            value: "专利名",
            label: "专利名",
          },
          {
            value: "发明人",
            label: "发明人",
          },
          {
            value: "申请人",
            label: "申请人",
          },
          {
            value: "申请号",
            label: "申请号",
          },
          {
            value: "公开号",
            label: "公开号",
          },
          {
            value: "IPC",
            label: "IPC",
          },
          {
            value: "CPC",
            label: "CPC",
          },
        ],
        [
          {
            value: "主题",
            label: "主题",
          },
          {
            value: "标题",
            label: "标题",
          },
          {
            value: "服务领域",
            label: "服务领域",
          },
          {
            value: "主办单位",
            label: "主办单位",
          },
        ],
        [
          {
            value: "主题",
            label: "主题",
          },
          {
            value: "标题",
            label: "标题",
          },
          {
            value: "领域",
            label: "领域",
          },
          {
            value: "编译者",
            label: "编译者",
          },
          {
            value: "快报产品",
            label: "快报产品",
          },
          {
            value: "来源",
            label: "来源",
          },
          {
            value: "摘要",
            label: "摘要",
          },
        ],
        [
          {
            value: "主题",
            label: "主题",
          },
          {
            value: "标题",
            label: "标题",
          },
          {
            value: "作者",
            label: "作者",
          },
          {
            value: "关键词",
            label: "关键词",
          },
        ],
        [
          {
            value: "书名",
            label: "书名",
          },
          {
            value: "ISBN",
            label: "ISBN",
          },
          {
            value: "作者",
            label: "作者",
          },
          {
            value: "出版社",
            label: "出版社",
          },
        ],
      ],
      selectValue: "Option1",
      titleList: [],
      input: '',
    };
  },
  mounted() {
    for (var i = 0; i < this.options.length; i++) {
      this.titleList.push(this.options[i][0].value);
    }
    if (this.$store.state.searchType === "")
      this.radio1 = 0
    else
      this.radio1 = this.$store.state.searchType;
    console.log(this.radio1)
    console.log(this.titleList)
  },
  methods: {
    mouseOverToChangeSeniorColor(id) {
      var ele = document.querySelector("#" + id);
      ele.style.color = "#d1edc4"
    },
    mouseOutToChangeSeniorColor(id) {
      var ele = document.querySelector("#" + id);
      ele.style.color = "white"
    },
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
      var a = map.get(this.radio1);
      this.$emit('search', { query: this.localQuery, option: this.titleList[this.radio1], class: a });
      console.log(this.titleList[this.radio1])
    }
  },
  watch: {
    // 确保响应父组件传递的 prop 更改
    searchQuery(newVal) {
      this.localQuery = newVal;
    },
    '$store.state.searchType'(newValue, oldValue) {
      this.radio1 = newValue
    }
  },
  computedWidth() {
    var temp = this.width + 50;
    return `${temp}px`;
  },
  radio1(newVal) {
    this.radio = newVal
  }
};
</script>
