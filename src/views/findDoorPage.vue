<template>
  <FindDoor v-model="isDialoVisibal" :item="nowPerson">

  </FindDoor>
  <div style="position: relative;display: flex;justify-content: center;min-width: 900px;">

    <div class="mainContainer">
      <div class="searchContainer">
        <div class="search">
          <el-input v-model="searchInput2" placeholder="请输入成果名" class="searchInput" clearable  />
          <el-input v-model="searchInput1" placeholder="请输入名字" class="searchInput" clearable style="margin-top: 20px;"/>
          <div style="margin-top: 20px;margin-bottom: 20px;">
            <el-button type="primary" class="searchButton" @click="search">搜索</el-button>
            <el-button type="danger" class="searchButton" @click="searchInput1 = ''; searchInput2 = ''">重置</el-button>
          </div>
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
          style="display: flex;text-align: left;margin-top: 10px;border-bottom-style: solid;border-bottom-color: #909399;border-bottom-width: 2px;min-width: 900px;">
          <div style="display:flex;flex-direction: column;margin-left: 100px;">
            <span class="nameSpan">{{ (index + 1) + " . " + item.name }}</span>
            <span class="otherThing">{{ "成果数量：" + item.achievementsNum }}</span>
            <span class="otherThing">{{ "被引次数：" + item.citationsNum }}</span>
            <div class="otherThing" style="display: flex;">
              <span>关注领域：</span>
              <span v-for="(e, i) in item.interests" :key="i" style="margin-left: 10px;">
                {{ e }}
              </span>
            </div>
            <span class="otherThing">{{ "简介 : " + ((item.introduce == null) ? "暂无" : item.introduce) }}</span>
            <span class="otherThing">{{ "邮箱 : " + ((item.email == null) ? "暂无" : item.email) }}</span>
            <span class="otherThing">{{ "机构 : " + ((item.organization == null) ? "暂无" : item.organization) }}</span>
          </div>
          <div
            style="display: flex;flex-direction: column;position: absolute;justify-content: center;float: right;right: 0;">
            <!-- <el-button type="primary">查看信息</el-button> -->
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
    <!-- <div class="objectFind">
      <el-radio-group v-model="object" style="display: flex;flex-direction: column;justify-content: center;">
        <el-radio v-for="(item, index) in jsonObj" :label="item.name" :key="index" style="align-self: left;">{{ item.name
        }}</el-radio>
      </el-radio-group>
      <el-button type="danger" style="width: 50px;margin-top: 10px;" @click="removeObject">取消</el-button>
    </div> -->
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
  /* cursor: pointer; */

}

.searchResultContainer {
  position: relative;
  left: 20px;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  width: 90%;
  margin-bottom: 10px;
}

.searchContainer {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 150px;
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
  width: 75%;
  min-width: 1100px;
  background-color: #FAFCFF;
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 3px 3px 3px 3px #409EFF;
  margin-bottom: 10px;
  margin-top: 10px;
}

.search {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
import { searchPortal } from "../api/portal"
import { ElNotification } from 'element-plus';
export default {
  components: {
    FindDoor
  },
  data() {
    return {
      searchInput1: "",
      searchInput2: "",
      pos: 0,
      jsonData: [],
      jsonObj: require("../components/object.JSON"),
      object: "",
      jsonSchool: require("../components/school.JSON"),
      isDialoVisibal: false,
      nowPerson: {},
      isErrorOccur: false,
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
      if (this.searchInput2 == "") {
        ElNotification({
          title: 'Error',
          message: '成果名字一栏不能为空',
          type: 'error',
        })
        return
      }
      var promise = searchPortal(this.searchInput1, this.searchInput2)
      promise.then((result) => {
        this.jsonData = result.data
        console.log(this.jsonData)
        for (var i = 0; i < this.jsonData.length; i++) {
          var temp = [];
          var num = (this.jsonData[i].interests.length < 5) ? this.jsonData[i].interests.length : 5;
          console.log(num)
          for (var j = 0; j < num; j++) {
            console.log("test")
            temp.push(this.jsonData[i].interests[j])
          }
          this.jsonData[i].interests = temp
        }

      })
    },
    findauthor(item) {
      this.isDialoVisibal = true;
      this.nowPerson = item;
      console.log(this.isDialoVisibal)
    },
  },
  mounted() {

  },
}
</script>
