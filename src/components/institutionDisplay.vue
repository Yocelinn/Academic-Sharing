<template>
    <div class="recommend-display">
        <div class="recommend-pagination-container">
          <div class="recommend-container">
            <div v-for="thing in institution" :key="thing.id" class="recommend-item">
              <!-- <router-link :to="{name:'video',params:{'id':video.video_id}}"> -->
              <div class="recommend-img-container"  >
                <img class="recommend-img" :src="thing.logo" @click="jumpToInstitution(thing.id)" >
              </div>
                <div class="recommend-title" @click="jumpToInstitution(thing.id)">{{ thing.displayName }} </div>
              <!-- </router-link> -->
            </div>
          </div>
        </div>
    </div>
   </template>
   
<script>
import { defineComponent,ref,h, onMounted,onUnmounted,computed } from "vue";

export default defineComponent({
    props:{
        institution:Object
    },
    setup() {
        function jumpToInstitution(id){
      
        let routerJump = this.$router.resolve({ 
                    path: "/institution",
                    query: {id:id } 
                });
                window.open(routerJump.href, '_blank');
        }
        console.log("inComponents")
        return {jumpToInstitution}
    },
})
</script>
<style scoped>
.recommend-display{
  margin:50px;
  margin-bottom:0px;
  display: flex;
  padding: 10px;
  flex-direction:row;
}
.recommend-pagination-container{
  width:100%;
}
.recommend-container {
  width:100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  justify-items: center;
}
.recommend-item {
  width: 100%;
  height: 250px;
  position: relative;
  cursor: pointer;
  /* margin-bottom: 10px; */
 
    /* overflow: hidden; 隐藏溢出部分 */
}
.recommend-img-container{
    display: grid;
  place-items: center;
    width: 100%; /* 使图片宽度充满容器 */
    /* height: auto; 根据宽度等比例缩放高度 */
    /* max-height:80%; */
    height:80%;
    /* height:80%; */
  /* width:250px; */
  /* height:80px; */
  /* height:auto */
}
.recommend-img{
width:100%;
/* height:100%; */
max-height:200px;
object-fit:cover;
border-radius: 10px;
transition: transform 0.3s ease;
}
.recommend-img-container:hover .recommend-img {
transform: scale(1.05);
}
.recommend-item:hover .overlay {
opacity: 0;
}
.recommend-title {
  position: relative;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20%;
  cursor:pointer;
  /* background-color: rgba(0, 0, 0, 0.5); */
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  padding: 10px;
  box-sizing: border-box;
  word-break:break-all;
  text-overflow:ellipsis;
  word-break:break-all;
  display:-webkit-box;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2;
  overflow:hidden;
}
</style>
