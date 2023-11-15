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
