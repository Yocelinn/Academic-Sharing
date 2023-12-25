<template>
  <seniorSearchBox v-model="isDialoVisibal" :classindex=radio1></seniorSearchBox>
  <div :class="{ 'mainContainer': isLargeModel, 'mainContainerSmallModel': !isLargeModel }"
    :style="{ width: `${width}%` }">
    <div class="container">
      <div :class="{ 'searchDiv': isLargeModel, 'searchDivSmallModel': !isLargeModel }"
        :style="{ backgroundColor: color }">
        <div :class="{ 'selectContainer': isLargeModel, 'selectContainerSmallModel': !isLargeModel }" v-if="radio != 10">
          <select class="select" :class="{ 'select': isLargeModel, 'selectSmallModel': !isLargeModel }"
            v-model="titleList[radio1]">
            <option v-for="(item, index) in options[radio1]" :key="item.value" :label="item.label" :value="item.value"
              :selected="index === 0">
              {{ item.label }}
            </option>
          </select>
        </div>
        <div :class="{ 'inputContainer': isLargeModel, 'inputContainerSmallModel': !isLargeModel }">
          <el-input placeholder="中文文献、外文文献" class="input" v-model="localQuery" @input="updateQuery" />
        </div>
        <el-button type="primary"
          style="position: relative;margin-right:20px;top: 5px;width : 15%;max-width: 60px;float: right;"
          @click="emitSearch" v-if="!isLargeModel" size="small">搜索</el-button>
        <el-button type="primary"
          style="position: relative;right: 20px;top: 15px;width : 15%;max-width: 60px;float: right;" @click="emitSearch"
          v-if="isLargeModel">搜索</el-button>
      </div>
      <div :class="{ 'classDiv': isLargeModel, 'classDivSmallModel': !isLargeModel }" :style="{ width: `${width}%` }"
        v-if="isClassVisible">
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
    <span style="position: relative;display: flex;top: 17px;left: 0px;color: white;cursor: pointer;" id="seniorSearchBox"
      @mouseover="mouseOverToChangeSeniorColor('seniorSearchBox')"
      @mouseout="mouseOutToChangeSeniorColor('seniorSearchBox')" @click="isDialoVisibal = true" v-if="isLargeModel">
      高级搜索
    </span>
    <span style="position: relative;display: flex;top: 8px;left: 0px;color: white;cursor: pointer;" id="seniorSearchBox"
      @mouseover="mouseOverToChangeSeniorColor('seniorSearchBox')"
      @mouseout="mouseOutToChangeSeniorColor('seniorSearchBox')" @click="isDialoVisibal = true" v-if="!isLargeModel">
      高级搜索
    </span>
  </div>
</template>
<style scoped>
.mainContainer {
  position: relative;
  display: flex;
  height: 200px;
  width: 100%;
}

.mainContainerSmallModel {
  position: relative;
  display: flex;
  height: 50px;
  width: 100%;
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
  /* 垂直居中对齐 */
  border-radius: 2%;
  width: 85%;
  overflow: hidden;
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

.classDivSmallModel {
  position: relative;
  display: flex;
  flex-direction: column;
  /* 垂直方向排列 */
  align-items: center;
  /* 垂直居中对齐 */
  height: 30px;
  width: 100%;
  margin-top: 10px;
}


.input {
  position: relative;
  display: flex;
  flex: 1;
  width: 50%;
}

:deep(.el-input__wrapper) {
  box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color)) inset;
  cursor: default;

  .el-input__inner {
    cursor: default !important;
  }
}

