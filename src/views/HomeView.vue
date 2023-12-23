<template>
  <div class="searchBlock">
    <div class="searchBackgroundImage" fit="fill">
      <searchBox width=60 style="position: absolute;width: 50%;left: 25%;top: 50%;"></searchBox>
    </div>
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
  <div class="hotPaperBlock">
    <hotPaper></hotPaper>
  </div>
  <div class="informationBlock">
    <information></information>
  </div>
  <div class="statementBlock">
    <statement></statement>
  </div>
</template>

<script>
import navigationBar from '@/components/home/navigationBar.vue';
import hotArea from '@/components/home/hotArea.vue';
import hotPaper from '@/components/home/hotPaper.vue';
import information from '@/components/home/information.vue';
import statement from '@/components/home/statement.vue';
import searchBox from '@/components/searchBox.vue';

export default {
  name: 'HomeView',
  components: {
    hotArea,
    navigationBar,
    hotPaper,
    information,
    statement,
    searchBox,
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
  background-image: url('@/assets/home/searchBackground.jpg');
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
.hotPaperBlock{
  position: relative;
  width: 100%;
  min-width: 1200px;
  height: 500px;
}
.informationBlock{
  position: relative;
  width: 100%;
  min-width: 1200px;
  height: 250px;
}
.statementBlock{
  position: relative;
  width: 100%;
  min-width: 1200px;
  height: 50px;
}

</style>
