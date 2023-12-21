<template>
  <el-dialog v-model="localIsVisibal" title="高级检索" style="width: 1100px;">
    <div class="home">
      <div class="allContainer">
        <div class="radioContaner">
          <el-radio-group v-model="radioValue" class="ml-4">
            <el-radio-button label="1" size="large" class="elButton">高级检索</el-radio-button>
            <el-radio-button label="2" size="large" class="elButton">专业检索</el-radio-button>
            <!-- <el-radio-button label="3" size="large" class="elButton">作者发文检索</el-radio-button> -->
          </el-radio-group>
        </div>
        <div class="mainContainer">
          <!-- <div class="documentClassLable" @mouseover="mouseOver" @mouseout="mouseout" @click="documentClassIsPre = true"
            v-if="!documentClassIsPre">
            文献分类
          </div> -->
          <div class="classContainer" v-if="documentClassIsPre" style="overflow: auto">
            <div style="
              width: 100%;
              height: 50px;
              position: relative;
              top: 15px;
              display: flex;
              flex-direction: row;
            ">
              <div style="height: 20px; margin-left: 50px">文献分类</div>
              <div style="
                background-color: #42b983;
                height: 20px;
                width: 20px;
                cursor: pointer;
                border-radius: 50%;
                position: relative;
                margin-left: 45px;
                color: white;
              " @click="documentClassIsPre = false">
                &lt;
              </div>
            </div>
            <div style="text-align: left">
              <el-checkbox v-for="(item, index) in classObj" :key="index" :model-value="item.isAdd" :label="item.name"
                size="large" @change="updateCheckbox(index)" style="margin-left: 20px"></el-checkbox>
            </div>
          </div>
          <div class="searchContainer">
            <div class="eachContainer" v-if="radioValue == '1'">
              <div class="itemContainer">
                <div class="inputSearch">
                  <div class="selectContainer">
                    <select class="select" v-model="value[0]">
                      <option v-for="(item, index) in options[classindex]" :key="item.value" :label="item.label"
                        :value="item.value" :selected="index === 0" style="color: black">
                        {{ item.label }}
                      </option>
                    </select>
                  </div>
                  <div class="inputContainer">
                    <el-input v-model="input[0]" placeholder="中文文献、外文文献" class="input" />
                  </div>
                </div>
                <el-select v-model="isFass[0]" class="m-2" placeholder="AND" size="large" style="
                  width: 80px;
                  border-style: solid;
                  border-width: 2px;
                  border-radius: 4px;
                  border-color: #e9e9eb;
                  margin-left: 30px;
                ">
                  <el-option v-for="item in FassList" :label="item" :value="item" />
                </el-select>
              </div>
              <div class="itemContainer">
                <el-select v-model="select[0]" class="m-2" placeholder="AND" size="large" style="
                  width: 80px;
                  border-style: solid;
                  border-width: 2px;
                  border-radius: 4px;
                  border-color: #e9e9eb;
                ">
                  <el-option v-for="item in falseortrues" :label="item" :value="item" />
                </el-select>
                <div class="inputSearch">
                  <div class="selectContainer">
                    <select class="select" v-model="value[1]">
                      <option v-for="(item, index) in options[classindex]" :key="item.value" :label="item.label"
                        :value="item.value" :selected="index === 0" style="color: black">
                        {{ item.label }}
                      </option>
                    </select>
                  </div>
                  <div class="inputContainer">
                    <el-input v-model="input[1]" placeholder="中文文献、外文文献" class="input" />
                  </div>
                </div>
                <el-select v-model="isFass[1]" class="m-2" placeholder="AND" size="large" style="
                  width: 80px;
                  border-style: solid;
                  border-width: 2px;
                  border-radius: 4px;
                  border-color: #e9e9eb;
                  margin-left: 30px;
                ">
                  <el-option v-for="item in FassList" :label="item" :value="item" />
                </el-select>
              </div>
              <div class="itemContainer">
                <el-select v-model="select[1]" class="m-2" placeholder="AND" size="large" style="
                  width: 80px;
                  border-style: solid;
                  border-width: 2px;
                  border-radius: 4px;
                  border-color: #e9e9eb;
                ">
                  <el-option v-for="item in falseortrues" :label="item" :value="item" />
                </el-select>
                <div class="inputSearch">
                  <div class="selectContainer">
                    <select class="select" v-model="value[2]">
                      <option v-for="(item, index) in options[classindex]" :key="item.value" :label="item.label"
                        :value="item.value" :selected="index === 0" style="color: black">
                        {{ item.label }}
                      </option>
                    </select>
                  </div>
                  <div class="inputContainer">
                    <el-input v-model="input[2]" placeholder="中文文献、外文文献" class="input" />
                  </div>
                </div>
                <el-select v-model="isFass[2]" class="m-2" placeholder="AND" size="large" style="
                  width: 80px;
                  border-style: solid;
                  border-width: 2px;
                  border-radius: 4px;
                  border-color: #e9e9eb;
                  margin-left: 30px;
                ">
                  <el-option v-for="item in FassList" :label="item" :value="item" />
                </el-select>
              </div>
            </div>
            <div class="eachContainer" v-if="radioValue == '2'" style="overflow: visible;">
              <div style="height: 110px;width: 89%;position: absolute;margin-top: -262px;background-color: white;display: flex; flex-wrap: wrap;border-style: solid;border-width: 1px;border-color: #dedfe0;box-shadow: 1px,1px,1px,#dedfe0;" v-if="isKeyboardShown"  @click.stop="isKeyboardShown = true">
                <span v-for="(item,index) in signalList" :key="index" class="signalEachItemSpan" :id="`signalEachItemSpan-${index}`" @mouseover="mouseOverToChangeEachItemColor(`signalEachItemSpan-${index}`)" @mouseout="mouseOutToChangeEachItemColor(`signalEachItemSpan-${index}`)" @click="addToken(item.token)">{{ item.token }}</span>
              </div>
              <div style="position: relative;height: 170px;width:90%;box-shadow: 4px 4px 10px #c8c9cc ;margin-top: 20px;" @click.stop="isKeyboardShown = true">
                <el-input v-model="professionInput" placeholder="请输入专业检索式" :rows="7" type="textarea"
                  style="height: 90%;width: 99%;box-shadow: box-shadow: 2 2 2 5px var(--el-input-border-color, var(--el-border-color)) inset;;margin-top:7px" />
              </div>
            </div>
            <div class="eachContainer" v-if="radioValue == '3'">
              <div class="itemContainer">
                <div class="inputSearch">
                  <div class="selectContainer">
                    <select class="select" v-model="value[3]">
                      <option v-for="(item, index) in options[classindex]" :key="item.value" :label="item.label"
                        :value="item.value" :selected="index === 0" style="color: black">
                        {{ item.label }}
                      </option>
                    </select>
                  </div>
                  <div class="inputContainer">
                    <el-input v-model="input[3]" placeholder="中文文献、外文文献" class="input" />
                  </div>
                </div>
              </div>
              <div class="itemContainer" style="margin-top: 50px">
                <el-select v-model="select[2]" class="m-2" placeholder="AND" size="large" style="
                  width: 80px;
                  border-style: solid;
                  border-width: 2px;
                  border-radius: 4px;
                  border-color: #e9e9eb;
                ">
                  <el-option v-for="item in falseortrues" :label="item" :value="item" />
                </el-select>
                <div class="inputSearch">
                  <div class="selectContainer">
                    <select class="select" v-model="value[4]">
                      <option v-for="(item, index) in options[classindex]" :key="item.value" :label="item.label"
                        :value="item.value" :selected="index === 0" style="color: black">
                        {{ item.label }}
                      </option>
                    </select>
                  </div>
                  <div class="inputContainer">
                    <el-input v-model="input[4]" placeholder="中文文献、外文文献" class="input" />
                  </div>
                </div>
              </div>
            </div>
            <div class="sameThing">
              <div class="topThing" v-if="radioValue == '1'">
                <!-- <div style="margin-top: 10px">
                  <el-checkbox v-for="(item, index) in checked" :key="index" :label="item.name" v-model="item.judge" />
                </div> -->
                <div class="dataContainer" v-if="radioValue == '1'">
                  <span style="font-size: 14px; font-weight: 550; color: #73767a">
                    时间范围
                  </span>
                  <span style="margin-left: 20px">
                    <div class="block">
                      <el-date-picker v-model="dateValue" type="datetimerange" :shortcuts="shortcuts" range-separator="To"
                        start-placeholder="Start date" end-placeholder="End date" />
                    </div>
                  </span>
                  <!-- <el-select v-model="updateTime" class="m-2" placeholder="更新时间" size="default" style="
                    margin-left: 30px;
                    border-style: solid;
                    border-width: 2px;
                    border-radius: 4px;
                    border-color: #e9e9eb;
                  ">
                    <el-option v-for="(item, index) in updateTimeoptions" :key="index" :label="item.label"
                      :value="item.value" />
                  </el-select> -->
                </div>
              </div>
              <div v-if="radioValue == '2'"
                style="position: relative;display: flex;height: 100px;justify-content: center;">
                <el-button style="margin-top: 30px;" @click="isUsageShown = true">
                  使用方法
                </el-button>
                <el-dialog v-model="isUsageShown" title="使用方法">
                  <div style="height: 200px;width: 600px;">
                    <div style="position: relative;display: flex;">
                      <span style="width : 80px">
                        可检索字段:
                      </span>
                      &nbsp&nbsp&nbsp&nbsp&nbsp
                      <span>
                        TS=主题 , TI=标题 , AB=摘要 , PU=出版社 , AU=作者 , ISBN=ISBN , PY=发布年
                      </span>
                    </div>
                    <div>
                      <div style="position: relative;display: flex;">
                        <span style="width : 100px;">
                          逻辑运算符:
                        </span>
                        &nbsp&nbsp&nbsp&nbsp&nbsp
                        <span style="position: relative;display: flex;text-align: left;">
                          AND, OR, NOT, + 表示一定包含, - 表示一定不包含, ? 表示可以代替一个任意字符, * 表示可代表任意个字符
                        </span>
                      </div>
                    </div>
                    <div>
                      <div style="position: relative;display: flex;">
                        <span style="text-align: left;width: 350px;">
                          检索式示例:
                        </span>
                        <span style="position: relative;display: flex;text-align: left;margin-left: 10px;">
                          1. TI=大数据 AND KY=经济 NOT AU=张* 表示标题包括"大数据"并且关键词包括"经济"并且作者不姓张
                          2. TI=(nanotub* AND carbon) AND PY=(2010-2021), PY出版年范围需使用括号表示
                          3. TI=大数据 经济 表示标题包括"大数据"或者"经济", TI="大数据" "经济" 表示标题包括"大数据"和"经济", TI=大数据 -经济 表示标题包括"大数据"但不包含"经济"
                        </span>
                      </div>
                    </div>
                  </div>
                </el-dialog>

              </div>
              <div class="bottomThing">
                <el-button @click="reset">重置条件</el-button>
                <el-button type="primary" style="margin-left: 100px"
                  @click="console.log(select); console.log(isFass)">检索</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
