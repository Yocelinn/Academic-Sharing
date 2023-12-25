<template>
  <div class="searchBlock">
    <div class="searchBackgroundImage"></div>
    <div class="search">
      <searchBox width=100 color="white" :isClassVisible=false  :isLargeModel = true></searchBox>
    </div>
    <div class="numberBlock">
      <div class="numberLeft" style="left: 20%;">
        <div class="number">{{ this.filedInfo[0].count }}</div>
        <div class="numberTitle">{{ this.filedInfo[0].name }}</div>
      </div>
      <div class="numberItem" style="left: 30%;">
        <div class="number">{{ this.filedInfo[1].count }}</div>
        <div class="numberTitle">{{ this.filedInfo[1].name }}</div>
      </div>
      <div class="numberItem" style="left: 40%;">
        <div class="number">{{ this.filedInfo[2].count }}</div>
        <div class="numberTitle">{{ this.filedInfo[2].name }}</div>
      </div>
      <div class="numberItem" style="left: 50%;">
        <div class="number">{{ this.filedInfo[3].count }}</div>
        <div class="numberTitle">{{ this.filedInfo[3].name }}</div>
      </div>
      <div class="numberItem" style="left: 60%;">
        <div class="number">{{ this.filedInfo[4].count }}</div>
        <div class="numberTitle">{{ this.filedInfo[4].name }}</div>
      </div>
      <div class="numberItem" style="left: 70%;">
        <div class="number">{{ this.filedInfo[5].count }}</div>
        <div class="numberTitle">{{ this.filedInfo[5].name }}</div>
      </div>
    </div>
  </div>
  <div style="position: relative;width: 100%;min-width: 1200px;height: 800px;">
    <div class="hotInstitutionBlock">
      <hotInstitution></hotInstitution>
    </div>
    <div class="hotAreasBlock">
      <hotArea></hotArea>
    </div>
    <div class="hotPaperBlock">
      <hotPaper></hotPaper>
    </div>
  </div>
</template>

<script>
import navigationBar from '@/components/home/navigationBar.vue';
import hotArea from '@/components/home/hotArea.vue';
import hotPaper from '@/components/home/hotPaper.vue';
import information from '@/components/home/information.vue';
import searchBox from '@/components/searchBox.vue';
import hotInstitution from '@/components/home/hotInstitution.vue';
import { GetAllFields } from '@/api/home';
import { Hotfield, Hotspots } from '@/api/record';

export default {
  name: 'HomeView',
  components: {
    hotArea,
    navigationBar,
    hotPaper,
    information,
    searchBox,
    hotInstitution,
  },
  data(){
    return{
      filedInfo:[{"name" : "", "count" : ""},{"name" : "", "count" : ""},{"name" : "", "count" : ""},{"name" : "", "count" : ""},{"name" : "", "count" : ""},{"name" : "", "count" : ""}],
    }
  },
  methods:{

  },
  mounted(){
    var promise=GetAllFields();
    promise.then((result) => {
      var i=0;
      for(let key in result){
        this.filedInfo[i].name=key;
        this.filedInfo[i].count=result[key];
        i++;
      }
    })
    var hotarea=Hotfield();
    hotarea.then((result) => {
      console.log(result);
    })
    var hotspots=Hotspots();
    hotspots.then((result) => {
      console.log(result);
    })
  }
}
</script>

<style scoped>
.searchBlock{
  position: relative;
  width: 100%;
  min-width: 1200px;
  height: 450px;

}
.searchBackgroundImage{
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0px;
  background-image: url('@/assets/home/searchBackground.jpg');
}
.search{
  position: absolute;
  width: 70%;
  left: 20%;
  top: 60%
}
.numberBlock{
  position: absolute;
  width: 100%;
  min-width: 1200px;
  height: 100px;
  left: 0%;
  bottom: 0%;
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
  font-size: 20px;
  font-weight: 600;
}
.number{
  position: relative;
  color: white;
  display: grid;
  place-items: center;
  width: 100%;
  height: 40%;
  font-size: 18px;
}
.hotInstitutionBlock{
  position: relative;
  width: 30%;
  min-width: 360px;
  height: 400px;
  left: 2%;
  top: 0%;
}
.hotAreasBlock{
  position: absolute;
  width: 66%;
  min-width: 792px;
  height: 400px;
  right: 0%;
  top: 0px;
  /* background-color: #faf3dd; */
}
.hotPaperBlock{
  position: absolute;
  width: 100%;
  min-width: 1200px;
  height: 400px;
  right: 0%;
  top: 400px;
}

</style>
