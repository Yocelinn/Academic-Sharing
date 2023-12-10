<template>
  <div class="home">
    <div class="allContainer">
      <div class="radioContaner">
        <el-radio-group v-model="radioValue" class="ml-4">
          <el-radio-button label="1" size="large" class="elButton"
            >高级检索</el-radio-button
          >
          <el-radio-button label="2" size="large" class="elButton"
            >专业检索</el-radio-button
          >
          <el-radio-button label="3" size="large" class="elButton"
            >作者发文检索</el-radio-button
          >
        </el-radio-group>
      </div>
      <div class="mainContainer">
        <div
          class="documentClassLable"
          @mouseover="mouseOver"
          @mouseout="mouseout"
          @click="documentClassIsPre = true"
          v-if="!documentClassIsPre"
        >
          文献分类
        </div>
        <div
          class="classContainer"
          v-if="documentClassIsPre"
          style="overflow: auto"
        >
          <div
            style="
              width: 100%;
              height: 50px;
              position: relative;
              top: 15px;
              display: flex;
              flex-direction: row;
            "
          >
            <div style="height: 20px; margin-left: 50px">文献分类</div>
            <div
              style="
                background-color: #42b983;
                height: 20px;
                width: 20px;
                cursor: pointer;
                border-radius: 50%;
                position: relative;
                margin-left: 45px;
                color: white;
              "
              @click="documentClassIsPre = false"
            >
              &lt;
            </div>
          </div>
          <div style="text-align: left">
            <el-checkbox
              v-for="(item, index) in classObj"
              :key="index"
              :model-value="item.isAdd"
              :label="item.name"
              size="large"
              @change="updateCheckbox(index)"
              style="margin-left: 20px"
            ></el-checkbox>
          </div>
        </div>
        <div class="searchContainer">
          <div class="eachContainer" v-if="radioValue == '1'">
            <div class="itemContainer">
              <div class="inputSearch">
                <div class="selectContainer">
                  <select class="select" v-model="value[0]">
                    <option
                      v-for="(item, index) in options[0]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      :selected="index === 0"
                      style="color: black"
                    >
                      {{ item.label }}
                    </option>
                  </select>
                </div>
                <div class="inputContainer">
                  <el-input
                    v-model="input[0]"
                    placeholder="中文文献、外文文献"
                    class="input"
                  />
                </div>
              </div>
            </div>
            <div class="itemContainer">
              <el-select
                v-model="select[0]"
                class="m-2"
                placeholder="AND"
                size="large"
                style="
                  width: 80px;
                  border-style: solid;
                  border-width: 2px;
                  border-radius: 4px;
                  border-color: #e9e9eb;
                "
              >
                <el-option
                  v-for="item in falseortrues"
                  :label="item"
                  :value="item"
                />
              </el-select>
              <div class="inputSearch">
                <div class="selectContainer">
                  <select class="select" v-model="value[1]">
                    <option
                      v-for="(item, index) in options[1]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      :selected="index === 0"
                      style="color: black"
                    >
                      {{ item.label }}
                    </option>
                  </select>
                </div>
                <div class="inputContainer">
                  <el-input
                    v-model="input[1]"
                    placeholder="中文文献、外文文献"
                    class="input"
                  />
                </div>
              </div>
            </div>
            <div class="itemContainer">
              <el-select
                v-model="select[1]"
                class="m-2"
                placeholder="AND"
                size="large"
                style="
                  width: 80px;
                  border-style: solid;
                  border-width: 2px;
                  border-radius: 4px;
                  border-color: #e9e9eb;
                "
              >
                <el-option
                  v-for="item in falseortrues"
                  :label="item"
                  :value="item"
                />
              </el-select>
              <div class="inputSearch">
                <div class="selectContainer">
                  <select class="select" v-model="value[2]">
                    <option
                      v-for="(item, index) in options[2]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      :selected="index === 0"
                      style="color: black"
                    >
                      {{ item.label }}
                    </option>
                  </select>
                </div>
                <div class="inputContainer">
                  <el-input
                    v-model="input[2]"
                    placeholder="中文文献、外文文献"
                    class="input"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="eachContainer" v-if="radioValue == '2'"></div>
          <div class="eachContainer" v-if="radioValue == '3'">
            <div class="itemContainer">
              <div class="inputSearch">
                <div class="selectContainer">
                  <select class="select" v-model="value[3]">
                    <option
                      v-for="(item, index) in options[3]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      :selected="index === 0"
                      style="color: black"
                    >
                      {{ item.label }}
                    </option>
                  </select>
                </div>
                <div class="inputContainer">
                  <el-input
                    v-model="input[3]"
                    placeholder="中文文献、外文文献"
                    class="input"
                  />
                </div>
              </div>
            </div>
            <div class="itemContainer" style="margin-top: 50px">
              <el-select
                v-model="select[2]"
                class="m-2"
                placeholder="AND"
                size="large"
                style="
                  width: 80px;
                  border-style: solid;
                  border-width: 2px;
                  border-radius: 4px;
                  border-color: #e9e9eb;
                "
              >
                <el-option
                  v-for="item in falseortrues"
                  :label="item"
                  :value="item"
                />
              </el-select>
              <div class="inputSearch">
                <div class="selectContainer">
                  <select class="select" v-model="value[4]">
                    <option
                      v-for="(item, index) in options[4]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      :selected="index === 0"
                      style="color: black"
                    >
                      {{ item.label }}
                    </option>
                  </select>
                </div>
                <div class="inputContainer">
                  <el-input
                    v-model="input[4]"
                    placeholder="中文文献、外文文献"
                    class="input"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="sameThing">
            <div class="topThing">
              <div style="margin-top: 10px">
                <el-checkbox
                  v-for="(item, index) in checked"
                  :key="index"
                  :label="item.name"
                  v-model="item.judge"
                />
              </div>
              <div class="dataContainer">
                <span style="font-size: 14px; font-weight: 550; color: #73767a">
                  时间范围
                </span>
                <span style="margin-left: 20px">
                  <div class="block">
                    <el-date-picker
                      v-model="dateValue"
                      type="datetimerange"
                      :shortcuts="shortcuts"
                      range-separator="To"
                      start-placeholder="Start date"
                      end-placeholder="End date"
                    />
                  </div>
                </span>
                <el-select
                  v-model="updateTime"
                  class="m-2"
                  placeholder="更新时间"
                  size="default"
                  style="
                    margin-left: 30px;
                    border-style: solid;
                    border-width: 2px;
                    border-radius: 4px;
                    border-color: #e9e9eb;
                  "
                >
                  <el-option
                    v-for="(item, index) in updateTimeoptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </div>
            <div class="bottomThing">
              <el-button @click="reset">重置条件</el-button>
              <el-button type="primary" style="margin-left: 100px"
                >检索</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import { ref } from "vue";