:deep(.el-input__wrapper.is-focus) {
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

.inputContainerSmallModel {
  position: relative;
  display: flex;
  top: 5px;
  height: 25px;
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

.selectContainerSmallModel {
  float: left;
  position: relative;
  display: flex;
  left: 15px;
  top: 5px;
  height: 25px;
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
  width: 95%;
  border-radius: 5px;
  box-shadow: 2px 2px 5px #42b983;
  background-color: white;
}

.searchDivSmallModel {
  flex-direction: column;
  /* 垂直方向排列 */
  align-items: center;
  /* 垂直居中对齐 */
  height: 40px;
  width: 97%;
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

.selectSmallModel {
  outline: none;
  height: 20px;
  width: 100%;
  border: 0;
  position: relative;
  display: flex;
  appearance: none;
  padding-top: 5px;
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
    isLargeModel: {
      type: Boolean,
      default: false,
    },
    width: {
      type: Number,
      default: 80 // 默认值
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
      dialogTableVisible: true,
      radio1: 0,
      radio: 0,
      localQuery: this.searchQuery,
      isDialoVisibal: false,
      options: [
        [
          {
            value: "",
            label: "主题",
          },
          {
            value: "title",
            label: "标题",
          },
          {
            value: "keyword",
            label: "关键词",
          },
          {
            value: "author",
            label: "作者",
          },
          {
            value: "institution",
            label: "机构",
          },
          {
            value: "source",
            label: "出版物",
          },
          {
            value: "abstract",
            label: "摘要",
          },
          {
            value: "doi",
            label: "DOI",
          },
        ],
        [
          {
            value: "",
            label: "主题",
          },
          {
            value: "title",
            label: "专利名",
          },
          {
            value: "inventor",
            label: "发明人",
          },
          {
            value: "applicant",
            label: "申请人",
          },
          {
            value: "apply_number",
            label: "申请号",
          },
          {
            value: "issue_number",
            label: "公开号",
          },
          {
            value: "ipc",
            label: "IPC",
          },
          {
            value: "cpc",
            label: "CPC",
          },
        ],
        [
          {
            value: "",
            label: "主题",
          },
          {
            value: "title",
            label: "标题",
          },
          {
            value: "subject",
            label: "服务领域",
          },
          {
            value: "institution",
            label: "主办单位",
          },
        ],
        [
          {
            value: "",
            label: "主题",
          },
          {
            value: "title",
            label: "标题",
          },
          {
            value: "subject",
            label: "领域",
          },
          {
            value: "author",
            label: "编译者",
          },
          {
            value: "source",
            label: "快报产品",
          },
          {
            value: "platform",
            label: "来源",
          },
          {
            value: "abstract",
            label: "摘要",
          },
        ],
        [
          {
            value: "",
            label: "主题",
          },
          {
            value: "title",
            label: "标题",
          },
          {
            value: "author",
            label: "作者",
          },
          {
            value: "keyword",
            label: "关键词",
          },
          {
            value: "provider",
            label: "发布机构",
          },
          {
            value: "abstract",
            label: "摘要",
          },
          {
            value: "cstr",
            label: "CSTR",
          },
        ],
        [
          {
            value: "",
            label: "主题",
          },
          {
            value: "title",
            label: "书名",
          },
          {
            value: "isbn",
            label: "ISBN",
          },
          {
            value: "author",
            label: "作者",
          },
          {
            value: "publisher",
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
    else {
      if (newValue === "articles")
        this.radio1 = 0;
      else if (newValue === "patents")
        this.radio1 = 1;
      else if (newValue === "reports")
        this.radio1 = 3;
      else if (newValue === "sciencedata")
        this.radio1 = 4;
      else if (newValue === "books")
        this.radio1 = 5;
    }
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
      if (this.localQuery === "") {
        return;
      }
      let map = new Map();
      map.set(0, "articles");
      map.set(1, "patents");
      map.set(2, "bulletins");
      map.set(3, "reports");
      map.set(4, "sciencedata");
      map.set(5, "books");
      var a = map.get(this.radio1);
      this.$emit('search', { query: this.localQuery, option: this.titleList[this.radio1], class: a });
      var query = this.localQuery;
      console.log(query)
      console.log(this.titleList[this.radio1])
      var content = this.titleList[this.radio1];
      //path: '/searchResults/:query?/:type?/:content?',
      this.$router.push({
        path: "/searchResults",
        query: {
          query: query,
          type: "simple",
          content: content
        }
      }).then(() => {
        window.location.reload();
      });

    }
  },
  watch: {
    // 确保响应父组件传递的 prop 更改
    searchQuery(newVal) {
      this.localQuery = newVal;
    },
    '$store.state.searchType'(newValue, oldValue) {
      if (newValue === "articles")
        this.radio1 = 0;
      else if (newValue === "patents")
        this.radio1 = 1;
      else if (newValue === "reports")
        this.radio1 = 3;
      else if (newValue === "sciencedata")
        this.radio1 = 4;
      else if (newValue === "books")
        this.radio1 = 5;
    }
  },
  computedWidth() {
    var temp = this.width;
    return `${temp}%`;
  },
  radio1(newVal) {
    this.radio = newVal
  }
};
</script>
