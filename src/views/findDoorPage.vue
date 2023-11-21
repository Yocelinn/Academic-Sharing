<template>
  <FindDoor v-model="isDialoVisibal" :item="nowPerson">

  </FindDoor>
  <div style="position: relative;display: flex;justify-content: center;">

    <div class="mainContainer">
      <div class="searchContainer">
        <div class="search">
          <el-input v-model="searchInput" placeholder="请输入关键字" class="searchInput" clearable />
          <el-button type="primary" class="searchButton" @click="search">搜索</el-button>
        </div>
        <!-- <div style="margin-top: 20px;color: #909399;cursor: pointer;">
          <span @click="changeclass(0)" class="class"
            style="color: black;cursor: pointer;border-bottom-style: solid;border-bottom-width:2px;border-color: #79bbff;padding-bottom: 5px;">
            热门机构
          </span>
          <span style="margin-left: 20px;color: #909399;cursor: pointer;padding-bottom: 5px;" @click="changeclass(1)"
            class="class">
            搜索结果
          </span>
        </div> -->
      </div>

      <div class="searchResultContainer">
        <div v-for="(item, index) in jsonData" :key="index"
          style="display: flex;text-align: left;margin-top: 10px;border-bottom-style: solid;border-bottom-color: #909399;border-bottom-width: 2px;">
          <div style="display:flex;flex-direction: column;">
            <span class="nameSpan">{{ (index + 1) + " . " + item.name }}</span>
            <span class="otherThing">{{ "作者机构：" + item.company }}</span>
            <div class="otherThing" style="display: flex;">
              <span>文章：</span>
              <span v-for="(e, i) in item.essay" :key="i">
                {{ "《" + e + "》" }}
              </span>
            </div>
            <span class="otherThing">{{ "年份 : " + item.year }}</span>
            <span class="otherThing">{{ "来源 : " + item.source }}</span>
          </div>
          <div style="display: flex;flex-direction: column;position: relative;left: 370px;justify-content: center;">
            <el-button type="primary">查看信息</el-button>
            <el-button type="primary" style="margin-top: 20px;" @click="findauthor(item)">认领门户</el-button>
          </div>
        </div>
      </div>
      <!-- <div class="searchResultContainer">
        <div v-for="(item,index) in jsonSchool" :key="index">
          <img :src="item.pic">
          <span>{{ item.pic }}</span>
        </div>
      </div> -->
    </div>
    <div class="objectFind">
      <el-radio-group v-model="object" style="display: flex;flex-direction: column;justify-content: center;">
        <el-radio v-for="(item, index) in jsonObj" :label="item.name" :key="index" style="align-self: left;">{{ item.name
        }}</el-radio>
      </el-radio-group>
      <el-button type="danger" style="width: 50px;margin-top: 10px;" @click="removeObject">取消</el-button>
    </div>
  </div>
</template>
<style>
.objectFind {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  width: 250px;
  height: 650px;
  margin-left: 150px;
  top: 50px;
  text-align: left;
  box-shadow: 2px 2px 5px #409EFF;
}

.otherThing {
  font-weight: 300;
  font-size: 15px;
}

.nameSpan {
  color: black;
  font-size: 22px;
  font-weight: 500;
  cursor: pointer;

}

.searchResultContainer {
  position: relative;
  left: 20px;
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  width: 90%;
}

.searchContainer {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100px;
  width: 100%;
  top: 30px;
  justify-content: center;
  align-items: center;
  border-bottom-style: solid;
  border-bottom-color: #c8c9cc;
  border-bottom-width: 2px;
  padding-bottom: 15px;

}

.mainContainer {
  height: 700px;
  width: 800px;
  background-color: #FAFCFF;
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 3px 3px 3px 3px #409EFF;
  left: 100px;
}

.search {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.searchInput {
  position: relative;
  display: flex;
  height: 50px;
  width: 600px;
  box-shadow: 2px 2px 5px #409EFF;
  justify-content: center;
  /* 水平居中 */
}

.searchButton {
  margin-left: 30px;
}
</style>
<script>
import FindDoor from '@/components/FindDoor.vue';
export default {
  components: {
    FindDoor
  },
  data() {
    return {
      searchInput: "",
      pos: 0,
      jsonData: require("../components/author.JSON"),
      jsonObj: require("../components/object.JSON"),
      object: "",
      jsonSchool: require("../components/school.JSON"),
      isDialoVisibal: false,
      nowPerson: {},
    }
  },
  methods: {
    changeclass(index) {
      this.pos = index;
      var array = Array.from(document.querySelectorAll(".class"));
      for (var i = 0; i < array.length; i++) {
        console.log(array[i]);
        array[i].style.color = "#909399";
        array[i].style.borderBottomStyle = "none";
      }
      array[index].style.color = "black";
      array[index].style.borderBottomStyle = "solid";
      array[index].style.borderBottomColor = "#79bbff"
      array[index].style.borderBottomWidth = "2px"
    },
    test() {
      console.log(this.jsonData)
    },
    removeObject() {
      this.object = ""
    },
    search() {
      this.pos = 1;
      this.changeclass(1)
    },
    findauthor(item) {
      this.isDialoVisibal = true;
      this.nowPerson = item;
      console.log(this.isDialoVisibal)
    },
  }
}
</script>
