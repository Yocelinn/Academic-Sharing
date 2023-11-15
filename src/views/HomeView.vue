<template>
  <LoinAndRegister></LoinAndRegister>
  <div class="searchBlock">
    <el-image class="searchBackgroundImage" :src="require('@/assets/home/searchBackgroundImage.jpg')" fit="fill" />
  </div>
  <div class="numberBlock">
    <div class="numberLeft" style="left: 15%;">
      <div class="numberTitle">3156032</div>
      <div class="number">期刊论文</div>
    </div>
    <div class="numberItem" style="left: 25%;">
      <div class="numberTitle">1560230</div>
      <div class="number">学位论文</div>
    </div>
  </div>
  <div class="hotAreasBlock">
    <hotArea></hotArea>
  </div>
</template>

<script>
import LoinAndRegister from '@/components/user/LoinAndRegister.vue';
import hotArea from '@/components/home/hotArea.vue';

export default {
  name: 'HomeView',
  components: {
    LoinAndRegister,
    hotArea,
  }

}
</script>

<style scoped>
.searchBlock{
  position: relative;
  width: 100%;
  min-width: 1200px;
  height: 400px;

}
.searchBackgroundImage{
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0px;
}
.numberBlock{
  position: relative;
  background-color: #688f4e;
  width: 100%;
  min-width: 1200px;
  height: 100px;
}
.numberLeft{
  position: relative;
  top: 15%;
  width: 10%;
  height: 70%;
}
.numberItem{
  position: absolute;
  border-left: 2px solid white;
  top: 15%;
  width: 10%;
  height: 70%;
}
.numberTitle{
  position: relative;
  color: #faf3dd;
  display: grid;
  place-items: center;
  width: 100%;
  height: 60%;
  font-size: x-large;
  
}
.number{
  position: relative;
  color: white;
  display: grid;
  place-items: center;
  width: 100%;
  height: 40%;
  font-size: large;
}
.hotAreasBlock{
  position: relative;
  width: 100%;
  min-width: 1200px;
  height: 450px;
}

</style>