// @ is an alias to /src
import { ref } from "vue";
export default {
  watch: {
    isVisibal(newVal) {
      this.localIsVisibal = newVal;
    },
    localIsVisibal(newVal) {
      if (newVal !== this.isVisibal) {
        this.$emit('update:isVisibal', newVal);
      }
    }
  },
  props: {
    isVisibal: Boolean,
    classindex: {
      type: Number,
      defalt: 0,
    }
  },
  data() {
    return {
      signalList : require("../components/signal.JSON"),
      isKeyboardShown : false,
      isUsageShown: false,
      professionInput: "",
      localIsVisibal: this.isVisibal,
      classIndex: this.classindex,
      updateTime: "",
      select: ["AND", "AND", "AND"],
      isFass: ["模糊", "模糊", "模糊"],
      FassList: ["模糊", "精确"],
      input: ["", "", "", "", ""],
      dateValue: "",
      value: ["标题", "标题", "标题", "标题", "标题"],
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
      options: require("../components/class.JSON"),
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
    addToken(token){
      this.professionInput = this.professionInput + token + " "
    },
    mouseOverToChangeEachItemColor(id){
      var ele = document.querySelector("#" + id);
      ele.style.backgroundColor = "#f4f4f5"
    },
    mouseOutToChangeEachItemColor(id){
      var ele = document.querySelector("#" + id);
      ele.style.backgroundColor = "white"
    },
    hideDiv() {
      this.isKeyboardShown = false;
    },
    reset() {
      this.updateTime = "";
      this.select = this.select.map(() => "AND");
      this.input = this.input.map(() => "");
      this.dateValue = "";
      var temp
      if (this.classindex == 1)
        temp = ["专利名", "专利名", "专利名", "专利名", "专利名"];
      else if (this.classindex == 5)
        temp = ["书名", "书名", "书名", "书名", "书名"];
      else
        temp = ["标题", "标题", "标题", "标题", "标题"];
      this.value = temp
      this.classObj.forEach((item) => {
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
  watch: {
    // 确保响应父组件传递的 prop 更改
    classindex(newVal) {
      if (newVal == 1)
        this.value = ["专利名", "专利名", "专利名", "专利名", "专利名"]
      else if (this.classindex == 5)
        this.value = ["书名", "书名", "书名", "书名", "书名"];
      else
        this.value = ["标题", "标题", "标题", "标题", "标题"]
    }
  },
  mounted() {
    // 在document上监听点击事件
    document.addEventListener('click', this.hideDiv);
  },
};
</script>
<style scoped>
.signalEachItemSpan{
  position: relative;
  display: flex;
  height: 50px;
  width: 110px;
  margin: 0px;
  padding: 0px;
  cursor: pointer;
}
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
  width: 880px;
  margin-top: 20px;
}

.eachContainer {
  margin-top: -10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* 水平居中 */
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
  align-items: center;
  /* 水平居中 */
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