export default {
  name: "HomeView",
  data() {
    return {
      updateTime: "",
      select: ["AND", "AND", "AND"],
      input: ["", "", "", "", ""],
      dateValue: "",
      value: ["主题", "主题", "主题", "主题", "主题"],

      documentClassIsPre: false,
      radioValue: ref("1"),
      falseortrues: ["AND", "OR", "NOT"],
      updateTimeoptions: [
        {
          value: "不限",
          label: "不限",
        },
        {
          value: "最近一周",
          label: "最近一周",
        },
        {
          value: "最近一月",
          label: "最近一月",
        },
        {
          value: "最近一年",
          label: "最近一年",
        },
        {
          value: "今年迄今",
          label: "今年迄今",
        },
        {
          value: "上一年度",
          label: "上一年度",
        },
      ],
      shortcuts: [
        {
          text: "Last week",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            return [start, end];
          },
        },
        {
          text: "Last month",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            return [start, end];
          },
        },
        {
          text: "Last 3 months",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            return [start, end];
          },
        },
      ],
      classObj: [
        {
          name: "基础科学",
          isAdd: false,
        },
        {
          name: "工科科技",
          isAdd: false,
        },
        {
          name: "农林科技",
          isAdd: false,
        },
        {
          name: "医药卫生科技",
          isAdd: false,
        },
        {
          name: "哲学与人文科学",
          isAdd: false,
        },
        {
          name: "社会科学",
          isAdd: false,
        },
        {
          name: "信息科学",
          isAdd: false,
        },
        {
          name: "经济与管理科学",
          isAdd: false,
        },
      ],
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
      ],
      checked: [
        {
          judge: false,
          name: "网络首发",
        },
        {
          judge: false,
          name: "增强出版",
        },
        {
          judge: false,
          name: "基金文献",
        },
        {
          judge: false,
          name: "中英文扩展",
        },
        {
          judge: false,
          name: "同义词扩展",
        },
      ],
    };
  },
  methods: {
    reset() {
      this.updateTime = "";
      this.select = this.select.map(() => "AND");
      this.input = this.input.map(() => "");
      this.dateValue = "";
      this.value = this.value.map(() => "主题");
      this.classObj.forEach((item) =>{
        item.isAdd = false;
      })
    },
    test() {
      console.log(this.updateTime);
    },
    mouseOver() {
      var ele = document.querySelector(".documentClassLable");
      ele.style.color = "#337ecc";
    },
    mouseout() {
      var ele = document.querySelector(".documentClassLable");
      ele.style.color = "white";
    },
    updateCheckbox(index) {
      this.classObj[index].isAdd = !this.classObj[index].isAdd;
    },
  },
};
</script>
<style scoped>
.dataContainer {
  height: 45px;
  width: 100%;
  margin-top: 15px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  text-align: center;
}
.bottomThing {
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  text-align: center;
}
.topThing {
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-bottom-style: solid;
  border-bottom-color: #c8c9cc;
  border-bottom-width: 2px;
}
.sameThing {
  height: 160px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
.inputContainer {
  position: relative;
  display: flex;
  height: 40px;
  width: 450px;
  float: left;
  overflow: hidden;
}

:deep(.el-input__wrapper) {
  box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color))
    inset;
  cursor: default;
  .el-input__inner {
    cursor: default !important;
  }
}
:deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color))
    inset;
  cursor: default;
  .el-input__inner {
    cursor: default !important;
  }
}
.selectContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  float: left;
  position: relative;
  display: flex;
  height: 100%;
  width: 150px;
  border-style: solid;
  border-left: 0;
  border-top: 0;
  border-bottom: 0;
  border-right-width: 2px;
  border-right-color: #b1b3b8;
}
.select {
  text-align: center;
  padding: 5px;
  outline: none;
  height: 100%;
  width: 100px;
  border: 0;
  position: relative;
  display: flex;
  padding-top: 10px;
  color: #b1b3b8;
}
.itemContainer {
  display: flex;
  width: 780px;
  margin-top: 20px;
}
.eachContainer {
  margin-top: -10px;
  display: flex;
  flex-direction: column;
  align-items: center; /* 水平居中 */
  justify-content: center;
  overflow: hidden;
  position: relative;
  height: 200px;
}

.inputSearch {
  flex: 1;
  margin-left: 20px;
  height: 40px;
  overflow: hidden;
  position: relative;
  box-shadow: 4px 4px 10px #c8c9cc;
  display: flex;
  flex-direction: row;
}
.searchContainer {
  flex: 1;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
}
.classContainer {
  height: 100%;
  width: 200px;
  border-right-style: solid;
  border-right-width: 2px;
  border-right-color: #dedfe0;
}
.documentClassLable {
  height: 100px;
  width: 30px;
  margin-top: 40px;
  background-color: #42b983;
  color: white;
  cursor: pointer;
}
.allContainer {
  display: flex;
  flex-direction: column;
  align-items: center; /* 水平居中 */
  justify-content: center;
}
.elButton {
  margin-left: 40px;
  box-shadow: 2px 2px 5px #42b983;
}
.mainContainer {
  display: flex;
  margin-top: 20px;
  height: 350px;
  width: 1000px;
  box-shadow: 2px 2px 5px #42b983;
}
</style>
